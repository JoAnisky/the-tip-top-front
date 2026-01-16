FROM node:20-alpine AS base
WORKDIR /var/www/html

RUN apk add --no-cache bash curl git

# --- Stage DEV ---
FROM base AS dev
ENV NODE_ENV=development

# on s'assure que l'utilisateur node est proprio du dossier html (sinon pas possible de RX un fichier)
RUN mkdir -p /var/www/html/node_modules .nuxt && \
    chown -R node:node /var/www/html

USER node

# En dev, on lance npm install et nuxt dev
CMD bash -c "npm install && npx nuxt dev --host 0.0.0.0"

# --- Stage BUILD (Prod) ---
FROM base AS build
# on copie SEULEMENT les fichiers de dépendances pour mettre en cache l'install
COPY package*.json ./
RUN npm install --frozen-lockfile

# on copie le reste du code (le .dockerignore filtrera ici)
COPY . .
RUN npm run build

# --- Stage PROD ---
FROM base AS prod
ENV NODE_ENV=production

USER node

# On récupère le build propre
COPY --from=build --chown=node:node /var/www/html/.output ./.output

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]