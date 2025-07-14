FROM node:19-alpine3.16 AS build
ARG ASTRO_BASE_URL=./
WORKDIR /app
COPY package.json .
RUN npm install --prefer-offline --no-audit --progress=false
COPY . .
RUN npm run build -- --base ${ASTRO_BASE_URL} && find dist -type f -name '*.html' -exec \
  sed -i \
  -e 's|href="/\./|href="./|g' \
  -e 's|src="/\./|src="./|g' \
  {} +

# Stage 2

FROM nginx:alpine
# COPY /dist /usr/share/nginx/html
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

# artifact stage for deployment

FROM scratch AS artifact
ARG APP_NAME=ecosystem-simulations
COPY --from=build /app/dist /${APP_NAME}
