export const URL_PREFIX = 'api';

export enum BASE_NOTES_URLS {
  GREETINGS = '/greetings/:name?',
  NOTES = '/notes',
  NOTES_BY_ID = '/notes/:id?',
}

export enum BASE_USER_URLS {
  SIGN_UP = '/sign-up',
  SIGN_IN = '/sign-in',
  LOG_OUT = '/log-out',
  REFRESH = '/refresh',
}

export const ALL_ROUTES = '*';
export const MIDDLEWARE_ROUTE = '/api/notes';

export const ORIGINS = ['https://vsevolod-trusov.github.io'];
