# Task Management REST API

This document provides the steps to set up and run a task management REST API using NestJS and PostgreSQL.

## Prerequisites

Ensure you have the following installed:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **Nest CLI**: Install using npm
  ```bash
  npm install -g @nestjs/cli
  ```
- **PostgreSQL**: [Download PostgreSQL](https://www.postgresql.org/download/)

## Local Environment Setup

1. **Set Up PostgreSQL**:
   - Start your PostgreSQL application.
   - Create a database named `task-management` in PostgreSQL.

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Application**:
   ```bash
   nest start:dev
   ```

## Docker Installation Steps

1. **Build Docker Image**:
   ```bash
   docker build -t nest-task-management-app .
   ```

2. **Create Docker Network**:
   ```bash
   docker network create nest-network
   ```

3. **Run PostgreSQL Container**:
   ```bash
   docker run -d --name postgres-nest-app -p 5432:5432 --network nest-network -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=task-management postgres
   ```

4. **Run NestJS Application Container**:
   ```bash
   docker run -d --name nest-task-management-app --network nest-network -p 3000:3000 nest-task-management-app
   ```

By following these steps, you will have a task management REST API running locally or within Docker containers. The API will be accessible on port 3000.