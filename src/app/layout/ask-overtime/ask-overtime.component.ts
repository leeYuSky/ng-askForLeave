import {Component, OnInit, ViewChild} from '@angular/core';
import {CheckUserService} from "../../service/check-user.service";
import {NzMessageService} from "ng-zorro-antd";
import {AskOvertimeFormComponent} from "./ask-overtime-form/ask-overtime-form.component";
import {AskOvertimeDraftComponent} from "./ask-overtime-draft/ask-overtime-draft.component";
import {AskOvertimeDoneComponent} from "./ask-overtime-done/ask-overtime-done.component";

@Component({
  selector: 'app-ask-overtime',
  templateUrl: './ask-overtime.component.html',
  styleUrls: ['./ask-overtime.component.css']
})
export class AskOvertimeComponent implements OnInit {

  isVisible = false;
  isConfirmLoading = false;
  current_user;

  @ViewChild(AskOvertimeFormComponent) formChild: AskOvertimeFormComponent;
  @ViewChild(AskOvertimeDraftComponent) draftChild: AskOvertimeDraftComponent;
  @ViewChild(AskOvertimeDoneComponent) doneChild: AskOvertimeDoneComponent;

  constructor(private  nzMessageService: NzMessageService,
              private checkUserService: CheckUserService) { }

  ngOnInit() {
    if (this.checkUserService.isLogin) {
      this.current_user = this.checkUserService.current_user;
    }
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

    if (this.checkUserService.isLogin) {

      if (!this.formChild.confirmFormForParen()){
        return;
      }

      this.isConfirmLoading = true;

      this.formChild.submitFormForParent(this.current_user).subscribe(
        data => {
          if (data['errno'] === 0) {

            if (this.formChild.getStatusForParent() === 1) {
              this.draftChild.refreshData();
            } else {
              this.doneChild.refreshData();
            }
            this.nzMessageService.create("success", "申请成功");
          } else {
            this.nzMessageService.create("error", "申请失败");
          }

          this.formChild.resetFormForParent();
          this.isVisible = false;
          this.isConfirmLoading = false;

        },
        err => {
          this.nzMessageService.create("error", "申请失败");
        }
      );
    } else {
      this.nzMessageService.create("error", "未登录");
    }


  }

  /**
   * 取消 添加请假 面板 (Modal)
   * @param e
   */
  handleCancel = (e) => {
    this.formChild.resetFormForParent();
    this.isVisible = false;
  }

  /**
   * tab切换时重新刷新数据
   * @param index
   */
  changeTab(index){
    if (index === 0){
      this.draftChild.refreshData();
    } else if (index === 1){
      this.doneChild.refreshData();
    }
  }

}
