FROM amazoncorretto:17

COPY target/*.jar app.jar

EXPOSE 9091

ENTRYPOINT ["java","-jar","/app.jar"]