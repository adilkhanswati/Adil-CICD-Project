pipeline {
    agent any

    // Build runs automatically when GitHub fires the push webhook (Lecture 12).
    triggers { githubPush() }

    environment {
        IMAGE = 'adil-cicd-project'
        // 'dockerhub-adil' credential -> REGISTRY_USR / REGISTRY_PSW
        REGISTRY = credentials('dockerhub-adil')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            steps {
                echo 'Installing dependencies...'
                sh 'node --version'
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                echo 'Running tests...'
                sh 'npm test'
            }
        }
        stage('Docker Build & Push') {
            steps {
                sh 'docker build -t $REGISTRY_USR/$IMAGE:$BUILD_NUMBER -t $REGISTRY_USR/$IMAGE:latest .'
                sh 'echo "$REGISTRY_PSW" | docker login -u "$REGISTRY_USR" --password-stdin'
                sh 'docker push $REGISTRY_USR/$IMAGE:$BUILD_NUMBER'
                sh 'docker push $REGISTRY_USR/$IMAGE:latest'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deployed!'
            }
        }
    }

    post {
        always { sh 'docker logout || true' }
        success { echo 'Pipeline SUCCESS - image pushed to Docker Hub!' }
        failure { echo 'Pipeline FAILED!' }
    }
}
