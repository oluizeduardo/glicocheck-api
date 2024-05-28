# 📡 API Endpoints

## Ping
- **GET /ping** - System health check.

## Users
- **POST /users** - Register a new user.
- **GET /users/:id** - Search by a specific user.
- **PUT /users/:id** - Update an existing user.
- **DELETE /users/:id** - Delete an existing user.

## Genders
- **POST /genders** - Register a new gender.
- **GET /genders** - Get the list of genders.
- **GET /genders/:id** - Search by a specific gender.
- **PUT /genders/:id** - Update an existing gender.
- **DELETE /genders/:id** - Delete an existing gender.

## Diabetes Type
- **POST /diabetestype** - Register a new diabetes type.
- **GET /diabetestype** - Get the list of diabetes type.
- **GET /diabetestype/:id** - Search by a specific diabetes type.
- **PUT /diabetestype/:id** - Update an existing diabetes type.
- **DELETE /diabetestype/:id** - Delete an existing diabetes type.

## Blood Type
- **POST /bloodtype** - Register a new blood type.
- **GET /bloodtype** - Get the list of blood types.
- **GET /bloodtype/:id** - Search by a specific blood type.
- **PUT /bloodtype/:id** - Update an existing blood type.
- **DELETE /bloodtype/:id** - Delete an existing blood type.

## Marker Meal
- **POST /markermeal** - Register a new marker meal.
- **GET /markermeal** - Get the list of marker meals.
- **GET /markermeal/:id** - Search by a specific marker meal.
- **PUT /markermeal/:id** - Update an existing marker meal.
- **DELETE /markermeal/:id** - Delete an existing marker meal.

## Authentication
- **POST /login** - Used to log-in the system.
- **POST /validate-password** - Register a new marker meal.

## Carbs Counting
- **GET /carbscounting/:food** - Get the amount of carbohydrate of the food provided.

## Health Info
- **POST /healthinfo** - Register a new users's health info.
- **GET /healthinfo** - Get the list of users's health info.
- **GET /healthinfo/user/:userId** - Search by the health info of a specific user.
- **PUT /healthinfo/user/:userId** - Update the health info of a specific user.
- **DELETE /healthinfo/user/:userId** - Delete the health info of a specific user.

## System Configuration
- **POST /systemconfiguration** - Register system configuration for a specific user.
- **GET /systemconfiguration** - Get the list of marker meals.
- **GET /systemconfiguration/:id** - Search by a specific marker meal.
- **DELETE /systemconfiguration/:id** - Delete a specific system configuration.
- **GET /systemconfiguration/user/:userId** - GET the system configuration of an existing user.
- **PUT /systemconfiguration/user/:userId** - Update the system configuration of an existing user.
- **DELETE /systemconfiguration/user/:userId** - Delete the system configuration of an existing user.  

## Reset Password
- **GET /reset-password/forgot-password** 
- **GET /reset-password/cancel/:resetToken** 
- **GET /reset-password/:id** 
- **PUT /reset-password** 

## Diary
- **POST /diary** - Register a new blood sugar diary.
- **GET /diary** - Get the list of blood sugar diaries.
- **GET /diary/:id** - Search by a specific register in the blood sugar diary.
- **PUT /diary/:id** - Update an existing register in the blood sugar diary.
- **DELETE /diary/:id** - Delete an existing register in the blood sugar diary.
- **DELETE /diary/user/:userId** - Delete an existing register in the blood sugar diary by user id.
- **DELETE /diary/user/:userId** - Search by the list of registers in the blood sugar diary by user id.