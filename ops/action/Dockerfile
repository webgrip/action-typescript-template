FROM node:24-alpine AS base
WORKDIR /workspace
COPY . .
RUN npm install

FROM base AS build
RUN npm run build

FROM build AS action
ENV NODE_ENV=production
CMD ["node", "dist/index.js"]

FROM build AS test
ENV NODE_ENV=test
CMD ["npm", "test"]
