

export interface DatabaseUser {
  dbId: number;
  sqlLogin: string;
  userLogin: string;
  userFullName: string;
  groupType: number;
  password: string;
  addedByUserLogin: string;
  canBeDeleted: boolean;
  canBeUpdated: boolean;
}
