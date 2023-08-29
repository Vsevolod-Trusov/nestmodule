export const getLogInfo = (
  method: string,
  url: string,
  statusCode: number,
  ...parameters
) => `Logging  HTTP request ${method} ${url} ${statusCode} ${parameters}`;
