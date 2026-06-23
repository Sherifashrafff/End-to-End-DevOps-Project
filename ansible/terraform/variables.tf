variable "region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "instance_type" {
  description = "EC2 instance type (min 2 vCPU / 2 GB for Kubernetes)"
  type        = string
  default     = "t3.medium"
}

variable "key_name" {
  description = "Name of the existing AWS key pair for SSH access"
  type        = string
  default     = "k8s"
}

variable "allowed_ssh_cidr" {
  description = "CIDR allowed to SSH into the nodes"
  type        = string
  default     = "0.0.0.0/0"
}
