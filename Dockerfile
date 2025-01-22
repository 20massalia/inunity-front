FROM node:23.5-alpine

ARG NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL

WORKDIR /app

RUN yarn set version berry
RUN yarn -v

COPY .yarn .yarn
COPY .yarnrc.yml .yarnrc.yml
COPY package.json .
COPY yarn.lock .

COPY packages ./packages

RUN rm -rf packages/inunity-native

RUN yarn install

RUN yarn nextapp build

EXPOSE 3000

CMD ["yarn", "nextapp", "start"]
