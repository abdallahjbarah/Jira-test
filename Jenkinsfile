pipeline {
    agent any

    triggers {
        githubPush()
    }

    stages {
        stage('Laptop Folder Test') {
            steps {
                sshagent(['laptop-key-id']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no LENOVO@localhost -p 2222 \
                        "powershell -Command \\"New-Item -ItemType Directory -Force -Path C:\\\\Users\\\\LENOVO\\\\Desktop\\\\FromJenkins\\""
                    '''
                }
            }
        }
    }
}
