-- SQLite
-- GLICOCHECK API - Database loaders.

-- ROLES
INSERT INTO roles (description) VALUES('ADMIN');
INSERT INTO roles (description) VALUES('REGULAR');

-- GENDERS
INSERT INTO genders (description) VALUES('Male');
INSERT INTO genders (description) VALUES('Female');
INSERT INTO genders (description) VALUES('Unspecified');

-- DIABETES TYPES
INSERT INTO diabetes_types (description) VALUES('Diabetes Mellitus Type 1');
INSERT INTO diabetes_types (description) VALUES('Diabetes Mellitus Type 2');
INSERT INTO diabetes_types (description) VALUES('Diabetes Gestational');

-- BLOOD TYPES
INSERT INTO blood_types (description) VALUES('A+');
INSERT INTO blood_types (description) VALUES('A-');
INSERT INTO blood_types (description) VALUES('B+');
INSERT INTO blood_types (description) VALUES('B-');
INSERT INTO blood_types (description) VALUES('AB+');
INSERT INTO blood_types (description) VALUES('AB-');
INSERT INTO blood_types (description) VALUES('O+');
INSERT INTO blood_types (description) VALUES('O-');

-- MEASUREMENTS UNITS
INSERT INTO measurement_units (description) VALUES('mg/dL');
INSERT INTO measurement_units (description) VALUES('mmol/L');

-- MARKER MEAL 
INSERT INTO marker_meals (description) VALUES('Fasting');
INSERT INTO marker_meals (description) VALUES('Before breakfast');
INSERT INTO marker_meals (description) VALUES('After breakfast');
INSERT INTO marker_meals (description) VALUES('Before lunch');
INSERT INTO marker_meals (description) VALUES('After lunch');
INSERT INTO marker_meals (description) VALUES('Before dinner');
INSERT INTO marker_meals (description) VALUES('After dinner');
INSERT INTO marker_meals (description) VALUES('Before sleeping');

-- USER ADMIN
INSERT INTO users (cod_user, name, email, password, id_role) 
VALUES('00000000-0000-0000-0000-000000000000', 'User Admin', 'admin@glicocheck.com', 
'$2a$12$OHjxTub/6SuOg9OiSM58i.WNWwJBlLeMSEfS/KT4Rre4qiIHH49fS', 1);