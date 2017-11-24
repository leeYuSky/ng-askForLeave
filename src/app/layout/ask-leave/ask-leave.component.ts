import {Component, OnInit, ViewChild} from '@angular/core';
import {AskLeaveFormComponent} from "../ask-leave-form/ask-leave-form.component";

@Component({
  selector: 'app-ask-leave',
  templateUrl: './ask-leave.component.html',
  styleUrls: ['./ask-leave.component.css']
})
export class AskLeaveComponent implements OnInit {

  isVisible = false;
  isConfirmLoading = false;
  @ViewChild(AskLeaveFormComponent) formChild: AskLeaveFormComponent;

  constructor() { }

  ngOnInit() {
  }

  showModal = () => {
    this.isVisible = true;
  }

  handleOk = (e) => {

    if (!this.formChild.confirmFormForParen()){
      return;
    }
    this.isConfirmLoading = true;

    this.formChild.submitFormForParent().subscribe(
      data => {
      this.formChild.resetFormForParent();
      this.isVisible = false;
      this.isConfirmLoading = false;
      console.log(JSON.stringify(data));
      },
      err => {
        console.log('Something went wrong!' + err);
      }
    );
  }

  handleCancel = (e) => {
    this.formChild.resetFormForParent();
    this.isVisible = false;
  }


}
