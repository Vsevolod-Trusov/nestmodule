export const enum RESPONSE_ERROR_MESSAGES {
  WRONG_NAME_ERROR = 'Wrong input name',
  ID_NOT_EQUALS = "Id got via params is not equals with body's id",
  BAD_DATABASE_CONNECTION = 'Database connection is lost',
  SUCH_USER_EXISTS = 'User already exists',
  USER_NOT_EXIST = 'User does not exist',
  WRONG_PASSWORD = 'Password is incorrect',
  REQUEST_DENIED = 'Access Denied',
  NO_SUCH_NOTE = 'No such note',
  INTERNAL_SERVER_ERROR = 'Internal server error',
}
