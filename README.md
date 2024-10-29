<div align="center">
  <img src="./docs/glicocheck-logo.png">  
</div>

# Glicocheck API
API back-end for diabetes management.

Check out the front-end project available in [Glicocheck](https://github.com/oluizeduardo/glicocheck) repository.

## 🛠 Technologies applied
- Backend
    - NodeJS
    - [Express](https://expressjs.com/)
    - [Bcrypt](https://www.npmjs.com/package/bcrypt)
    - [Json Web Token](https://jwt.io/)
- Database
    - Postgres [Neon](https://neon.tech/home) (Production)
    - [SQLite](https://www.sqlite.org/index.html) (Development)
    - [KnexJS](https://knexjs.org/)
- Quality
    - Semantic code analysis
        - [ESLint](https://eslint.org/)
        - [Zod](https://zod.dev/)
        - [Github CodeQL](https://docs.github.com/en/code-security/code-scanning/introduction-to-code-scanning/about-code-scanning-with-codeql)
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
