pipeline {
    agent any

    environment {
        APP_NAME = "the-tip-top-front"
        DOCKER_IMAGE = "joanisky/the-tip-top-front"
        DOCKER_TAG = "${BUILD_NUMBER}"
        KUBE_NAMESPACE = "the-tip-top-front"
        KUBE_DEPLOYMENT = "nuxt-front"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build & Push Docker') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'jenkins-dockerhub', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                    	docker login -u $DOCKER_USER -p $DOCKER_PASS

						# On build une seule fois avec le tag unique
						docker build \
							-f .docker/Dockerfile \
							--target prod \
							-t ${DOCKER_IMAGE}:${DOCKER_TAG} .

						docker push ${DOCKER_IMAGE}:${DOCKER_TAG}
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
                        echo "** Updating Deployment to use image version: ${DOCKER_TAG} **"
                        kubectl set image deployment/${KUBE_DEPLOYMENT} web=${DOCKER_IMAGE}:${DOCKER_TAG} -n ${KUBE_NAMESPACE}

                        # vérifier le statut
                        kubectl rollout status deployment/${KUBE_DEPLOYMENT} -n ${KUBE_NAMESPACE} --timeout=300s
                    '''
                }
            }
        }
    }

	post {
		always {
			// Supprime les images locales pour ne pas saturer le disque du VPS Jenkins
			sh "docker rmi ${DOCKER_IMAGE}:${DOCKER_TAG} || true"
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