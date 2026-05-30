pipeline {
    agent any

    stages {

        stage('Clone GitHub Repo') {
            steps {
                git branch: 'main',
                url: 'https://github.com/Prajwal-8421/Employee-Management-System.git'
            }
        }

        stage('Build Backend Jar') {
            steps {
                dir('back_End') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Stop Old Containers') {
            steps {
                sh 'docker rm -f employee-backend || true'
                sh 'docker rm -f employee-frontend || true'
            }
        }

        stage('Build Backend Docker') {
            steps {
                dir('back_End') {
                    sh 'docker build -t employee-backend-image .'
                }
            }
        }

        stage('Run Backend Container') {
            steps {
                sh 'docker run -d --name employee-backend -p 9091:9091 employee-backend-image'
            }
        }

        stage('Build Frontend Docker') {
            steps {
                dir('front') {
                    sh 'docker build -t employee-frontend-image .'
                }
            }
        }

        stage('Run Frontend Container') {
            steps {
                sh 'docker run -d --name employee-frontend -p 3000:3000 employee-frontend-image'
            }
        }
    }
}
