# Soccer API

A RESTFUL API built with https://hapi.dev/ framework without using any database

### Prerequisites

- Node.js `14.7.0` or greater (download here https://nodejs.org/en/)
- npm `6.14.7` or greater 
- git, any version (download here https://git-scm.com/downloads)
- postman, any version (download here https://www.postman.com/downloads/)

### Steps

1. open git bash
2. clone the project by running this command (`git clone https://github.com/vedoalfarizi/soccer-api.git`)
3. open the project on your editor
4. rename `.env.example` to `.env`, then complete the configuration
5. open terminal (in this example is PowerShell)
6. position it in the project directory with this command `cd D:/node/soccer-api`
7. `npm install` to install all project dependencies
8. `npm start` to run the project and wait a while (until you see `server start at...`)
9. open postman
10. import postman collection `Soccer API.postman_collection.json` and environment `Soccer API.postman_environment.json`
11. make sure you use Soccer API for postman environment
12. open Soccer API collection and send request
13. If you want to check unit test and code coverage, run `npm run test:watch` in terminal
