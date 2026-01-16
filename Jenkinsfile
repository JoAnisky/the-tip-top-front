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
                        echo "** Updating Front image to ${DOCKER_IMAGE}:${DOCKER_TAG} **"
                        kubectl set image deployment/${KUBE_DEPLOYMENT} web=${DOCKER_IMAGE}:${DOCKER_TAG} -n ${KUBE_NAMESPACE}

						# 4. Force rollout (vider le cache et forcer le pull) : annotation qui change à chaque build, forçant K8s à recréer les pods
						TIMESTAMP=$(date +%s)
						kubectl patch deployment ${KUBE_DEPLOYMENT} -n ${KUBE_NAMESPACE} \
							-p "{\\"spec\\":{\\"template\\":{\\"metadata\\":{\\"annotations\\":{\\"redeploy-timestamp\\":\\"$TIMESTAMP\\"}}}}}"

                        # vérifier le statut
                        kubectl rollout status deployment/${KUBE_DEPLOYMENT} -n ${KUBE_NAMESPACE} --timeout=300s
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