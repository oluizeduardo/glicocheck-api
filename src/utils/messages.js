/**
 * Messages used by the system.
 */
export default class Messages {
  // Generic messages
  static PONG = 'Pong';
  static ERROR = 'An error occurred.';
  static INCOMPLETE_DATA_PROVIDED = 'Incomplete data provided.';
  static NOTHING_FOUND = 'Nothing found';
  static REFUSED_ACCESS = 'Refused access';
  static EXECUTION_NOT_ALLOWED = 'You\'re not allowed to execute this function.';
  static REGISTER_DELETED = 'The register has been deleted';
  static WRONG_CREDENTIALS = 'Wrong credentials';
  static ERROR_CHECKING_CREDENTIALS = 'Error checking credentials.';

  // Access Token
  static TOKEN_REQUIRED = 'Access token required';
  static TOKEN_EXPIRED = 'Token expired';

  // User
  static NEW_USER_CREATED = 'New user created.';
  static USER_DELETED = 'User deleted.';
  static USER_NOT_FOUND = 'User not found';
  static ERROR_DELETE_USER = 'Error trying to delete user.';
  static ERROR_CREATE_USER = 'Error trying to insert a new user.';
  static ERROR_UPDATING_USER = 'Error updating user.';
  static ERROR_CHECKING_USER_ROLE = 'Error checking user role.';
  static EMAIL_ALREADY_USED = 'The email address is already used.';

  // Blood sugar diary
  static NEW_DIARY_DATA_ADDED = 'New blood sugar diary register added.';
  static DIARY_DATA_DELETED = 'Blood sugar diary register deleted.';
  static ERROR_UPDATING_DIARY = 'Error updating blood sugar diary.';
  static ERROR_DELETING_DIARY = 'Error deleting diary register.';

  // Gender
  static NEW_GENDER_CREATED = 'New gender created.';
  static GENDER_DELETED = 'Gender deleted.';

  // Diabetes type
  static NEW_DIABETES_TYPE_CREATED = 'New diabetes type created.';
  static DIABETES_TYPE_DELETED = 'Diabetes type deleted.';
  static ERROR_DELETE_DIABETES_TYPE = 'Error trying to delete diabetes type.';
  static ERROR_CREATE_DIABETES_TYPE = 'Error inserting a new diabetes type.';
  static ERROR_UPDATING_DIABETES_TYPE = 'Error updating diabetes type.';

  // Blood Type
  static NEW_BLOOD_TYPE_CREATED = 'New blood type created.'; 
  static BLOOD_TYPE_DELETED = 'Blood type deleted.';
  
  // Reset password
  static ERROR_SEND_RESET_PASSWORD_MESSAGE = 'Error sending reset password message.';
  static ERROR_SAVING_RESET_TOKEN = 'Error saving password reset token.';
  static ERROR_UPDATING_PASSWORD = 'Error updating user\'s password.';
  static PASSWORD_UPDATED = 'Password updated.';
  static RESET_PASSWORD_MESSAGE_SENT = 'Reset password message sent.';

  // Password reset token
  static RESET_TOKEN_CREATED = 'New password reset token created.';
  static RESET_TOKEN_DELETED = 'Password reset token deleted.';
  static RESET_TOKEN_EXPIRED = 'Password reset token expired.';
  static RESET_TOKEN_NOT_FOUND = 'Password reset token not found.';
  static ERROR_DELETE_RESET_TOKEN = 'Error deleting password reset token.';
  static UNINFORMED_PASSWORD_RESET_TOKEN = 'Uninformed password reset token.';

  // System's Configuration
  static NEW_CONFIGURATION_CREATED = 'New system configuration created.';
  static SYSTEM_CONFIGURATION_DELETED = 'System configuration deleted.';
  static SYSTEM_CONFIGURATION_EXISTING = 'There is already a system configuration for this user.';
  static SAVED_DEFAULT_SYSTEM_CONFIGURATION = 'Saved default system configuration.';

  // Marker meal
  static MARKER_MEAL_DELETED = 'Marker meal deleted.';
  static MARKER_MEAL_CREATED = 'New marker meal created.';

  // Health Info
  static HEALTH_INFO_CREATED = 'New health info created.';
  static HEALTH_INFO_EXISTING = 'There is already health information registered for this user.';
  static HEALTH_INFO_DELETED = 'User\'s health info deleted.';
}
