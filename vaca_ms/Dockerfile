FROM maven:3.8.4-openjdk-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Usa la imagen de OpenJDK para ejecutar la aplicación
FROM openjdk:17-jdk-alpine
WORKDIR /app
COPY --from=build /app/target/vaca_ms-0.0.1-SNAPSHOT.jar java-app.jar
ENTRYPOINT ["java", "-jar", "java-app.jar"]


