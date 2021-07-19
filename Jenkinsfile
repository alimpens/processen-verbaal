#!groovy

// Project Settings for Deployment
String PROJECTNAME = "processen-verbaal"
String CONTAINERDIR = "."
String PRODUCTION_BRANCH = "master"
String ACCEPTANCE_BRANCH = "development"
String PRODUCTION_ROOT_URL = "https://static.amsterdam.nl/processen-verbaal"
String ACCEPTANCE_ROOT_URL = "https://acc.static.amsterdam.nl/processen-verbaal"
String INFRASTRUCTURE = 'thanos'
String PLAYBOOK = 'deploy.yml'

// All other data uses variables, no changes needed for static
String CONTAINERNAME = "docker-registry.data.amsterdam.nl/static/${PROJECTNAME}:${env.BUILD_NUMBER}"
String BRANCH = "${env.BRANCH_NAME}"

image = 'initial value'

def tryStep(String message, Closure block, Closure tearDown = null) {
    try {
        block();
    }
    catch (Throwable t) {
        // Disable while developing
        // slackSend message: "${env.JOB_NAME}: ${message} failure ${env.BUILD_URL}", channel: '#ci-channel', color: 'danger'
        throw t;
    }
    finally {
        if (tearDown) {
            tearDown();
        }
    }
}

node {
    // Get a copy of the code
    stage("Checkout") {
        checkout scm
    }
}

// Acceptance branch
if (BRANCH == "${ACCEPTANCE_BRANCH}") {
    node {
        // Build the Dockerfile in the $CONTAINERDIR, pass REACT_APP_URL environment variable and push it to Nexus
        stage("Build develop image") {
            tryStep "build", {
                image = docker.build("${CONTAINERNAME}", "--build-arg REACT_APP_URL=${ACCEPTANCE_ROOT_URL} ${CONTAINERDIR}")
                image.push()
            }
        }
        // fetch the container, label with acceptance and deploy to acceptance.
        stage("Deploy to ACC") {
            tryStep "deployment", {
                image.push("acceptance")
                build job: 'Subtask_Openstack_Playbook',
                        parameters: [
                                [$class: 'StringParameterValue', name: 'INFRASTRUCTURE', value: "${INFRASTRUCTURE}"],
                                [$class: 'StringParameterValue', name: 'INVENTORY', value: 'acceptance'],
                                [$class: 'StringParameterValue', name: 'PLAYBOOK', value: "${PLAYBOOK}"],
                                [$class: 'StringParameterValue', name: 'PLAYBOOKPARAMS', value: "-e cmdb_id=app_${PROJECTNAME}"],
                        ]
            }
        }
  }
}

// Master branch
if (BRANCH == "${PRODUCTION_BRANCH}") {
    node {
        // Build the Dockerfile in the $CONTAINERDIR, pass REACT_APP_URL environment variable and push it to Nexus
        stage("Build develop image") {
            tryStep "build", {
                image = docker.build("${CONTAINERNAME}", "--build-arg REACT_APP_URL=${PRODUCTION_ROOT_URL} ${CONTAINERDIR}")
                image.push()
            }
        }
        // fetch the container, tag with production and latest and deploy to production
        stage("Deploy to PROD") {
            tryStep "deployment", {
                image.push("production")
                image.push("latest")
                build job: 'Subtask_Openstack_Playbook',
                        parameters: [
                                [$class: 'StringParameterValue', name: 'INFRASTRUCTURE', value: "${INFRASTRUCTURE}"],
                                [$class: 'StringParameterValue', name: 'INVENTORY', value: 'production'],
                                [$class: 'StringParameterValue', name: 'PLAYBOOK', value: "${PLAYBOOK}"],
                                [$class: 'StringParameterValue', name: 'PLAYBOOKPARAMS', value: "-e cmdb_id=app_${PROJECTNAME}"],
                        ]
            }
        }
    }
}
