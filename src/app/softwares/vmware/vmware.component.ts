import { Component, OnInit } from '@angular/core';
import {VMWAREPRODUCTS} from './vmwareproducts-data';

@Component({
  selector: 'app-vmware',
  templateUrl: './vmware.component.html',
  styleUrls: ['./vmware.component.scss']
})
export class VmwareComponent implements OnInit {
  products = VMWAREPRODUCTS;

  constructor() { }

  ngOnInit(): void {
  }

}
