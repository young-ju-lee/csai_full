# Build stage
#FROM ktquarantine.azurecr.io/node-alpine-20 AS build
FROM tomcat:9.0-jdk17


# Production stage
#FROM ktquarantine.azurecr.io/node-alpine-20

# Set environment variables
ENV TZ=Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# .war 파일을 Tomcat의 웹앱 디렉토리에 복사
COPY target/csai_api-0.0.1-SNAPSHOT.war /usr/local/tomcat/webapps/csai_api.war

# Expose port
EXPOSE 3000

# Start the application
CMD ["catalina.sh", "run"]