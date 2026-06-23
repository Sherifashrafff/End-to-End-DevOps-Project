output "master_public_ip" {
  value = aws_instance.master.public_ip
}

output "worker_public_ip" {
  value = aws_instance.worker.public_ip
}

output "ansible_inventory" {
  description = "Ready-to-use Ansible inventory — paste into prj/inv"
  value = <<-EOT
    [control_node]
    ${aws_instance.master.public_ip}

    [worker_nodes]
    ${aws_instance.worker.public_ip}

    [all:vars]
    ansible_user=ec2-user
    ansible_ssh_private_key_file=/home/sherif/ansible/prj/k8s.pem
  EOT
}
