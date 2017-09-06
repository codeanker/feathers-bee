pipeline {
  agent {
    node {
      label 'docker'
    }
    
  }
  stages {
    stage('npm') {
      steps {
        sh 'npm i'
      }
    }
    stage('test') {
      steps {
        sh 'npm test'
      }
    }
  }
}