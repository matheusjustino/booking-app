# build stage
FROM maven:3.8.1-openjdk-17-slim AS build

WORKDIR /app

COPY pom.xml .

RUN mvn dependency:go-offline

COPY src/ /app/src/

RUN mvn clean package -DskipTests

# prod stage
FROM openjdk:17-jdk-slim-buster

WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

ENV SPRING_PROFILES_ACTIVE="prod"

ENTRYPOINT ["java", "-Dspring.profiles.active=prod", "-jar", "app.jar"]