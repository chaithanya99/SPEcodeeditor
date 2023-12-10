pipeline{
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
                    backend_img = docker.build('chaithanya970/codeeditor:backend', './backend/')
                }
            }
        }

        stage("Build frontend docker image"){
            steps{
                script {
                    frontend_img = docker.build('chaithanya970/codeeditor:frontend', './frontend/')
                }
            }
        }

        stage("Build coderunner docker image"){
            steps{
                script {
                    coderunner_img = docker.build('chaithanya970/codeeditor:coderunner', './coderunner/')
                }
            }
        }
        
        stage("Pushing docker images"){
            steps{
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