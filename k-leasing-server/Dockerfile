FROM node:14-alpine as build-stage
ENV NODE_ENV=production
WORKDIR /app
COPY ./ /app
COPY package*.json /app/
RUN npm install
COPY . .
EXPOSE 3001
CMD [ "node", "index.js" ]