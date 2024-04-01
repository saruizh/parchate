#FROM maven:3.9.6 AS builder
#WORKDIR /usr/src/app
#COPY ./pom.xml ./src/ ./ 
#RUN mvn clean package -DskipTests

FROM openjdk:17-jdk-alpine
#WORKDIR /usr/src/app
#COPY --from=builder /usr/src/app/target/vaca_ms-0.0.1-SNAPSHOT.jar java-app.jar
COPY target/vaca_ms-0.0.1-SNAPSHOT.jar java-app.jar
ENTRYPOINT ["java", "-jar", "java-app.jar"]
