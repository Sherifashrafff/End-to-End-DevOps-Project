# RDS requires a subnet group spanning at least 2 AZs
resource "aws_db_subnet_group" "main" {
  name       = "${var.project}-rds-subnets"
  subnet_ids = aws_subnet.private[*].id

  tags = { Name = "${var.project}-rds-subnets" }
}

resource "aws_db_instance" "postgres" {
  identifier        = "${var.project}-postgres"
  engine            = "postgres"
  engine_version    = var.db_engine_version
  instance_class    = var.db_instance_class
  allocated_storage = 20
  storage_type      = "gp2"

  db_name  = var.db_name
  username = var.db_username

  # RDS generates a strong password and stores it in Secrets Manager.
  # No plaintext password is ever passed through Terraform state.
  manage_master_user_password = true

  db_subnet_group_name   = aws_db_subnet_group.main.name
  vpc_security_group_ids = [aws_security_group.rds.id]

  publicly_accessible = false
  storage_encrypted   = true
  skip_final_snapshot = true
  deletion_protection = false

  tags = { Name = "${var.project}-postgres" }
}
