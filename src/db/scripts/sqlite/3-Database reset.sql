-- SQLite
-- GLICOCHECK API - Database reset.

---------- CLEAN DATABASE
DELETE FROM roles;
DELETE FROM genders;
DELETE FROM users;
DELETE FROM diabetes_types;
DELETE FROM blood_types;
DELETE FROM measurement_units;
DELETE FROM marker_meals;
DELETE FROM blood_sugar_diary;
DELETE FROM health_info;
DELETE FROM system_config_by_user;
DELETE FROM password_reset_tokens;

---------- DROP TABLE
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS genders;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS diabetes_types;
DROP TABLE IF EXISTS blood_types;
DROP TABLE IF EXISTS measurement_units;
DROP TABLE IF EXISTS marker_meals;
DROP TABLE IF EXISTS blood_sugar_diary;
DROP TABLE IF EXISTS health_info;
DROP TABLE IF EXISTS system_config_by_user;
DROP TABLE IF EXISTS password_reset_tokens;