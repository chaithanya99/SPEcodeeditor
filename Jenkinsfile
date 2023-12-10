pipeline{
    environment {
        backend_img = ""
        frontend_img = ""
        coderunner_img = ""
    }
    agent any
    stages{
        stage("Git clone"){
            steps{
                git branch: 'master',
                url:"https://github.com/chaithanya99/SPEcodeeditor.git"
            }
        }

        stage("Running React Tests"){
            steps{
                sh '''
                    cd frontend
                    npm install
                    npm run test
                '''
            }
        }

        stage("Running backend Tests"){
            steps{
                sh '''
                    cd backend
                    npm install
                    npm run test
                '''
            }
        }

        stage("Build backend docker image"){
            steps{
                script {
                    // sh "docker build -t chaithanya970/codeeditor:backend backend/"
                    backend_img = docker.build('chaithanya970/codeeditor:backend', './backend/')
                }
            }
        }

        stage("Build frontend docker image"){
            steps{
                script {
                    // sh "docker build -t chaithanya970/codeeditor:frontend frontend/"
                    frontend_img = docker.build('chaithanya970/codeeditor:frontend', './frontend/')
                }
            }
        }

        stage("Build coderunner docker image"){
            steps{
                script {
                    // sh "docker build -t chaithanya970/codeeditor:coderunner coderunner/"
                    coderunner_img = docker.build('chaithanya970/codeeditor:coderunner', './coderunner/')
                }
            }
        }
        
        stage("Pushing docker images"){
            steps{
                // sh "docker push chaithanya970/codeeditor:backend"
                // sh "docker push chaithanya970/codeeditor:frontend"
                // sh "docker push chaithanya970/codeeditor:coderunner"
                script {
                    docker.withRegistry('', 'Dockerhub') {
                        backend_img.push()
                        frontend_img.push()
                        coderunner_img.push()
                    }
                }
            }
        }

        stage("Ansible Deployment") {
            steps {
                ansiblePlaybook becomeUser: null,
                colorized: true,
                credentialsId: 'localhost_cred',
                disableHostKeyChecking: true,
                inventory: 'deployment/inventory',
                playbook: 'deployment/deployment.yaml',
                sudoUser: null
            }
        }
    }
    
}