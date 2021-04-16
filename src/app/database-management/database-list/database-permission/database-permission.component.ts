import {Component, Input, OnInit} from '@angular/core';
import {DatabaseUser} from '../../../share/model/database-user';
import {PermissionType, Permission} from '../../Permission';

@Component({
  selector: 'app-database-permission',
  templateUrl: './database-permission.component.html',
  styleUrls: ['./database-permission.component.scss']
})
export class DatabasePermissionComponent implements OnInit {
  @Input() contributors: DatabaseUser[];
  @Input() showPermission = false;
  constructor() { }

  ngOnInit(): void {
  }

  getInitials(level: number): string {
    const permissionType: PermissionType = Permission.getPermission(level);
    return permissionType === null ? '' : permissionType.initial;
  }

  getColor(level: number): string {
    const permissionType: PermissionType = Permission.getPermission(level);
    if (permissionType === null || permissionType.initial !== 'A') {
      return 'avatardefault';
    }
    return 'avataradmin';
  }

  getTitle(level: number): string {
    const permissionType: PermissionType = Permission.getPermission(level);
    return permissionType === null ? 'Inconnu' : permissionType.title;
  }
}
