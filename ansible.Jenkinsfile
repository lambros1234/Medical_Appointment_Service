pipeline {
    agent any

    environment {
        DOCKER_TOKEN = credentials('docker-push-secret')
        DOCKER_USER = 'lambros1234'
        DOCKER_SERVER = 'ghcr.io'
        DOCKER_PREFIX = 'ghcr.io/lambros1234/Medical_Appointment_Service'
    }

    stages {
        stage('Frontend CI/CD') {
            steps {
                build job: 'frontend-job' // create a separate Jenkins job pointing to frontend folder
            }
        }

        stage('Backend CI/CD') {
            steps {
                build job: 'backend-job' // create a separate Jenkins job pointing to backend folder
            }
        }

        stage('Docker Build & Push') {
            steps {
                sh '''
                    FRONTEND_TAG=$DOCKER_PREFIX/frontend:latest
                    BACKEND_TAG=$DOCKER_PREFIX/backend:latest

                    cd frontend
                    docker build -t $FRONTEND_TAG .
                    cd ../backend
                    docker build -t $BACKEND_TAG .

                    echo $DOCKER_TOKEN | docker login $DOCKER_SERVER -u $DOCKER_USER --password-stdin
                    docker push $FRONTEND_TAG
                    docker push $BACKEND_TAG
                '''
            }
        }

        stage('Deploy via Ansible') {
            steps {
                sh '''
                    # assumes ansible repo is cloned separately on the Jenkins node
                    ANSIBLE_REPO_DIR=~/workspace/ansible
                    cd $ANSIBLE_REPO_DIR
                    ansible-playbook -i hosts.yaml -e frontend_image=$DOCKER_PREFIX/frontend:latest -e backend_image=$DOCKER_PREFIX/backend:latest playbooks/deploy.yaml
                '''
            }
        }
    }
}
