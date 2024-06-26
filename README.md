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
    - Test
        - [Mocha](https://mochajs.org/)
    - Static analysis
        - [ESLint](https://eslint.org/)
- CICD
    - [GitHub Actions](https://docs.github.com/en/actions)
- Deploy
    - [Render](https://render.com/)

## 🚀 How to run locally
- Clone this project.
    - `git clone https://github.com/oluizeduardo/glicocheck-api.git`
- Configure the [environment variables](#-environment-variables).
- Install all the dependencies.
    - `npm install`
- Run the server.
    - `npm run dev`

## ⚙ Environment Variables
A `.env` file is required on the root folder and must contain the following key and values:

| Key           | Value         |
| ------------- |:-------------|
| `BASE_URL`    | The basic context of the application. Should contain the protocol + host + port.<br>Ex: `http://localhost:3000` |
| `PORT`        | The port where the application is running.<br>Ex: `3000`      |
| `EMAIL_HOST`  | The SMTP host to send emails messages.<br>Ex: `smtp-mail.outlook.com`     |
| `EMAIL_PORT`  | Where SMTP server is running.<br>Ex: `587`     |
| `EMAIL_USER`  | Email username for authentication.      |
| `EMAIL_PASS`  | The email password for authentication. |
| `SECRET_KEY`  | Any secret key encrypted using BCrypt.<br>Suggested tool: https://bcrypt-generator.com/      |
| `EDAMAM_APP_ID`  | Edamam `app id` to consult the nutritional table. https://www.edamam.com/      |
| `EDAMAM_APP_KEY`  | Edamam `app key`.      |
| `DATABASE_ENV`  | The database environment.<br>Ex: `dev`, `prod`.      |

## 📡 API Endpoints
See the document of [endpoints](./docs/endpoints.md).

## 🔗 Code analysis
[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-black.svg)](https://sonarcloud.io/summary/new_code?id=oluizeduardo_glicocheck-api)
