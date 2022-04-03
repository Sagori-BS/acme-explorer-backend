FROM node:16-alpine AS acme-explorer

WORKDIR /usr/src/app

COPY ./package* ./

RUN npm set progress=false && npm config set depth 0
RUN npm i --only=prod

COPY nest-cli.json ./
COPY tsconfig* ./
COPY env ./env
COPY .eslintrc.js ./.eslintrc.js

COPY src ./src

CMD ["npm","run","start:dev"]


