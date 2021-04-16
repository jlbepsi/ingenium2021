export interface PermissionType {
  id: number;
  initial: string;
  title: string;
  explanations: string;
}

export class Permission {
  static getPermission(permissionId: number): PermissionType {
    if (permissionId > 0 && permissionId < 5) {
      return PERMISSIONS[permissionId - 1];
    }
    return null;
  }
}

export const PERMISSIONS: PermissionType[] = [
  {
    id: 1,
    initial: 'A',
    title: 'Administrateur',
    explanations: 'Droit de modification plus la suppression de la base de données et gestion des contributeurs'
  },
  {
    id: 2,
    initial: 'M',
    title: 'Modification',
    explanations: 'Droit de lecture plus l\'ajout/supression de table, vue, trigger, ...'
  },
  {
    id: 3,
    initial: 'E',
    title: 'Lecture/Ecriture',
    explanations: 'Droit de lecture plus l\'écriture des données'
  },
  {
    id: 4,
    initial: 'L',
    title: 'Lecture seulement',
    explanations: 'Lecture des données uniquement, aucune modification possible'
  },
];
