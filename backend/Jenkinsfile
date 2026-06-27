pipeline {
  agent any

  options {
    buildDiscarder(logRotator(numToKeepStr: '20'))
    timeout(time: 30, unit: 'MINUTES')
    disableConcurrentBuilds()
  }

  environment {
    ECR_REGISTRY  = '390449413955.dkr.ecr.us-east-1.amazonaws.com'
    AWS_REGION    = 'us-east-1'
    IMAGE_TAG     = "${env.BUILD_NUMBER}"
    BACKEND_IMAGE = '390449413955.dkr.ecr.us-east-1.amazonaws.com/taskflow-backend'
  }

  stages {

    stage('Unit Tests') {
      steps {
        sh '''
          docker run --rm -u root \
            -v "$WORKSPACE/backend":/app \
            -w /app \
            node:18-alpine \
            sh -c "npm ci && npm test -- --ci --coverage"
        '''
      }
      post {
        always {
          junit allowEmptyResults: true, testResults: 'backend/coverage/junit.xml'
        }
      }
    }

    stage('Build') {
      steps {
        sh '''
          docker build \
            --tag ${BACKEND_IMAGE}:${IMAGE_TAG} \
            --tag ${BACKEND_IMAGE}:latest \
            ./backend
        '''
      }
    }

    stage('Push to ECR') {
      steps {
        sh '''
          aws ecr get-login-password --region ${AWS_REGION} \
            | docker login --username AWS --password-stdin ${ECR_REGISTRY}

          docker push ${BACKEND_IMAGE}:${IMAGE_TAG}
          docker push ${BACKEND_IMAGE}:latest
        '''
      }
    }

  }

  post {
    success {
      echo "Backend CI succeeded -- ${BACKEND_IMAGE}:${IMAGE_TAG} pushed to ECR"
    }
    failure {
      echo "Backend CI failed at stage: ${env.STAGE_NAME}"
    }
  }
}
