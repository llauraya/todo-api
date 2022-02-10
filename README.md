# To Do List API

Simple TODO API using NodeJS, MySQL, Express and Docker.

## Run Locally

Clone the project

```bash
  git clone https://github.com/llauraya/todo-api.git
```

Go to the project directory

```bash
  cd todo-api
```

Setup environment variables

```bash
  mv .env.example .env
  mv src/.env.example src/.env
```

Run docker (you need to install docker-compose on your machine)

```bash
  docker-compose up
```

Stop

```bash
  docker-compose down --rmi all
```

## Docker Environment Variables

Set the values of the following variables on the docker .env file

`MYSQLDB_USER`
`MYSQLDB_ROOT_PASSWORD`
`MYSQLDB_DATABASE`
`MYSQLDB_LOCAL_PORT`
`MYSQLDB_DOCKER_PORT`
`NODE_LOCAL_PORT`
`NODE_DOCKER_PORT`

## App Environment Variables

Set the values of the following variables on the app src/.env file

`DB_HOST`
`DB_USER`
`DB_PASSWORD`
`DB_NAME`
`DB_PORT`
`NODE_DOCKER_PORT`
`AUTH_KEY`

## API Reference Examples

#### Register

```http
  POST: /api/registration
  BODY: {
    "username": "bane",
    "firstName": "Bane",
    "lastName": "Hallow",
    "password": "123456",
    "email": "ouch@yopmail.com"
  }
  RESPONSE:
  statusCode: 201
  body: {
    "message": "Success",
    "user": {
        "id": 4,
        "username": "bane",
        "email": "ouch@yopmail.com",
        "first_name": "Bane",
        "last_name": "Hallow"
    }
  }
```

#### Login

```http
  POST: /api/login
  BODY: {
    "username": "bane",
    "password": "123456"
  }
  RESPONSE:
  statusCode: 200
  body: {
    "message": "Success",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZmlyc3ROYW1lIjoiQmFuZSIsImxhc3ROYW1lIjoiSGFsbG93IiwiZW1haWwiOiJvdWNoQHlvcG1haWwuY29tIiwiaWF0IjoxNjQ0NDY4MTYxLCJleHAiOjE2NDQ0NzE3NjF9.lclt1bqOtjEJaaj4Y_88g3GBqhUMi1q7MfTjRPrF3G0"
  }
```

#### List of tasks

```http
  GET: /api/tasks
  HEADER: Authorization {{token}}
  RESPONSE:
  statusCode: 200
  body: {
    "data": [
        {
            "id": 4,
            "name": "Task 2",
            "description": "This is the second task",
            "order": 4
        },
        {
            "id": 5,
            "name": "Task 2",
            "description": "This is the second task",
            "order": 5
        }
    ],
    "total": 2
  }
```

#### Create a task

```http
  POST: /api/tasks
  HEADER: Authorization {{token}}
  BODY: {
    "name": "Task 2",
    "description": "This is the second task"
  }
  RESPONSE:
  statusCode: 201
  body: {
    "data": {
        "id": 4,
        "name": "Task 2",
        "description": "This is the second task",
        "created_by": 3,
        "order": 1
    }
  }
```

#### Edit a task

```http
  PUT: /api/tasks/{{id}}
  HEADER: Authorization {{token}}
  BODY: {
    "name": "Task 2",
    "description": "This is the second task"
  }
  RESPONSE:
  statusCode: 200
  body: {
    "message": "Success",
    "data": {
        "id": 4,
        "name": "Task Updated 4",
        "description": "This is nost the second task",
        "order": 4,
        "updated_by": 1,
        "updated_at": {
            "fn": "NOW",
            "args": []
        }
    }
  }
```

#### Delete a task

```http
  DELETE: /api/tasks/{{id}}
  HEADER: Authorization {{token}}
  RESPONSE:
  statusCode: 200
  body: {
    "message": "Success"
  }
```

#### Reorder tasks (swap order)

```http
  POST: /api/tasks/reorder
  HEADER: Authorization {{token}}
  BODY: {
    "taskId1": 4,
    "taskId2": 5
  }
  RESPONSE:
  statusCode: 200
  body: {
    "message": "Success"
  }
```
