import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-update-contributor-form',
  templateUrl: './update-contributor-form.component.html',
  styleUrls: ['./update-contributor-form.component.scss']
})
export class UpdateContributorFormComponent implements OnInit {

  @Input() username: string;
  @Input() updatePassword = true;

  constructor() { }

  ngOnInit(): void {
  }

  onChangePassword($event: string): void {

  }
}
