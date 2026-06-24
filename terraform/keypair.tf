resource "tls_private_key" "main" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

# Register the public key with AWS - EC2 injects it into every instance automatically
resource "aws_key_pair" "main" {
  key_name   = "${var.project}-key"
  public_key = tls_private_key.main.public_key_openssh

  tags = { Name = "${var.project}-key" }
}

# Save private key locally so you can SSH immediately after apply
resource "local_sensitive_file" "private_key" {
  content         = tls_private_key.main.private_key_pem
  filename        = pathexpand("~/.ssh/${var.project}.pem")
  file_permission = "0600"
}

# Backup private key in Secrets Manager so it is never lost
resource "aws_secretsmanager_secret" "ssh_key" {
  name        = "${var.project}/ssh-private-key"
  description = "SSH private key for all ${var.project} EC2 instances"
}

resource "aws_secretsmanager_secret_version" "ssh_key" {
  secret_id     = aws_secretsmanager_secret.ssh_key.id
  secret_string = tls_private_key.main.private_key_pem
}
