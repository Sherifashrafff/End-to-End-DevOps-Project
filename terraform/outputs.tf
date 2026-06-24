# ── ALB ───────────────────────────────────────────────────────────────────────

output "bastion_public_ip" {
  description = "Bastion host public IP — SSH entry point into the VPC"
  value       = aws_instance.bastion.public_ip
}

output "jenkins_public_ip" {
  description = "Jenkins EC2 public IP"
  value       = aws_instance.jenkins.public_ip
}

output "jenkins_url" {
  description = "Jenkins UI URL"
  value       = "http://${aws_instance.jenkins.public_ip}:8080"
}

output "alb_dns_name" {
  description = "ALB DNS name — open this in your browser or point a DNS A-record here"
  value       = aws_lb.main.dns_name
}

# ── EC2 ───────────────────────────────────────────────────────────────────────

output "master_public_ip" {
  description = "Public IP of the Kubernetes control-plane node"
  value       = aws_instance.master.public_ip
}

output "worker_public_ips" {
  description = "Public IPs of the Kubernetes worker nodes"
  value       = aws_instance.worker[*].public_ip
}

# ── ECR ───────────────────────────────────────────────────────────────────────

output "ecr_backend_url" {
  description = "ECR repository URL for the backend image"
  value       = aws_ecr_repository.app["backend"].repository_url
}

output "ecr_frontend_url" {
  description = "ECR repository URL for the frontend image"
  value       = aws_ecr_repository.app["frontend"].repository_url
}

# ── RDS PostgreSQL ────────────────────────────────────────────────────────────

output "rds_endpoint" {
  description = "RDS PostgreSQL endpoint"
  value       = aws_db_instance.postgres.address
}

output "rds_port" {
  description = "RDS PostgreSQL port"
  value       = aws_db_instance.postgres.port
}

# ── Ansible inventory ─────────────────────────────────────────────────────────

output "private_key_path" {
  description = "Local path where terraform saved the SSH private key"
  value       = local_sensitive_file.private_key.filename
}

output "ssh_config" {
  description = "Paste into ~/.ssh/config for one-command access to every host"
  value = <<-EOT
    Host ${var.project}-bastion
        HostName        ${aws_instance.bastion.public_ip}
        User            ec2-user
        IdentityFile    ~/.ssh/${var.project}.pem

    Host ${var.project}-master
        HostName        ${aws_instance.master.private_ip}
        User            ec2-user
        IdentityFile    ~/.ssh/${var.project}.pem
        ProxyJump       ${var.project}-bastion

    Host ${var.project}-jenkins
        HostName        ${aws_instance.jenkins.private_ip}
        User            ec2-user
        IdentityFile    ~/.ssh/${var.project}.pem
        ProxyJump       ${var.project}-bastion

    ${join("\n    ", [for i, w in aws_instance.worker : <<-WORKER
    Host ${var.project}-worker-${i + 1}
        HostName        ${w.private_ip}
        User            ec2-user
        IdentityFile    ~/.ssh/${var.project}.pem
        ProxyJump       ${var.project}-bastion
    WORKER
    ])}
  EOT
}

output "ansible_inventory" {
  description = "Ready-to-paste Ansible inventory — copy into ansible/inv"
  value = <<-EOT
    [control_node]
    ${aws_instance.master.private_ip}

    [worker_nodes]
    ${join("\n", aws_instance.worker[*].private_ip)}

    [all:vars]
    ansible_user=ec2-user
    ansible_ssh_private_key_file=~/.ssh/${var.project}.pem
    ansible_ssh_common_args='-o ProxyJump=ec2-user@${aws_instance.bastion.public_ip}'
  EOT
}

# ── Secrets Manager ───────────────────────────────────────────────────────────

output "db_secret_arn" {
  description = "ARN of the Secrets Manager secret holding the RDS master credentials"
  value       = aws_db_instance.postgres.master_user_secret[0].secret_arn
}

output "db_secret_fetch_cmd" {
  description = "AWS CLI command to retrieve the DB credentials"
  value       = "aws secretsmanager get-secret-value --secret-id ${aws_db_instance.postgres.master_user_secret[0].secret_arn} --region ${var.region} --query SecretString --output text"
}
