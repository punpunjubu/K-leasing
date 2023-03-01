FROM node:16-alpine as build-fe
ENV NODE_ENV=production
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json /app/
RUN npm install
RUN npm install react-scripts -g
RUN npm -g install eslint
RUN npm -g install eslint-config-next
COPY . .
ENV GENERATE_SOURCEMAP false
RUN npm run build
CMD ["npm", "start"]
# CMD [ "node", "server.js" ]
EXPOSE 3000