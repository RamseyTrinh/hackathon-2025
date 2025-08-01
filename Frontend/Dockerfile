FROM node:16-alpine

WORKDIR /app

COPY . .

RUN npm install --force

RUN npm run build

FROM nginx:alpine

COPY --from=0 /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
