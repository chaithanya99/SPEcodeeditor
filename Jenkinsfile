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
                sh "docker build -t chaithanya970/codeeditor:backend backend/"
            }
        }

        stage("Build frontend docker image"){
            steps{
                sh "docker build -t chaithanya970/codeeditor:frontend frontend/"
            }
        }

        stage("Build coderunner docker image"){
            steps{
                sh "docker build -t chaithanya970/codeeditor:coderunner coderunner/"
            }
        }
        
        stage("Pushing docker images"){
            steps{
                sh "docker push chaithanya970/codeeditor:backend"
                sh "docker push chaithanya970/codeeditor:frontend"
                sh "docker push chaithanya970/codeeditor:coderunner"
            }
        }
        // add ansible 
    }
    
}