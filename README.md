# yam-yum-backend

backend server for yam-yum system

## Table of Contents

- [yam-yum-backend](#yam-yum-backend)
  - [Table of Contents](#table-of-contents)
  - [Dependencies](#dependencies)
  - [Dev Dependencies](#dev-dependencies)
  - [Installation \& Run locally](#installation--run-locally)
    - [prerequisites](#prerequisites)
  - [Run tests](#run-tests)
  - [Documentation](#documentation)

## Dependencies

- @aws-sdk/client-s3
- @aws-sdk/s3-request-presigner
- @nestjs/common
- @nestjs/config
- @nestjs/core
- @nestjs/jwt
- @nestjs/passport
- @nestjs/platform-express
- @nestjs/swagger
- @nestjs/typeorm
- @types/multer
- aws-sdk
- bcrypt
- class-transformer
- class-validator
- crypto
- mysql2
- passport
- passport-jwt
- reflect-metadata
- rxjs
- typeorm
- uuid

## Dev Dependencies

- @nestjs/cli
- @nestjs/schematics
- @nestjs/testing
- @swc/cli
- @swc/core
- @types/bcrypt
- @types/express
- @types/jest
- @types/node
- @types/passport-jwt
- @types/supertest
- @types/uuid
- eslint
- eslint-config-prettier
- eslint-plugin-prettier
- jest
- prettier
- source-map-support
- supertest
- ts-jest
- ts-loader
- ts-node
- tsconfig-paths
- tsx
- typescript

## Installation & Run locally

### prerequisites

- Node.js 20.0.0 or higher
- NPM 8.0.0 or higher
- You can Download the latest version of Node from [here](https://nodejs.org/en/download/)

1- Clone the repository

```bash
git clone https://github.com/hassan-mohamed/yam-yum-backend.git
cd yam-yum-backend
```

2- Create `.env` file

- Rename .env.example to .env
- Add your database credentials
- Add your aws credentials
- Add your jwt secret

3- Install dependencies

```bash
npm install
```

4- Run Build

```bash
npm run build
```

5- Start the server

```bash
npm run start:prod
```

6- Open swagger UI in your browser

- <http://localhost:3000/swagger>

## Run tests

```bash
npm run test
```

## Documentation
