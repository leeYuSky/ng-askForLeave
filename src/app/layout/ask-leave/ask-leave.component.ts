import {Component, OnInit, ViewChild} from '@angular/core';
import {AskLeaveFormComponent} from "../ask-leave-form/ask-leave-form.component";
import {AskLeaveDraftComponent} from "../ask-leave-draft/ask-leave-draft.component";

@Component({
  selector: 'app-ask-leave',
  templateUrl: './ask-leave.component.html',
  styleUrls: ['./ask-leave.component.css']
})
export class AskLeaveComponent implements OnInit {

  isVisible = false;
  isConfirmLoading = false;


  // 子组件
  @ViewChild(AskLeaveFormComponent) formChild: AskLeaveFormComponent;
  @ViewChild(AskLeaveDraftComponent) dratfChild: AskLeaveDraftComponent;

  constructor() { }

  ngOnInit() {
  }

  /**
   * 显示 添加请假 面板
   */
  showModal = () => {
    this.isVisible = true;
  }

  /**
   * 确认提交 添加请假 请求
   * @param e
   */
  handleOk = (e) => {

    if (!this.formChild.confirmFormForParen()){
      return;
    }
    this.isConfirmLoading = true;

    this.formChild.submitFormForParent().subscribe(
      data => {

      if (this.formChild.getStatusForParent() === 1) {
        this.dratfChild.refreshData();
      } else {

      }
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

  /**
   * 取消 添加请假 面板
   * @param e
   */
  handleCancel = (e) => {
    this.formChild.resetFormForParent();
    this.isVisible = false;
  }


}
