-- PostgreSQL
-- GLICOCHECK API - Database creation.

-- Sequences
CREATE SEQUENCE roles_id_seq;
CREATE SEQUENCE genders_id_seq;
CREATE SEQUENCE users_id_seq;
CREATE SEQUENCE diabetes_types_id_seq;
CREATE SEQUENCE blood_types_id_seq;
CREATE SEQUENCE measurement_units_id_seq;
CREATE SEQUENCE marker_meals_id_seq;
CREATE SEQUENCE blood_sugar_diary_id_seq;
CREATE SEQUENCE health_info_id_seq;
CREATE SEQUENCE system_config_by_user_id_seq;
CREATE SEQUENCE password_reset_tokens_id_seq;
CREATE SEQUENCE jwt_token_reject_list_id_seq;

-- ROLES
CREATE TABLE roles (
    id          INTEGER PRIMARY KEY DEFAULT NEXTVAL('roles_id_seq'),
    description varchar(50) NOT NULL UNIQUE,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- GENDER
CREATE TABLE genders (
  id          INTEGER PRIMARY KEY DEFAULT NEXTVAL('genders_id_seq'),
  description VARCHAR(30) NOT NULL UNIQUE,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- USERS
CREATE TABLE users (
    id         INTEGER PRIMARY KEY DEFAULT NEXTVAL('users_id_seq'),
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
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    picture    TEXT,

    FOREIGN KEY(id_role) REFERENCES roles(id),
    FOREIGN KEY(id_gender) REFERENCES genders(id)
);

-- DIABETES TYPES
CREATE TABLE diabetes_types (
  id          INTEGER PRIMARY KEY DEFAULT NEXTVAL('diabetes_types_id_seq'),
  description VARCHAR(100) NOT NULL UNIQUE,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- BLOOD TYPES
CREATE TABLE blood_types (
  id          INTEGER PRIMARY KEY DEFAULT NEXTVAL('blood_types_id_seq'),
  description VARCHAR(5) NOT NULL UNIQUE,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- MEASUREMENT UNITS
CREATE TABLE measurement_units ( 
    id          INTEGER PRIMARY KEY DEFAULT NEXTVAL('measurement_units_id_seq'),
    description varchar(15) NOT NULL UNIQUE,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- MARKER MEALS
CREATE TABLE marker_meals ( 
    id          INTEGER PRIMARY KEY DEFAULT NEXTVAL('marker_meals_id_seq'),
    description varchar(50) NOT NULL UNIQUE,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- BLOOD SUGAR DIARY
CREATE TABLE blood_sugar_diary ( 
  id                    INTEGER PRIMARY KEY DEFAULT NEXTVAL('blood_sugar_diary_id_seq'),
  id_user               INTEGER NOT NULL,
  glucose               INTEGER NOT NULL,
  total_carbs           INTEGER,
  dateTime              varchar(20) NOT NULL,
  id_markermeal         INTEGER NOT NULL,
  id_measurement_unity  INTEGER NOT NULL,
  created_at            TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at            TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY(id_user) REFERENCES users(id),
  FOREIGN KEY(id_markermeal) REFERENCES marker_meals(id),
  FOREIGN KEY(id_measurement_unity) REFERENCES measurement_units(id)
);

-- HEALTH INFO
CREATE TABLE health_info (
  id               INTEGER PRIMARY KEY DEFAULT NEXTVAL('health_info_id_seq'),
  id_user          INTEGER NOT NULL UNIQUE,
  id_diabetes_type INTEGER NOT NULL,
  id_blood_type    INTEGER NOT NULL,  
  month_diagnosis  varchar(10),
  created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (id_user) REFERENCES users(id),
  FOREIGN KEY (id_diabetes_type) REFERENCES diabetes_types(id),
  FOREIGN KEY (id_blood_type) REFERENCES blood_types(id)
);

-- USER'S SYSTEM CONFIGURATION
CREATE TABLE system_config_by_user (
  id                    INTEGER PRIMARY KEY DEFAULT NEXTVAL('system_config_by_user_id_seq'),
  id_user               INTEGER NOT NULL UNIQUE,
  id_measurement_unity  INTEGER NOT NULL,
  limit_hypo            INTEGER,
  limit_hyper           INTEGER,
  time_bf_pre           varchar(5),
  time_bf_pos           varchar(5),
  time_lunch_pre        varchar(5),
  time_lunch_pos        varchar(5),
  time_dinner_pre       varchar(5),
  time_dinner_pos       varchar(5),
  time_sleep            varchar(5),
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (id_user) REFERENCES users(id),
  FOREIGN KEY (id_measurement_unity) REFERENCES measurement_units(id)
);

-- PASSWORD RESET TOKENS
CREATE TABLE password_reset_tokens (
  id          INTEGER PRIMARY KEY DEFAULT NEXTVAL('password_reset_tokens_id_seq'),
  token       varchar(50) NOT NULL UNIQUE,
  email_owner varchar(50) NOT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ACCESS TOKEN JWT REJECT LIST
CREATE TABLE jwt_token_reject_list (
  id          INTEGER PRIMARY KEY DEFAULT NEXTVAL('jwt_token_reject_list_id_seq'),
  token_id    varchar(50) NOT NULL UNIQUE,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
