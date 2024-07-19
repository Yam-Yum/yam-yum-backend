# Build Stage
FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build




# Production Stage
FROM node:20-alpine

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist

COPY --from=build /usr/src/app/package*.json ./

COPY --from=build /usr/src/app/.env  ./

RUN npm install --only=production

CMD ["node", "dist/main.js"]