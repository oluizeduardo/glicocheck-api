<div align="center">
  <img src="./docs/glicocheck-logo.png">  
</div>

# Glicocheck API
[Glicocheck's](https://github.com/oluizeduardo/glicocheck) API for diabetes management.

## 🛠 Technologies applied
- Backend
    - NodeJS
    - [Express](https://expressjs.com/)
    - [Bcrypt](https://www.npmjs.com/package/bcrypt)
    - [Json Web Token](https://jwt.io/)
- Database
    - [SQLite](https://www.sqlite.org/index.html)
    - [KnexJS](https://knexjs.org/)
- Quality
    - Static analysis
        - [ESLint](https://eslint.org/)
- CICD
    - [GitHub Actions](https://docs.github.com/en/actions)
- Deploy
    - [Render](https://render.com/)

## 🚀 How to run locally
- Clone this project.
    - `git clone https://github.com/oluizeduardo/glicocheck-api.git`
- Access the root folder.
    - `cd glicocheck-api`
- Configure the environment variables.
    - `cp .env-example .env`
- Install all the dependencies.
    - `npm install`
- Run the server.
    - `npm run dev`

## 📡 API Endpoints
See the document of [endpoints](./docs/endpoints.md).

## 🔗 Code analysis
[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-black.svg)](https://sonarcloud.io/summary/new_code?id=oluizeduardo_glicocheck-api)
