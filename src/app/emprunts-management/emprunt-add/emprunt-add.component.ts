import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-emprunt-add',
  templateUrl: './emprunt-add.component.html',
  styleUrls: ['./emprunt-add.component.scss']
})
export class EmpruntAddComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isSelected = -1;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  onCardClick(index: number): void {
    this.isSelected = index;
  }

  getTestArray(): number[] {
    // TODO : A Supprimer
    return Array.from(Array(10).keys());
  }

}
