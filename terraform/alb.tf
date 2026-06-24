# ── ALB Security Group ────────────────────────────────────────────────────────

resource "aws_security_group" "alb" {
  name        = "${var.project}-alb"
  description = "Internet-facing Application Load Balancer"
  vpc_id      = aws_vpc.main.id

  ingress {
    description = "HTTP from internet"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = { Name = "${var.project}-alb" }
}

# Allow ALB to reach workers on the frontend NodePort only
resource "aws_security_group_rule" "worker_from_alb" {
  description              = "Frontend NodePort from ALB only"
  type                     = "ingress"
  from_port                = var.frontend_nodeport
  to_port                  = var.frontend_nodeport
  protocol                 = "tcp"
  security_group_id        = aws_security_group.worker.id
  source_security_group_id = aws_security_group.alb.id
}

# ── Application Load Balancer ─────────────────────────────────────────────────

resource "aws_lb" "main" {
  name               = "${var.project}-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = aws_subnet.public[*].id

  tags = { Name = "${var.project}-alb" }
}

# ── Target Group - Frontend NodePort ─────────────────────────────────────────

resource "aws_lb_target_group" "frontend" {
  name        = "${var.project}-frontend"
  port        = var.frontend_nodeport
  protocol    = "HTTP"
  vpc_id      = aws_vpc.main.id
  target_type = "instance"

  health_check {
    path                = "/"
    protocol            = "HTTP"
    matcher             = "200"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 3
  }

  tags = { Name = "${var.project}-frontend" }
}

resource "aws_lb_target_group_attachment" "frontend" {
  count            = var.worker_count
  target_group_arn = aws_lb_target_group.frontend.arn
  target_id        = aws_instance.worker[count.index].id
  port             = var.frontend_nodeport
}

# ── Listener ──────────────────────────────────────────────────────────────────

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.main.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.frontend.arn
  }
}
