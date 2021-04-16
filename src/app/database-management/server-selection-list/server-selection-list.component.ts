import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DatabaseServer} from '../../share/model/database-server';
import {MatSelectionListChange} from '@angular/material/list';

@Component({
  selector: 'app-server-selection-list',
  templateUrl: './server-selection-list.component.html',
  styleUrls: ['./server-selection-list.component.scss']
})
export class ServerSelectionListComponent implements OnInit {
  @Input() disabled = false;
  @Input() selectedId = -1;
  @Input() list: DatabaseServer[] = [];

  @Output() serverSelected = new EventEmitter<DatabaseServer>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelectionChange($event: MatSelectionListChange): void {
    this.serverSelected.emit($event.source.selectedOptions.selected[0].value);
  }
}
