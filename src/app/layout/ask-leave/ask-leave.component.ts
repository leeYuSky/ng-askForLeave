import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ask-leave',
  templateUrl: './ask-leave.component.html',
  styleUrls: ['./ask-leave.component.css']
})
export class AskLeaveComponent implements OnInit {

  isVisible = false;
  isConfirmLoading = false;

  constructor() { }

  ngOnInit() {
  }

  showModal = () => {
    this.isVisible = true;
  }

  handleOk = (e) => {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }

  handleCancel = (e) => {
    this.isVisible = false;
  }


}
