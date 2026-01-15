FROM node:20-alpine AS base
WORKDIR /var/www/html

RUN apk add --no-cache bash curl git

EXPOSE 3000

# --- Stage DEV ---
FROM base AS dev
ENV NODE_ENV=development

RUN mkdir -p /var/www/html/node_modules && chown -R node:node /var/www/html

# On bascule sur l'utilisateur node
USER node
# En dev, on lance npm install et nuxt dev
CMD bash -c "npm install && npx nuxt dev --host 0.0.0.0"

# --- Stage BUILD (pour la prod) ---
FROM base AS build
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --- Stage PROD ---
FROM base AS prod
ENV NODE_ENV=production
# On ne copie que l'output du build
COPY --from=build /var/www/html/.output ./.output
CMD ["node", ".output/server/index.mjs"]