import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs/Observable";

import {LEAVE_LIST} from "../../data/leaveList";
import {LeaveDomain} from "../../data/leaveDomain";

import {LeaveService} from "../../service/leave.service";

@Component({
  selector: 'app-ask-leave-form',
  templateUrl: './ask-leave-form.component.html',
  styleUrls: ['./ask-leave-form.component.css']
})
export class AskLeaveFormComponent implements OnInit {

  leaveList: LeaveDomain[];

  validateForm: FormGroup;

  constructor(private fb: FormBuilder, private leaveService: LeaveService) {
    this.validateForm = this.fb.group({
      selectType          : [ '', [ Validators.required ]],
      startDate           : [ '', [ Validators.required ]],
      endDate             : [ '', [ Validators.required ]],
      leaveReason         : [ '', [ Validators.required ]],
      draftDone           : [ '', [ Validators.required ]],
      // email               : [ '', [ this.emailValidator ] ],
      // birthDay            : [ '', [ this.birthDayValidator ] ],
      // password            : [ '', [ Validators.required ] ],
      // passwordConfirmation: [ '', [ this.passwordConfirmationValidator ] ],
      // comment             : [ '', [ Validators.required ] ]
    });
  }



  submitForm = ($event, value) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[ key ].markAsDirty();
    }

    for (const key in this.validateForm.controls) {
      if (!this.validateForm.controls[key].valid) {
        return;
      }
    }
    const params = {
      username : "Jack",
      startTime : (Date.parse(value.startDate) / 1000),
      endTime : Date.parse(value.endDate) / 1000,
      type : value.selectType,
      reason : value.leaveReason,
      submitStatus : value.draftDone
    };

    // this.leaveService.firstCall();
    this.leaveService.addLeave(params).subscribe(data => {
      console.log(JSON.stringify(data));
    });

  }

  resetForm($event: MouseEvent) {
    $event.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[ key ].markAsPristine();
    }
  }

  validateConfirmPassword() {
    setTimeout(_ => {
      this.validateForm.controls[ 'passwordConfirmation' ].updateValueAndValidity();
    });
  }

  userNameAsyncValidator = (control: FormControl): any => {
    return Observable.create(function (observer) {
      setTimeout(() => {
        if (control.value === 'JasonWood') {
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });
  }

  getFormControl(name) {
    return this.validateForm.controls[ name ];
  }

  emailValidator = (control: FormControl): { [s: string]: boolean } => {
    const EMAIL_REGEXP = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
    if (!control.value) {
      return { required: true };
    } else if (!EMAIL_REGEXP.test(control.value)) {
      return { error: true, email: true };
    }
  }
  passwordConfirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls[ 'password' ].value) {
      return { confirm: true, error: true };
    }
  }
  birthDayValidator = (control: FormControl): any => {
    if (new Date(control.value) > new Date()) {
      return { expired: true, error: true };
    }
  }


  ngOnInit() {
    this.leaveList = LEAVE_LIST;
  }

  getLeaveContent(value: number){
    return this.leaveList[value - 1].content;
  }

  resetFormForParent() {
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[ key ].markAsPristine();
    }
  }

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

  submitFormForParent = () => {
    // for (const key in this.validateForm.controls) {
    //   this.validateForm.controls[ key ].markAsDirty();
    // }
    //
    // for (const key in this.validateForm.controls) {
    //   if (!this.validateForm.controls[key].valid) {
    //     return;
    //   }
    // }
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
}
