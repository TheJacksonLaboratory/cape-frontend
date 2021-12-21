// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const API_URL = 'http://localhost:5000/api';

export const environment = {
  production: false,
  API_URL: API_URL,
  FILE_URL: 'http://localhost:8080',
  V1_URL: API_URL + '/v1',
  AUTH_URL: API_URL + '/auth',
  DATA_FILE_URL: API_URL + '/datafiles',
  PARAMETERS_URL: API_URL + '/parameters',
  USER_URL: API_URL + '/user',
  JOB_URL: API_URL + '/jobs',
  REPORT_URL: API_URL + '/reports'
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
