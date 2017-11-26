import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LeaveService} from "../../../service/leave.service";

@Component({
  selector: 'app-ask-overtime-form',
  templateUrl: './ask-overtime-form.component.html',
  styleUrls: ['./ask-overtime-form.component.css']
})
export class AskOvertimeFormComponent implements OnInit {

  validateForm: FormGroup;

  _startDate = null;

  constructor(private fb: FormBuilder,
              private leaveService: LeaveService) {
    this.validateForm = this.fb.group({
      startDate           : [ '', [ Validators.required ]],
      overtimeReason      : [ '', [ Validators.required ]],
      draftDone           : [ '', [ Validators.required ]],
    });
  }

  ngOnInit() {
  }

  /**
   * 限制只能周末请假
   * @param current
   * @returns {boolean}
   * @private
   */
  _disabledDate = function (current) {
    return !(current.getDay() === 0 || current.getDay() === 6);
  };

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
  submitFormForParent = (usernmae) => {

    const params = {
      username : usernmae,
      startTime : (Date.parse(this.validateForm.controls[ "startDate" ].value) / 1000),
      endTime : Date.parse(this.validateForm.controls[ "startDate" ].value) / 1000,
      type : 10,
      reason : this.validateForm.controls[ "overtimeReason" ].value,
      submitStatus : this.validateForm.controls[ "draftDone" ].value
    };

    return this.leaveService.addLeave(params);

  }

  /**
   * 获得当前实例提交数据状态
   * @returns {any}
   */
  getStatusForParent = () => {
    return this.validateForm.controls[ "draftDone" ].value;
  }

}
