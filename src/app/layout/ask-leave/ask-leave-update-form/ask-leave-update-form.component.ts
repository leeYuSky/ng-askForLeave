import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {LeaveDomain} from "../../../data/leaveDomain";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LeaveService} from "../../../service/leave.service";
import {LEAVE_LIST} from "../../../data/leaveList";

@Component({
  selector: 'app-ask-leave-update-form',
  templateUrl: './ask-leave-update-form.component.html',
  styleUrls: ['./ask-leave-update-form.component.css']
})
export class AskLeaveUpdateFormComponent implements OnInit, OnChanges {

  leaveList: LeaveDomain[];
  validateFormUpdate: FormGroup;
  @Input() currentData;

  _startDate = null;
  _endDate = null;
  _reason = null;
  _type = null;
  _status = null;

  constructor(private fb: FormBuilder, private leaveService: LeaveService) {
    this.validateFormUpdate = this.fb.group({
      selectTypeUpdate          : [ '', [ Validators.required ]],
      startDateUpdate           : [ '' , [ Validators.required ]],
      endDateUpdate             : [ '', [ Validators.required ]],
      leaveReasonUpdate         : [ '', [ Validators.required ]],
      draftDoneUpdate           : [ '', [ Validators.required ]],
    });
  }

  /**
   * 初始化生命周期钩子函数
   */
  ngOnInit() {
    this.leaveList = LEAVE_LIST;
    // console.log("-----"+JSON.stringify(this.currentDate))

  }

  /**
   * 输入属性发生变化时调用的生命周期钩子函数
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (this.currentData) {
      // console.log("-----" + JSON.stringify(this.currentData));
      // console.log(this.currentData.startTime);
      this._startDate = new Date(this.currentData.startTime * 1000);
      this._endDate = new Date(this.currentData.endTime * 1000);
      this._reason = this.currentData.reason;
      this._type = this.currentData.type;
      this._status = 1;
      this.getFormControl("selectTypeUpdate").markAsDirty();
      this.getFormControl("startDateUpdate").markAsDirty();
      this.getFormControl("endDateUpdate").markAsDirty();
      this.getFormControl("leaveReasonUpdate").markAsDirty();
      this.getFormControl("draftDoneUpdate").markAsDirty();

    }
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

  // 今天之前的不能请假
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
    return this.validateFormUpdate.controls[ name ];
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
    if (this.currentData) {
      this._startDate = new Date(this.currentData.startTime * 1000);
      this._endDate = new Date(this.currentData.endTime * 1000);
      this._reason = this.currentData.reason;
      this._type = this.currentData.type;
      this._status = 1;
      this.getFormControl("selectTypeUpdate").markAsDirty();
      this.getFormControl("startDateUpdate").markAsDirty();
      this.getFormControl("endDateUpdate").markAsDirty();
      this.getFormControl("leaveReasonUpdate").markAsDirty();
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
  submitFormForParent = () => {

    const params = {
      username : "Jack",
      startTime : (Date.parse(this.validateFormUpdate.controls[ "startDateUpdate" ].value) / 1000),
      endTime : Date.parse(this.validateFormUpdate.controls[ "endDateUpdate" ].value) / 1000,
      type : this.validateFormUpdate.controls[ "selectTypeUpdate" ].value,
      reason : this.validateFormUpdate.controls[ "leaveReasonUpdate" ].value,
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
