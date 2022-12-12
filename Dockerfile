FROM node:18-alpine
WORKDIR /opt/app
ADD package.json package.json
RUN npm install
ADD . .
RUN npm run build
RUN npm prune --production
CMD ["cross-env NODE_ENV=prod node", "./dist/main.js"]
