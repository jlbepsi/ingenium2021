

export interface DatabaseUser {
  dbId: number;
  sqlLogin: string;
  userLogin: string;
  userFullName: string;
  groupType: number;
  addedByUserLogin: string;
  canBeDeleted: boolean;
  canBeUpdated: boolean;
}
