FROM openjdk:21-jdk
WORKDIR /app
COPY target/appointment-service-0.0.1-SNAPSHOT.jar ./application.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "application.jar"]