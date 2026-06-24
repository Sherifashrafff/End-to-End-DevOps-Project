# ── IAM role - Jenkins needs ECR push (not read-only like the k8s nodes) ─────

resource "aws_iam_role" "jenkins" {
  name = "${var.project}-jenkins"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "ec2.amazonaws.com" }
      Action    = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy_attachment" "jenkins_ecr" {
  role       = aws_iam_role.jenkins.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryPowerUser"
}

resource "aws_iam_instance_profile" "jenkins" {
  name = "${var.project}-jenkins"
  role = aws_iam_role.jenkins.name
}

# ── Security group ────────────────────────────────────────────────────────────

resource "aws_security_group" "jenkins" {
  name        = "${var.project}-jenkins"
  description = "Jenkins CI server"
  vpc_id      = aws_vpc.main.id

  ingress {
    description     = "SSH from bastion only"
    from_port       = 22
    to_port         = 22
    protocol        = "tcp"
    security_groups = [aws_security_group.bastion.id]
  }

  ingress {
    description = "Jenkins UI - GitHub webhooks + browser access"
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = { Name = "${var.project}-jenkins" }
}

# Allow Jenkins to SSH into k8s nodes to run Ansible
resource "aws_security_group_rule" "control_plane_ssh_from_jenkins" {
  description              = "SSH from Jenkins (Ansible)"
  type                     = "ingress"
  from_port                = 22
  to_port                  = 22
  protocol                 = "tcp"
  security_group_id        = aws_security_group.control_plane.id
  source_security_group_id = aws_security_group.jenkins.id
}

resource "aws_security_group_rule" "worker_ssh_from_jenkins" {
  description              = "SSH from Jenkins (Ansible)"
  type                     = "ingress"
  from_port                = 22
  to_port                  = 22
  protocol                 = "tcp"
  security_group_id        = aws_security_group.worker.id
  source_security_group_id = aws_security_group.jenkins.id
}

# ── EC2 instance ──────────────────────────────────────────────────────────────

resource "aws_instance" "jenkins" {
  ami                         = data.aws_ami.amazon_linux_2.id
  instance_type               = var.jenkins_instance_type
  key_name                    = aws_key_pair.main.key_name
  subnet_id                   = aws_subnet.public[0].id
  vpc_security_group_ids      = [aws_security_group.jenkins.id]
  iam_instance_profile        = aws_iam_instance_profile.jenkins.name
  associate_public_ip_address = true

  root_block_device {
    volume_size           = 30
    volume_type           = "gp3"
    delete_on_termination = true
  }

  # Replacing user_data forces instance replacement so changes take effect
  user_data_replace_on_change = true

  user_data = <<-EOF
    #!/bin/bash
    set -euxo pipefail

    # All output goes to /var/log/user-data.log for debugging
    exec > >(tee /var/log/user-data.log) 2>&1

    # ── System update ────────────────────────────────────────────────────────
    yum update -y
    yum install -y unzip git

    # ── Java 17 (Amazon Corretto - Jenkins requirement) ──────────────────────
    yum install -y java-17-amazon-corretto-headless

    # ── Jenkins LTS ──────────────────────────────────────────────────────────
    wget -O /etc/yum.repos.d/jenkins.repo \
        https://pkg.jenkins.io/redhat-stable/jenkins.repo
    rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io-2023.key
    yum install -y jenkins
    systemctl enable jenkins
    systemctl start jenkins

    # ── Docker ───────────────────────────────────────────────────────────────
    amazon-linux-extras install docker -y
    systemctl enable docker
    systemctl start docker
    # Allow Jenkins to run docker commands without sudo
    usermod -aG docker jenkins

    # ── AWS CLI v2 ───────────────────────────────────────────────────────────
    curl -fsSL "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" \
        -o /tmp/awscliv2.zip
    unzip -q /tmp/awscliv2.zip -d /tmp
    /tmp/aws/install
    rm -rf /tmp/awscliv2.zip /tmp/aws

    # ── kubectl ──────────────────────────────────────────────────────────────
    KUBECTL_VER=$(curl -fsSL https://dl.k8s.io/release/stable.txt)
    curl -fsSL "https://dl.k8s.io/release/$${KUBECTL_VER}/bin/linux/amd64/kubectl" \
        -o /usr/local/bin/kubectl
    chmod +x /usr/local/bin/kubectl

    # ── Restart Jenkins to pick up the docker group membership ────────────────
    systemctl restart jenkins

    echo "Bootstrap complete - Jenkins is ready on :8080"
  EOF

  tags = {
    Name = "${var.project}-jenkins"
    Role = "jenkins"
  }
}
