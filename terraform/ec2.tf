resource "aws_instance" "master" {
  ami                    = data.aws_ami.amazon_linux_2.id
  instance_type          = var.master_instance_type
  key_name               = aws_key_pair.main.key_name
  subnet_id              = aws_subnet.public[0].id
  vpc_security_group_ids = [aws_security_group.control_plane.id]
  iam_instance_profile   = aws_iam_instance_profile.ec2_node.name

  root_block_device {
    volume_size           = var.root_volume_size_gb
    volume_type           = "gp3"
    delete_on_termination = true
  }

  tags = {
    Name = "${var.project}-k8s-master"
    Role = "control-plane"
  }
}

resource "aws_instance" "worker" {
  count                  = var.worker_count
  ami                    = data.aws_ami.amazon_linux_2.id
  instance_type          = var.worker_instance_type
  key_name               = aws_key_pair.main.key_name
  subnet_id              = aws_subnet.public[count.index % 2].id
  vpc_security_group_ids = [aws_security_group.worker.id]
  iam_instance_profile   = aws_iam_instance_profile.ec2_node.name

  root_block_device {
    volume_size           = var.root_volume_size_gb
    volume_type           = "gp3"
    delete_on_termination = true
  }

  tags = {
    Name = "${var.project}-k8s-worker-${count.index + 1}"
    Role = "worker"
  }
}
