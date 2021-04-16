import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatSelectionListChange} from '@angular/material/list';
import {PERMISSIONS, PermissionType} from '../Permission';

@Component({
  selector: 'app-permission-selection-list',
  templateUrl: './permission-selection-list.component.html',
  styleUrls: ['./permission-selection-list.component.scss']
})
export class PermissionSelectionListComponent {
  @Input() disabled = false;
  @Input() selectedId = -1;
  list: PermissionType[] = PERMISSIONS;

  @Output() permissionSelected = new EventEmitter<PermissionType>();

  constructor() { }

  onSelectionChange($event: MatSelectionListChange): void {
    this.permissionSelected.emit($event.source.selectedOptions.selected[0].value);
  }

  getColor(level: string): string {
    return (level === 'A' ? 'avataradmin avatarperm' : 'avatardefault avatarperm');
  }

}
