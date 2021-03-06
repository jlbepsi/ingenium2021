import {DatabaseServer} from './database-server';
import {DatabaseUser} from './database-user';


export interface Database {
  id: number;
  serverId: number;
  nomBd: string;
  dateCreation: string;
  commentaire: string;
  canBeDeleted: boolean;
  canBeUpdated: boolean;
  canAddGroupUser: boolean;
  server: DatabaseServer;
  users: DatabaseUser[];
  // contributors: Contributor[];
}

export interface DatabaseApiModel {
  Id: number;
  ServerId: number;
  NomBD: string;
  UserLogin: string;
  UserFullName: string,
  Commentaire: string;
}
