pipeline {
  agent none

  options {
    buildDiscarder(logRotator(numToKeepStr: '20'))
    timeout(time: 30, unit: 'MINUTES')
    disableConcurrentBuilds()
  }

  environment {
    ECR_REGISTRY   = '390449413955.dkr.ecr.us-east-1.amazonaws.com'
    ECR_REPO       = 'taskflow'
    AWS_REGION     = 'us-east-1'
    IMAGE_TAG      = "${env.BUILD_NUMBER}"
    BACKEND_IMAGE  = '390449413955.dkr.ecr.us-east-1.amazonaws.com/taskflow-backend'
    FRONTEND_IMAGE = '390449413955.dkr.ecr.us-east-1.amazonaws.com/taskflow-frontend'
  }

  stages {

    stage('Unit Tests') {
      agent {
        docker {
          image 'node:18-alpine'
          args '-u root'
        }
      }
      steps {
        dir('backend') {
          sh 'npm ci'
          sh 'npm test -- --ci --coverage'
        }
      }
      post {
        always {
          junit allowEmptyResults: true, testResults: 'backend/coverage/junit.xml'
        }
      }
    }

    stage('Build') {
      parallel {
        stage('Build Backend') {
          agent any
          steps {
            sh '''
              docker build \
                --tag ${BACKEND_IMAGE}:${IMAGE_TAG} \
                --tag ${BACKEND_IMAGE}:latest \
                ./backend
            '''
          }
        }
        stage('Build Frontend') {
          agent any
          steps {
            sh '''
              docker build \
                --tag ${FRONTEND_IMAGE}:${IMAGE_TAG} \
                --tag ${FRONTEND_IMAGE}:latest \
                ./frontend
            '''
          }
        }
      }
    }
  }

  post {
    success {
      echo "Pipeline succeeded — ${BACKEND_IMAGE}:${IMAGE_TAG} is live"
    }
    failure {
      echo "Pipeline failed at stage: ${env.STAGE_NAME}"
    }
  }
}
