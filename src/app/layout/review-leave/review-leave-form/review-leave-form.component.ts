import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-review-leave-form',
  templateUrl: './review-leave-form.component.html',
  styleUrls: ['./review-leave-form.component.css']
})
export class ReviewLeaveFormComponent implements OnInit {

  validateForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.validateForm = this.fb.group({
      reviewResult          : [ '', [ Validators.required ]],
      reviewReason           : [ '' , [ Validators.required ]],
    });
  }

  ngOnInit() {
  }

  /**
   * 获得表单元素formControl
   * @param name
   * @returns {AbstractControl}
   */
  getFormControl(name) {
    return this.validateForm.controls[ name ];
  }

}
