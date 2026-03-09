pipeline {
    agent none

    environment {
        APP_NAME = "the-tip-top-front"
        DOCKER_IMAGE = "joanisky/the-tip-top-front"
        DOCKER_TAG = "${BUILD_NUMBER}"
        KUBE_NAMESPACE = "the-tip-top-front"
        KUBE_DEPLOYMENT = "nuxt-front"
    }

    stages {
        stage('Checkout') {
        	agent any
            steps {
                checkout scm
            }
        }
		stage('Tests') {
			agent {
			   kubernetes {
				   yamlFile 'k8s/jenkins/test-pod.yaml'
				   defaultContainer 'node'
			   }
			}
            steps {
                withCredentials([
                    string(credentialsId: 'e2e-test-user-email', variable: 'TEST_USER_EMAIL'),
                    string(credentialsId: 'e2e-test-user-password', variable: 'TEST_USER_PASSWORD'),
                    string(credentialsId: 'e2e-test-win-code', variable: 'TEST_WIN_CODE'),
                ]) {
                    sh '''
                        HUSKY=0 npm install --ignore-scripts
                        npm run test:report || true
                        BASE_URL=https://the-tip-top.jonathanlore.fr \
                        TEST_USER_EMAIL=$TEST_USER_EMAIL \
                        TEST_USER_PASSWORD=$TEST_USER_PASSWORD \
                        TEST_WIN_CODE=$TEST_WIN_CODE \
                        npm run test:e2e:ci || true
                    '''
                }
            }
            post {
                always {
					stash includes: 'test-results/**/*,playwright-report/**/*', name: 'test-reports', allowEmpty: true
                }
            }
        }
		stage('Publish Reports') {
			agent any
			steps {
				unstash 'test-reports'
				junit allowEmptyResults: true, testResults: 'test-results/**/*.xml'
				publishHTML(target: [
					allowMissing: true,
					alwaysLinkToLastBuild: false,
					keepAll: true,
					reportDir: 'playwright-report',
					reportFiles: 'index.html',
					reportName: 'Playwright Report'
				])
			}
			post {
				always {
					cleanWs()
				}
			}
		}
        stage('Build & Push Docker') {
        	agent any
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
        	agent any
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
			agent any
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
		agent any
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
			node('built-in') {
				sh "docker rmi ${DOCKER_IMAGE}:${DOCKER_TAG} || true"
			}
		}
		success {
			echo "✅ ${APP_NAME} déployé avec succès !"
		}
		failure {
			echo "❌ Pipeline échoué"
		}
	}
}