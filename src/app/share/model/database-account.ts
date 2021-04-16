import {DatabaseServer} from './database-server';

export interface DatabaseAccount {
  sqlLogin: string;
  userLogin: string;
  server: DatabaseServer;
  nbDatabases: number;
}
