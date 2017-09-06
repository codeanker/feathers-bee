pipeline {
  agent {
    node {
      label 'node'
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