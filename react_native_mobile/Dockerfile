FROM node:18

WORKDIR /app

COPY yarn.lock /app

RUN yarn install
RUN yarn add expo@^48.0.0
RUN yarn add @react-native-async-storage/async-storage@1.17.11
RUN yarn add expo-modules-core@~1.2.7
RUN yarn add react-native@0.71.14
RUN yarn add @apollo/client graphql
RUN yarn add @react-navigation/native


COPY . /app
EXPOSE 19000

CMD ["npm", "start"]
