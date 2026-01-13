pipeline {
    agent any

    environment {
        APP_NAME = "the-tip-top-front"
        DOCKER_IMAGE = "joanisky/the-tip-top-front"
        DOCKER_TAG = "latest"
        DOCKER_TAG_BUILD = "${BUILD_NUMBER}"
        KUBE_NAMESPACE = "the-tip-top-front"
        KUBE_DEPLOYMENT = "nuxt-front"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // vérifier la syntaxe sans builder l'image
        stage('Lint & Type Check') {
			agent {
				docker {
					image 'node:20-alpine'
					args '-v $HOME/.npm:/root/.npm'
				}
			}
			steps {
				sh 'npm install'
				sh 'npx nuxi prepare'
				sh 'npx nuxi typecheck'
			}
		}
        stage('Build & Push Docker') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'jenkins-dockerhub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        docker login -u $DOCKER_USER -p $DOCKER_PASS
                        docker build \
                            -f .docker/Dockerfile \
                            --target prod \
                            -t ${DOCKER_IMAGE}:${DOCKER_TAG} \
                            -t ${DOCKER_IMAGE}:${DOCKER_TAG_BUILD} .
                        docker push ${DOCKER_IMAGE}:${DOCKER_TAG}
                        docker push ${DOCKER_IMAGE}:${DOCKER_TAG_BUILD}
                    '''
                }
            }
        }

        stage('Deploy to Kubernetes') {
            when {
                expression { env.GIT_BRANCH == 'origin/main' }
            }
            steps {
 				withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG_PATH')]) {
                     sh '''
					 	export KUBECONFIG=$KUBECONFIG_PATH

						# Créer le namespace s'il n'existe pas (important !)
                        kubectl create namespace ${KUBE_NAMESPACE} --dry-run=client -o yaml | kubectl apply -f -

                        # Appliquer les ressources (Deployment, Service, Ingress)
                        kubectl apply -k k8s/ -n ${KUBE_NAMESPACE}

                        # Mettre à jour l'image
                        kubectl set image deployment/${KUBE_DEPLOYMENT} web=${DOCKER_IMAGE}:${DOCKER_TAG} -n ${KUBE_NAMESPACE}

                        # vérifier le statut
                        kubectl rollout status deployment/${KUBE_DEPLOYMENT} -n ${KUBE_NAMESPACE}
                    '''
                }
            }
        }
    }

	post {
		always {
			cleanWs()
		}
		success {
			echo "✅ ${APP_NAME} deployed successfully!"
		}
		failure {
			echo "❌ Pipeline failed"
		}
	}
}