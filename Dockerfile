# CREATE BASE IMAGE
FROM node:14-alpine AS base
WORKDIR /usr/src/app
COPY ./package* ./
RUN npm set progress=false && npm config set depth 0
RUN npm i
COPY nest-cli.json ./
COPY tsconfig* ./
COPY env ./env
COPY shared ./shared
COPY apps /usr/apps

FROM node:14-alpine AS prod_node_modules
WORKDIR /usr/src/app
COPY --from=base /usr/src/app/package* ./
RUN npm i --production

# BUILD API GATEWAY
FROM node:14-alpine AS api-gateway-pre-build
WORKDIR /usr/src/app
COPY --from=base /usr/src/app/ .
COPY --from=base /usr/apps/api-gateway ./apps/api-gateway
RUN ["npm", "run", "build", "api-gateway"]

FROM gcr.io/distroless/nodejs AS api-gateway
WORKDIR /usr/src/app
COPY --from=prod_node_modules /usr/src/app/node_modules/ ./node_modules/
COPY --from=api-gateway-pre-build /usr/src/app/env/ ./env/
COPY --from=api-gateway-pre-build /usr/src/app/dist/apps/api-gateway/ ./dist/apps/api-gateway/
CMD ["dist/apps/api-gateway/main.js"]

# # BUILD NOTIFICATION-SERVICE
FROM node:14-alpine AS notification-pre-build
WORKDIR /usr/src/app
COPY --from=base /usr/src/app/ .
COPY --from=base /usr/apps/notification ./apps/notification
RUN ["npm", "run", "build", "notification"]

FROM gcr.io/distroless/nodejs AS notification
WORKDIR /usr/src/app
COPY --from=prod_node_modules /usr/src/app/node_modules/ ./node_modules/
COPY --from=notification-pre-build /usr/src/app/env/ ./env/
COPY --from=notification-pre-build /usr/src/app/dist/apps/notification/ ./dist/apps/notification/
CMD ["dist/apps/notification/main.js"]

# BUILD USER-SERVICE
FROM node:14-alpine AS user-pre-build
WORKDIR /usr/src/app
COPY --from=base /usr/src/app/ .
COPY --from=base /usr/apps/user ./apps/user
RUN ["npm", "run", "build", "user"]

FROM gcr.io/distroless/nodejs AS user
WORKDIR /usr/src/app
COPY --from=prod_node_modules /usr/src/app/node_modules/ ./node_modules/
COPY --from=user-pre-build /usr/src/app/env/ ./env/
COPY --from=user-pre-build /usr/src/app/dist/apps/user/ ./dist/apps/user/
CMD ["dist/apps/user/main.js"]




