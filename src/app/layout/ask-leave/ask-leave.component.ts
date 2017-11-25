import {Component, OnInit, ViewChild} from '@angular/core';
import {AskLeaveFormComponent} from "../ask-leave-form/ask-leave-form.component";
import {AskLeaveDraftComponent} from "../ask-leave-draft/ask-leave-draft.component";
import {NzMessageService} from "ng-zorro-antd";
import {AskLeaveDoneComponent} from "../ask-leave-done/ask-leave-done.component";

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
  @ViewChild(AskLeaveDoneComponent) doneChild: AskLeaveDoneComponent;

  constructor(private  nzMessageService: NzMessageService) { }

  ngOnInit() {
  }

  /**
   * 显示 添加请假 面板 (Modal)
   */
  showModal = () => {
    this.isVisible = true;
  }

  /**
   * 确认提交 添加请假 请求 (Modal)
   * @param e
   */
  handleOk = (e) => {

    if (!this.formChild.confirmFormForParen()){
      return;
    }
    this.isConfirmLoading = true;

    this.formChild.submitFormForParent().subscribe(
      data => {
        if (data['errno'] === 0) {

          if (this.formChild.getStatusForParent() === 1) {
            this.dratfChild.refreshData();
          } else {
            this.doneChild.refreshData();
          }
          this.nzMessageService.create("success", "申请成功");
          // console.log(JSON.stringify(data));
        } else {
          this.nzMessageService.create("error", "申请失败");
        }

        this.formChild.resetFormForParent();
        this.isVisible = false;
        this.isConfirmLoading = false;

      },
      err => {
        this.nzMessageService.create("error", "申请失败");
        // console.log('Something went wrong!' + err);
      }
    );
  }

  /**
   * 取消 添加请假 面板 (Modal)
   * @param e
   */
  handleCancel = (e) => {
    this.formChild.resetFormForParent();
    this.isVisible = false;
  }


}
