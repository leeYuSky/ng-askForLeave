import {Component, OnInit, ViewChild} from '@angular/core';
import {LeaveService} from "../../../service/leave.service";
import {NzMessageService, NzModalService} from "ng-zorro-antd";
import {CheckUserService} from "../../../service/check-user.service";
import {STATUS_LIST} from "../../../data/statusDomain";
import {AskOvertimeUpdateFormComponent} from "../ask-overtime-update-form/ask-overtime-update-form.component";

@Component({
  selector: 'app-ask-overtime-draft',
  templateUrl: './ask-overtime-draft.component.html',
  styleUrls: ['./ask-overtime-draft.component.css']
})
export class AskOvertimeDraftComponent implements OnInit {

  statusList: string[];

  // 提示框变量
  isVisible = false;
  isConfirmLoading = false;
  modal_data;

  // 表格变量
  _current = 1;
  _pageSize = 10;
  _total = 1;
  _dataSet = [];
  _loading = false;

  @ViewChild(AskOvertimeUpdateFormComponent) formUpdateChild: AskOvertimeUpdateFormComponent;

  current_user;

  constructor(private leaveService: LeaveService,
              private confirmServ: NzModalService,
              private  nzMessageService: NzMessageService,
              private checkUserService: CheckUserService) { }

  ngOnInit() {
    this.statusList = STATUS_LIST;
    if (this.checkUserService.isLogin) {
      this.current_user = this.checkUserService.current_user;
      this.refreshData();
    }
  }

  /**
   * 刷新表格数据
   * @param reset
   */
  refreshData(reset = false) {
    if (this.checkUserService.isLogin) {
      if (reset) {
        this._current = 1;
      }
      this._loading = true;

      this.leaveService.getOvertimeDeaft(this.current_user, this._current, this._pageSize).subscribe((data: any) => {
        this._loading = false;
        this._total = data.data.total;
        this._dataSet = data.data.list;
      });
    }
  }

  /**
   * 显示 删除 提示框
   * @param data
   */
  showConfirm = (data) => {
    let constance = this;
    let model = this.confirmServ.confirm({
      title  : '警告',
      content: '<b>确认删除该条数据?删除后不可恢复</b>',
      showConfirmLoading: true,
      onOk() {
        if (constance.checkUserService.isLogin) {
          return new Promise((resolve, reject) => {
            constance.leaveService.deleteLeave(data['id']).subscribe(
              data => {
                if (data['errno'] === 0) {
                  resolve();
                  constance.nzMessageService.create('success', `删除成功`);
                  constance.refreshData();
                } else {
                  resolve();
                  constance.nzMessageService.create('error', `删除失败`);
                }

              },
              err => {
                reject();
                constance.nzMessageService.create('error', `删除失败`);
              });
          });
        } else {
          constance.nzMessageService.create('error', `未登录`);
        }

      },
      onCancel() {
      }
    });
  }

  /**
   * 显示 修改编辑 提示框
   * @param data
   */
  showModal = (data) => {
    this.isVisible = true;
    this.modal_data = data;
  }

  /**
   * 确认修改
   * @param e
   */
  handleOk = (e) => {

    if (this.checkUserService.isLogin) {

      if (!this.formUpdateChild.confirmFormForParen()) {
        return;
      }
      this.isConfirmLoading = true;

      this.formUpdateChild.submitFormForParent(this.current_user).subscribe(
        data => {
          if (data['errno'] === 0) {
            this.nzMessageService.create('success', `修改成功`);
            if (this.formUpdateChild.getStatusForParent() === 1) {
              this.refreshData();
            } else {
              this.refreshData();
            }

          } else {
            this.nzMessageService.create('error', `修改失败`);
          }
          this.isVisible = false;
          this.isConfirmLoading = false;

        },
        err => {
          this.nzMessageService.create('error', `修改失败`);
          this.isVisible = false;
          this.isConfirmLoading = false;
        }
      );
    } else {
      this.nzMessageService.create('error', `未登录`);
    }


  }

  /**
   * 取消修改
   * @param e
   */
  handleCancel = (e) => {
    this.isVisible = false;
    this.formUpdateChild.resetFormForParent();
  }

}
