// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  authenticationApiURl: 'https://users.ws.mydil.io/api/auth',
  usersApiURl: 'https://users.ws.mydil.io/api/users',
  webStorageApiUrl: 'https://storage.ws.montpellier.epsi.fr/api/folders',
  databaseAccountApiURl: 'https://database.ws.montpellier.epsi.fr/api/database',

  /*
  authenticationApiURl: 'http://localhost:8081/api/auth',
  usersApiURl: 'http://localhost:8081/api/users',
  webStorageApiUrl: 'http://localhost:8082/api/folders',
  */
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
