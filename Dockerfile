FROM node:14-alpine AS base

WORKDIR /usr/src/app

COPY ./package* ./

RUN npm set progress=false && npm config set depth 0
RUN npm i --only=prod

COPY nest-cli.json ./
COPY tsconfig* ./
COPY env ./env
COPY .eslintrc.js ./.eslintrc.js
COPY shared ./shared

COPY apps /usr/apps

FROM node:14-alpine AS user
WORKDIR /usr/src/app
COPY --from=base /usr/src/app/ .
COPY --from=base /usr/apps/user ./apps/user
CMD ["npm","run","start:dev","user"]

FROM node:14-alpine AS notification
WORKDIR /usr/src/app
COPY --from=base /usr/src/app/ .
COPY --from=base /usr/apps/notification ./apps/notification
CMD ["npm","run","start:dev","notification"]

FROM node:14-alpine AS api-gateway
WORKDIR /usr/src/app
COPY --from=base /usr/src/app/ .
COPY --from=base /usr/apps/api-gateway ./apps/api-gateway
CMD ["npm","run","start:dev"]

FROM node:14-alpine AS upload
WORKDIR /usr/src/app
COPY --from=base /usr/src/app/ .
COPY --from=base /usr/apps/upload ./apps/upload
CMD ["npm","run","start:dev", "upload"]

FROM node:14-alpine AS trips
WORKDIR /usr/src/app
COPY --from=base /usr/src/app/ .
COPY --from=base /usr/apps/trips ./apps/trips
CMD ["npm","run","start:dev", "trips"]