FROM node:18

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . /app
EXPOSE 19000

CMD ["yarn", "start"]
