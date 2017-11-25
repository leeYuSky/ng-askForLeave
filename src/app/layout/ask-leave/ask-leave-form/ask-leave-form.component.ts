import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import * as moment from 'moment';

import {LEAVE_LIST} from "../../../data/leaveList";
import {LeaveDomain} from "../../../data/leaveDomain";

import {LeaveService} from "../../../service/leave.service";

@Component({
  selector: 'app-ask-leave-form',
  templateUrl: './ask-leave-form.component.html',
  styleUrls: ['./ask-leave-form.component.css']
})
export class AskLeaveFormComponent implements OnInit {

  leaveList: LeaveDomain[];

  validateForm: FormGroup;

  _startDate = null;
  _endDate = null;
  _date111 = new Date(2017, 10, 28);

  constructor(private fb: FormBuilder, private leaveService: LeaveService) {
    this.validateForm = this.fb.group({
      selectType          : [ '', [ Validators.required ]],
      startDate           : [ '' , [ Validators.required ]],
      endDate             : [ '', [ Validators.required ]],
      leaveReason         : [ '', [ Validators.required ]],
      draftDone           : [ '', [ Validators.required ]],
    });
  }

  /**
   * 初始化钩子函数
   */
  ngOnInit() {
    this.leaveList = LEAVE_LIST;
  }

  /**
   * 日期选择器禁用规则
   * @private
   */
  _startValueChange = () => {
    if (this._startDate > this._endDate) {
      this._endDate = null;
    }
  }
  _endValueChange = () => {
    if (this._startDate > this._endDate) {
      this._startDate = null;
    }
  }
  // 周六周日不能请假
  _disabledDate = function (current) {
    return current.getDay() === 0 || current.getDay() === 6;
  };

  _disabledDateBefore = (current) => {
    return current.getTime() < Date.now();
  }

  _disabledStartDate = (startValue) => {
    let result = false;
    if (!startValue || !this._endDate) {
      result =  false;
    }else {
      result = startValue.getTime() > this._endDate.getTime();
    }

    return result || this._disabledDate(startValue) || this._disabledDateBefore(startValue);
  }
  _disabledEndDate = (endValue) => {
    let result = false;
    if (!endValue || !this._startDate) {
      result =  false;
    }else {
      result = endValue.getTime() < this._startDate.getTime();
    }
    return result || this._disabledDate(endValue) || this._disabledDateBefore(endValue);
  }

  /**
   * 获得起止日期内的工作日天数
   * @param startDate
   * @param endDate
   * @returns {number}
   */
  getWorkDay = (startDate, endDate) => {
    let totalDay = (endDate - startDate) / 86400000 + 1;
    let remainder = totalDay % 7;
    // 工时向下取整的除数
    let divisor = Math.floor(totalDay / 7);
    let weekendDay = 2 * divisor;

    // 起始日期的星期，星期取值有（1,2,3,4,5,6,0）
    let nextDay = startDate.getDay();
    // 从起始日期的星期开始 遍历remainder天
    for (let tempDay = remainder; tempDay >= 1; tempDay--) {
      // 第一天不用加1
      if (tempDay === remainder) {
        nextDay = nextDay + 0;
      } else if (tempDay !== remainder) {
        nextDay = nextDay + 1;
      }
      // 周日，变更为0
      if (nextDay === 7) {
        nextDay = 0;
      }

      // 周六日
      if (nextDay === 0 || nextDay === 6) {
        weekendDay = weekendDay + 1;
      }
    }
    // 实际工时（天） = 起止日期差 - 周六日数目。
    return Math.floor(totalDay - weekendDay);
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
   * 获得请假类型名称
   * @param value
   * @returns {string}
   */
  getLeaveContent(value: number){
    return this.leaveList[value - 1].content;
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
  submitFormForParent = () => {

    const params = {
      username : "Jack",
      startTime : (Date.parse(this.validateForm.controls[ "startDate" ].value) / 1000),
      endTime : Date.parse(this.validateForm.controls[ "endDate" ].value) / 1000,
      type : this.validateForm.controls[ "selectType" ].value,
      reason : this.validateForm.controls[ "leaveReason" ].value,
      submitStatus : this.validateForm.controls[ "draftDone" ].value
    };

    // this.leaveService.firstCall();
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
