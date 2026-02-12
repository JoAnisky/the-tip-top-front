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
        stage('Create/Update Kubernetes Secrets') {
            when {
                expression { env.GIT_BRANCH == 'origin/main' }
            }
            steps {
                withCredentials([
                    string(credentialsId: 'nuxt-session-password', variable: 'SESSION_PASSWORD'),
                    file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG_PATH')
                ]) {
                    sh '''
                        export KUBECONFIG=$KUBECONFIG_PATH

                        # Créer le namespace s'il n'existe pas
                        kubectl create namespace ${KUBE_NAMESPACE} --dry-run=client -o yaml | kubectl apply -f -

                        echo "Création/mise à jour des secrets..."

                        # Crée ou met à jour le secret avec le mot de passe de session
                        kubectl create secret generic nuxt-front-secrets \
                            --from-literal=NUXT_SESSION_PASSWORD=${SESSION_PASSWORD} \
                            --namespace=${KUBE_NAMESPACE} \
                            --dry-run=client -o yaml | kubectl apply -f -

                        echo "Secret créé/mis à jour"
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

                        # Applique les ressources (Deployment, Service, Ingress, ConfigMap)
						echo "Déploiement des ressources Kubernetes..."
                        kubectl apply -k k8s/ -n ${KUBE_NAMESPACE}

                        # Met à jour l'image du deployment
                        echo "** Mise à jour de l'image en version: ${DOCKER_TAG} **"
                        kubectl set image deployment/${KUBE_DEPLOYMENT} web=${DOCKER_IMAGE}:${DOCKER_TAG} -n ${KUBE_NAMESPACE}

                        # Attend que le rollout soit terminé
						echo "Attente du rollout..."
                        kubectl rollout status deployment/${KUBE_DEPLOYMENT} -n ${KUBE_NAMESPACE} --timeout=300s
                    '''
                }
            }
        }
		stage('Verify Deployment') {
			when {
				expression { env.GIT_BRANCH == 'origin/main' }
			}
			steps {
				withCredentials([file(credentialsId: 'kubeconfig', variable: 'KUBECONFIG_PATH')]) {
					sh '''
						export KUBECONFIG=$KUBECONFIG_PATH

						echo "État du déploiement :"
						echo ""

						echo "=== Pods ==="
						kubectl get pods -n ${KUBE_NAMESPACE}
						echo ""

						echo "=== Services ==="
						kubectl get svc -n ${KUBE_NAMESPACE}
						echo ""

						echo "=== Ingress ==="
						kubectl get ingress -n ${KUBE_NAMESPACE}
						echo ""

						echo "=== Secrets ==="
						kubectl get secrets -n ${KUBE_NAMESPACE}
						echo ""

						echo "=== ConfigMaps ==="
						kubectl get configmaps -n ${KUBE_NAMESPACE}
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
			echo "✅ ${APP_NAME} déployé avec succès !"
		}
		failure {
			echo "❌ Pipeline échoué"
		}
	}
}