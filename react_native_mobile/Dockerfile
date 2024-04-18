FROM node:18

WORKDIR /app

COPY yarn.lock /app

RUN yarn install
RUN yarn add expo@^48.0.0
RUN yarn add @react-native-async-storage/async-storage
RUN yarn add @apollo/client graphql
RUN yarn add @react-navigation/native


COPY . /app
EXPOSE 19000

CMD ["npm", "start"]
