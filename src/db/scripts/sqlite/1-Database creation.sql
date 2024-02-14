-- SQLite
-- GLICOCHECK API - Database creation.

-- ROLES
CREATE TABLE roles (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    description varchar(50) NOT NULL UNIQUE,
    created_at  TIMESTAMP DEFAULT (datetime('now','localtime')),
    updated_at  TIMESTAMP DEFAULT (datetime('now','localtime'))
);

-- GENDER
CREATE TABLE genders (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  description VARCHAR(30) NOT NULL UNIQUE,
  created_at  TIMESTAMP DEFAULT (datetime('now','localtime')),
  updated_at  TIMESTAMP DEFAULT (datetime('now','localtime'))
);

-- USERS
CREATE TABLE users (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    cod_user   varchar(50)  NOT NULL,
    name       varchar(200) NOT NULL, 
    email      varchar(100) NOT NULL UNIQUE,
    password   varchar(200) NOT NULL,     
    birthdate  varchar(10),
    phone      varchar(30),
    id_gender  INTEGER,
    weight     FLOAT,
    height     FLOAT,
    id_role    INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT (datetime('now','localtime')),
    updated_at TIMESTAMP DEFAULT (datetime('now','localtime')),
    picture    TEXT,

    FOREIGN KEY(id_role) REFERENCES roles(id),
    FOREIGN KEY(id_gender) REFERENCES genders(id)
);

-- DIABETES TYPES
CREATE TABLE diabetes_types (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  description VARCHAR(100) NOT NULL UNIQUE,
  created_at  TIMESTAMP DEFAULT (datetime('now','localtime')),
  updated_at  TIMESTAMP DEFAULT (datetime('now','localtime'))
);

-- BLOOD TYPES
CREATE TABLE blood_types (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  description VARCHAR(5) NOT NULL UNIQUE,
  created_at  TIMESTAMP DEFAULT (datetime('now','localtime')),
  updated_at  TIMESTAMP DEFAULT (datetime('now','localtime'))
);

-- MEASUREMENT UNITS
CREATE TABLE measurement_units ( 
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    description varchar(15) NOT NULL UNIQUE,
    created_at  TIMESTAMP DEFAULT (datetime('now','localtime')),
    updated_at  TIMESTAMP DEFAULT (datetime('now','localtime'))
);

-- MARKER MEALS
CREATE TABLE marker_meals ( 
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    description varchar(50) NOT NULL UNIQUE,
    created_at  TIMESTAMP DEFAULT (datetime('now','localtime')),
    updated_at  TIMESTAMP DEFAULT (datetime('now','localtime'))
);

--- BLOOD SUGAR DIARY
CREATE TABLE blood_sugar_diary ( 
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
	id_user          INTEGER NOT NULL,
	glucose          INTEGER NOT NULL,
  total_carbs      INTEGER,
	dateTime         varchar(20) NOT NULL,
	id_markermeal    INTEGER NOT NULL,
  created_at       TIMESTAMP DEFAULT (datetime('now','localtime')),
  updated_at       TIMESTAMP DEFAULT (datetime('now','localtime')),

  FOREIGN KEY(id_user) REFERENCES users(id),
  FOREIGN KEY(id_markermeal) REFERENCES marker_meals(id)
);

-- HEALTH INFO
CREATE TABLE health_info (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  id_user          INTEGER NOT NULL UNIQUE,
  id_diabetes_type INTEGER NOT NULL,
  id_blood_type    INTEGER NOT NULL,  
  month_diagnosis  varchar(10),
  created_at       TIMESTAMP DEFAULT (datetime('now','localtime')),
  updated_at       TIMESTAMP DEFAULT (datetime('now','localtime')),

  FOREIGN KEY (id_user) REFERENCES users(id),
  FOREIGN KEY (id_diabetes_type) REFERENCES diabetes_types(id),
  FOREIGN KEY (id_blood_type) REFERENCES blood_types(id)
);

-- USER'S SYSTEM CONFIGURATION
CREATE TABLE system_config_by_user (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  id_user          INTEGER NOT NULL UNIQUE,
  id_glucose_unity INTEGER NOT NULL,
  limit_hypo       INTEGER,
  limit_hyper      INTEGER,
  time_bf_pre      varchar(5),
  time_bf_pos      varchar(5),
  time_lunch_pre   varchar(5),
  time_lunch_pos   varchar(5),
  time_dinner_pre  varchar(5),
  time_dinner_pos  varchar(5),
  time_sleep       varchar(5),
  created_at  TIMESTAMP DEFAULT (datetime('now','localtime')),
  updated_at  TIMESTAMP DEFAULT (datetime('now','localtime')),

  FOREIGN KEY (id_user) REFERENCES users(id),
  FOREIGN KEY (id_glucose_unity) REFERENCES measurement_units(id)
);

-- PASSWORD RESET TOKENS
CREATE TABLE password_reset_tokens (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  token       varchar(50) NOT NULL UNIQUE,
	email_owner varchar(50) NOT NULL,
  created_at  TIMESTAMP DEFAULT (datetime('now','localtime'))
);