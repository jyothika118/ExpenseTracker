# Stage 1 — Build Spring Boot JAR
FROM eclipse-temurin:21-jdk AS builder

WORKDIR /app

# Copy Maven wrapper & project files
COPY mvnw ./
COPY .mvn .mvn
COPY pom.xml ./
RUN chmod +x mvnw

# Download dependencies
RUN ./mvnw -B dependency:go-offline

# Copy source
COPY src ./src

# Build JAR
RUN ./mvnw -B clean package -DskipTests

# Stage 2 — Run Spring Boot app
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copy compiled jar from builder stage
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
