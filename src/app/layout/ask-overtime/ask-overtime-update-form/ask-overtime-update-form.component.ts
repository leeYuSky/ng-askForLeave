import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {LeaveService} from "../../../service/leave.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-ask-overtime-update-form',
  templateUrl: './ask-overtime-update-form.component.html',
  styleUrls: ['./ask-overtime-update-form.component.css']
})
export class AskOvertimeUpdateFormComponent implements OnInit, OnChanges{

  @Input() currentData;
  validateFormUpdate: FormGroup;

  _startDate = null;
  _reason = null;
  _status = null;

  constructor(private fb: FormBuilder, private leaveService: LeaveService) {
    this.validateFormUpdate = this.fb.group({
      startDateUpdate           : [ '' , [ Validators.required ]],
      overtimeReasonUpdate         : [ '', [ Validators.required ]],
      draftDoneUpdate           : [ '', [ Validators.required ]],
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
   * 输入属性发生变化时调用的生命周期钩子函数
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (this.currentData) {
      // console.log("-----" + JSON.stringify(this.currentData));
      // console.log(this.currentData.startTime);
      this._startDate = new Date(this.currentData.startTime * 1000);
      this._reason = this.currentData.reason;
      this._status = 1;
      this.getFormControl("startDateUpdate").markAsDirty();
      this.getFormControl("overtimeReasonUpdate").markAsDirty();
      this.getFormControl("draftDoneUpdate").markAsDirty();

    }
  }


  /**
   * 获得表单元素formControl
   * @param name
   * @returns {AbstractControl}
   */
  getFormControl(name) {
    return this.validateFormUpdate.controls[ name ];
  }

  /**
   * 重置表单
   */
  resetFormForParent() {
    if (this.currentData) {
      this._startDate = new Date(this.currentData.startTime * 1000);
      this._reason = this.currentData.reason;
      this._status = 1;
      this.getFormControl("startDateUpdate").markAsDirty();
      this.getFormControl("overtimeReasonUpdate").markAsDirty();
      this.getFormControl("draftDoneUpdate").markAsDirty();
    }
  }

  /**
   * 确认表单数据合法
   * @returns {boolean}
   */
  confirmFormForParen (){
    for (const key in this.validateFormUpdate.controls) {
      this.validateFormUpdate.controls[ key ].markAsDirty();
    }

    for (const key in this.validateFormUpdate.controls) {
      if (!this.validateFormUpdate.controls[key].valid) {
        return false;
      }
    }
    return true;
  }

  /**
   * 提交表单数据
   * @returns {Observable<Object>}
   */
  submitFormForParent = (username) => {

    const params = {
      username : username,
      startTime : (Date.parse(this.validateFormUpdate.controls[ "startDateUpdate" ].value) / 1000),
      endTime : Date.parse(this.validateFormUpdate.controls[ "startDateUpdate" ].value) / 1000,
      type : 10,
      reason : this.validateFormUpdate.controls[ "overtimeReasonUpdate" ].value,
      submitStatus : this.validateFormUpdate.controls[ "draftDoneUpdate" ].value,
      id : this.currentData.id
    };

    // this.leaveService.firstCall();
    return this.leaveService.updateLeave(params);

  }

  /**
   * 获得当前实例提交数据状态
   * @returns {any}
   */
  getStatusForParent = () => {
    return this.validateFormUpdate.controls[ "draftDoneUpdate" ].value;
  }

}
