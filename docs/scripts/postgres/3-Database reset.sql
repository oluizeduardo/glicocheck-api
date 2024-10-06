-- SQLite
-- GLICOCHECK API - Database reset.

---------- CLEAN DATABASE
DELETE FROM roles WHERE 1=1;
DELETE FROM genders WHERE 1=1;
DELETE FROM users WHERE 1=1;
DELETE FROM diabetes_types WHERE 1=1;
DELETE FROM blood_types WHERE 1=1;
DELETE FROM measurement_units WHERE 1=1;
DELETE FROM marker_meals WHERE 1=1;
DELETE FROM blood_sugar_diary WHERE 1=1;
DELETE FROM health_info WHERE 1=1;
DELETE FROM system_config_by_user WHERE 1=1;
DELETE FROM password_reset_tokens WHERE 1=1;
DELETE FROM jwt_token_reject_list WHERE 1=1;

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
DROP TABLE IF EXISTS jwt_token_reject_list;