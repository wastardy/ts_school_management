# NestJS GraphQL Pet Project

## Overview

This project is a practice implementation of **GraphQL** with **NestJS** and **TypeScript**. It provides an API for managing lessons and students, using **MongoDB** as a database running as a **Docker** container for additional practice

## Features

- **GraphQL API** for creating and querying lessons and students.
- **NestJS framework** for structured and scalable backend development.
- **TypeScript** for type safety and improved development experience.
- **MongoDB** for practice no-relational database
- **TypeORM integration** for interacting with MongoDB.
- **Docker support** for easy database setup.

## Technologies Used

- **TypeScript**
- **NestJS**
- **GraphQL (Apollo Server Express)**
- **MongoDB** (via Docker)
- **TypeORM**
- **ESLint & Prettier** for code quality

## Installation & Setup

### Prerequisites

Make sure you have the following installed:

- **Node.js** (>=16)
- **Docker** & **Docker Compose**

### 1. Clone the repository

```sh
git clone https://github.com/your-repo-url.git
cd ts_graphql
```

### 2. Install dependencies

```sh
npm install
```

### 3. Start MongoDB with Docker

```sh
docker run -d --name mongodb-test \
-e MONGO_INITDB_ROOT_USERNAME=mongoadmin \
-e MONGO_INITDB_ROOT_PASSWORD=mongoadmin \
-p 27017:27017 -v mongodb-test:/data/db \
mongo:7.0
```

### 4. Run the development server

```sh
npm run start:dev
```

The server will start on `http://localhost:3000`.

## GraphQL API Usage

> You can interact with the API using the GraphQL Playground at:

```
http://localhost:3000/graphql
```

### Example Queries & Mutations

#### Create a Lesson

```graphql
mutation {
  createLesson(
    createLessonInput: {
      name: "GraphQL Basics"
      startDate: "2025-04-01T10:00:00Z"
      endDate: "2025-04-01T11:30:00Z"
      students: []
    }
  ) {
    id
    name
  }
}
```

#### Create(add) a Student

```graphql
mutation {
  createStudent(
    createStudentInput: {
      firstName: "Andrew"
      lastName: "Wastardy"
      group: "CS 31/2"
    }
  ) {
    id
    firstName
    lastName
    group
  }
}
```

#### Get All Lessons

```graphql
query {
  getAllLessons {
    id
    name
    students {
      firstName
      lastName
    }
  }
}
```

#### Assign Students to Lesson

```graphql
mutation {
  assignStudentsToLesson(
    assignStudentsToLessonInput: {
      lessonId: "6fca0ec7-f7eb-47db-ab05-c99f798ae5f8"
      studentIds: [
        "dcabc16a-81c6-4437-8f83-f45addb93c4a"
        "0e619d48-5881-49e0-9638-356dd0ae98d7"
        "585c6b23-2f48-46c8-b2e9-5fcb5b3529b8"
      ]
    }
  ) {
    name
    students
  }
}
```
