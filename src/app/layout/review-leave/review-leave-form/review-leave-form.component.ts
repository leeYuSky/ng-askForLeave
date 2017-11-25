import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LeaveService} from "../../../service/leave.service";

@Component({
  selector: 'app-review-leave-form',
  templateUrl: './review-leave-form.component.html',
  styleUrls: ['./review-leave-form.component.css']
})
export class ReviewLeaveFormComponent implements OnInit {

  validateForm: FormGroup;

  constructor(private fb: FormBuilder,
              private leaveService: LeaveService) {
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

  /**
   * 重置表单
   */
  resetFormForParent() {
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[ key ].markAsPristine();
    }
  }

  /**
   * 确认表单数据合法
   * @returns {boolean}
   */
  confirmFormForParen (){
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[ key ].markAsDirty();
    }

    for (const key in this.validateForm.controls) {
      if (!this.validateForm.controls[key].valid) {
        return false;
      }
    }
    return true;
  }

  /**
   * 提交表单数据
   * @returns {Observable<Object>}
   */
  submitFormForParent = (Id) => {

    const params = {
      id : Id,
      status : this.getFormControl("reviewResult").value,
      reviewReason : this.getFormControl("reviewReason").value
    };

    return this.leaveService.updateReviewLeave(params);

  }

}
