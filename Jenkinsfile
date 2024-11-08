pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git(credentialsId: 'github-credentials', url: 'https://github.com/sanjaykshebbar/CapstoneProject-DevOps.git', branch: 'main')
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build('sanjaykshebbar/asi-insurance-app')
                }
            }
        }

        stage('Push Docker Image to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                    sh '''
                    echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
                    docker push sanjaykshebbar/asi-insurance-app:latest
                    '''
                }
            }
        }

        stage('Run Ansible Playbook') {
            steps {
                withCredentials([file(credentialsId: 'ansible-ssh-key', variable: 'ANSIBLE_SSH_PRIVATE_KEY')]) {
               sh '''
                export ANSIBLE_SSH_PRIVATE_KEY_PATH="$ANSIBLE_SSH_PRIVATE_KEY"
                chmod 600 "$ANSIBLE_SSH_PRIVATE_KEY_PATH"

                # Run the Ansible playbook using the default hosts file
                 ansible-playbook deploy-playbook.yml --private-key="$ANSIBLE_SSH_PRIVATE_KEY_PATH"
                 '''
        }
    }
}

    }

    post {
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
