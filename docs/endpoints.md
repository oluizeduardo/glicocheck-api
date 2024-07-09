# 📡 API Endpoints

## Ping
- **GET /ping** - System health check.

## Authentication
- **POST /authentication/login** - Authenticate user and get access token.
- **POST /authentication/logout** - Do the logout.
- **POST /authentication/validate-password** - Validates a user's password.

## Users
- **POST /users** - Register a new user.
- 🔒 **GET /users** - Get the list of users.
- 🔒 **GET /users/:usercode** - Search by a specific user.
- 🔒 **PUT /users/:usercode** - Update an existing user.
- 🔒 **DELETE /users/:usercode** - Delete an existing user.

## Genders
- 🔒 **POST /genders** - Register a new gender.
- 🔒 **GET /genders** - Get the list of genders.
- 🔒 **GET /genders/:id** - Search by a specific gender.
- 🔒 **PUT /genders/:id** - Update an existing gender.
- 🔒 **DELETE /genders/:id** - Delete an existing gender.

## Diabetes Type
- 🔒 **POST /diabetestype** - Register a new diabetes type.
- 🔒 **GET /diabetestype** - Get the list of diabetes type.
- 🔒 **GET /diabetestype/:id** - Search by a specific diabetes type.
- 🔒 **PUT /diabetestype/:id** - Update an existing diabetes type.
- 🔒 **DELETE /diabetestype/:id** - Delete an existing diabetes type.

## Blood Type
- 🔒 **POST /bloodtype** - Register a new blood type.
- 🔒 **GET /bloodtype** - Get the list of blood types.
- 🔒 **GET /bloodtype/:id** - Search by a specific blood type.
- 🔒 **PUT /bloodtype/:id** - Update an existing blood type.
- 🔒 **DELETE /bloodtype/:id** - Delete an existing blood type.

## Marker Meal
- 🔒 **POST /markermeal** - Register a new marker meal.
- 🔒 **GET /markermeal** - Get the list of marker meals.
- 🔒 **GET /markermeal/:id** - Search by a specific marker meal.
- 🔒 **PUT /markermeal/:id** - Update an existing marker meal.
- 🔒 **DELETE /markermeal/:id** - Delete an existing marker meal.

## Carbs Counting
- 🔒 **GET /carbscounting/:food** - Get the amount of carbohydrate of the food provided.

## Health Info
- 🔒 **POST /healthinfo** - Register a new users's health info.
- 🔒 **GET /healthinfo** - Get the list of users's health info.
- 🔒 **GET /healthinfo/user/:usercode** - Search by the health info of a specific user.
- 🔒 **PUT /healthinfo/user/:usercode** - Update the health info of a specific user.
- 🔒 **DELETE /healthinfo/user/:usercode** - Delete the health info of a specific user.

## System Configuration
- 🔒 **GET /systemconfiguration** - Get the list of system configuration.
- 🔒 **POST /systemconfiguration** - Register system configuration for a specific user.
- 🔒 **GET /systemconfiguration/:id** - Search for a specific system configuration register.
- 🔒 **DELETE /systemconfiguration/:id** - Delete a specific system configuration.
- 🔒 **GET /systemconfiguration/user/:usercode** - Get the system configuration of an existing user.
- 🔒 **PUT /systemconfiguration/user/:usercode** - Update the system configuration of an existing user.
- 🔒 **DELETE /systemconfiguration/user/:usercode** - Delete the system configuration of an existing user.

## Diary
- 🔒 **POST /diary/user/:usercode** - Register a new glycemia diary by user code.
- 🔒 **GET /diary/user/:usercode** - Get the list of glycemia registers by user code.
- 🔒 **PUT /diary/user/:usercode/:id** - Update an existing register in the glycemia diary by user code.
- 🔒 **DELETE /diary/user/:usercode/:id** - Delete an existing register in the glycemia diary by user code.
- 🔒 **DELETE /diary/user/:usercode** - Delete all registers by user code in the glycemia diary.
- 🔒 **GET /diary/user/:usercode/stats** - Returns statistical information about a user's glycemia readings.

## Reset Password
- 🔒 **POST /reset-password/forgot-password** - Send a message to the email provided about the password update.
- 🔒 **GET /reset-password/:resetToken** - Get the reset password page.
- 🔒 **PUT /reset-password** - Update the user's password.
- 🔒 **GET /reset-password/cancel/:resetToken** - Cancels the password change request.