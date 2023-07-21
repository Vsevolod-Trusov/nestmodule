export const enum RESPONSE_ERROR_MESSAGES {
  WRONG_NAME_ERROR = 'Wrong input name',
  WRONG_PASSWORD = 'Password is incorrect',
  WRONG_ID = 'Wrong note id',
  SUCH_USER_EXISTS = 'User already exists',
  SUCH_NOTE_DELETED = 'Such note is deleted',
  NO_SUCH_NOTE = 'No such note',
  ID_NOT_EQUALS = "Id got via params is not equals with body's id",
  BAD_DATABASE_CONNECTION = 'Database connection is lost',
  USER_NOT_EXIST = 'User does not exist',
  REQUEST_DENIED = 'Access Denied',
  INTERNAL_SERVER_ERROR = 'Internal server error',
}
