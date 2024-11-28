# Networth Tracker API

## Description

Networth Tracker API is a robust and secure MERN stack application built with Hapi.js and MongoDB. It provides a comprehensive solution for tracking personal net worth and managing financial data with a focus on security and scalability.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- User authentication and authorization
- Secure storage of Personally Identifiable Information (PII)
- RESTful API endpoints for managing financial data
- MongoDB integration for efficient data persistence
- Rate limiting for API protection
- JWT-based authentication for secure access
- Input validation using Joi
- TypeScript support for improved developer experience and code quality
- Automated testing with Jest

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- MongoDB (v4.4 or later)
- npm or yarn package manager

## Installation

1. Clone the repository:

git clone [https://github.com/pr4th4meshh/nwtracker_api.git](https://github.com/pr4th4meshh/nwtracker_api.git)
cd nwtracker_api


2. Install dependencies:
npm install


## Configuration

1. Create a `.env` file in the root directory with the following variables:

```
PORT=3000
MONGODB_URI=YOUR_MONGODB_URI
JWT_SECRET=your_jwt_secret_key
ENCRYPTION_KEY=your_32_character_encryption_key
NODE_ENV=development
```


2. Adjust the values according to your environment and security requirements.

## Usage

### Development Mode

To run the application in development mode with hot-reloading:

npm run dev


### Production Mode

To build and run the application in production mode:

npm run build
npm run start


## API Documentation

### Authentication Endpoints

#### Register a new user
- **POST** `/users`
  - Request body:
    ```json
    {
      "username": "string",
      "email": "string",
      "password": "string",
      "fullName": "string",
      "dateOfBirth": "YYYY-MM-DD",
      "ssn": "XXX-XX-XXXX"
    }

- Response: 201 Created with user ID

#### Get user by ID
- **GET** `/users/:id`
  - Response: 200 OK with user details

### Financial Data Endpoints

(To be implemented in future versions)


### Testing
Run the test suite using the following command:

```npm run test```

nwtracker_api/
├── github/
    workflow/
        ├── ci.yml
        └── cd.yml
├── dist/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── plugins/
│   ├── routes/
│   ├── utils/
│   └── server.ts
├── tests/
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
├── Dockerfile
└── README.md


[Hapi.js](https://hapi.dev/) - Web framework for Node.js
[MongoDB](https://www.mongodb.com/) - NoSQL database
[Mongoose](https://mongoosejs.com/) - MongoDB object modeling for Node.js
[TypeScript](https://www.typescriptlang.org/) - Typed superset of JavaScript
[Jest](https://jestjs.io/) - JavaScript testing framework
[Joi](https://joi.dev/) - Schema description language and data validator for JavaScript

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## Contact

Prathamesh - [@pr4th4meshh](https://github.com/pr4th4meshh)

Project Link: [https://github.com/pr4th4meshh/nwtracker_api](https://github.com/pr4th4meshh/nwtracker_api)

### End