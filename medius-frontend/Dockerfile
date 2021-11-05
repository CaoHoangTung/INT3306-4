FROM node:14.18-alpine as build

COPY ./package*.json ./
RUN npm ci

COPY . .

RUN npm run build

FROM node:14.18-alpine as run

WORKDIR /app

COPY --from=build ./build ./build

RUN npm install -g serve

EXPOSE 5000

CMD ["serve", "-s", "build"]