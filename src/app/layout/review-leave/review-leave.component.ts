import {Component, OnInit, ViewChild} from '@angular/core';
import {ReviewLeaveTodoComponent} from "./review-leave-todo/review-leave-todo.component";
import {ReviewLeaveDoneComponent} from "./review-leave-done/review-leave-done.component";

@Component({
  selector: 'app-review-leave',
  templateUrl: './review-leave.component.html',
  styleUrls: ['./review-leave.component.css']
})
export class ReviewLeaveComponent implements OnInit {

  @ViewChild(ReviewLeaveTodoComponent) reviewLeaveTodoComponent: ReviewLeaveTodoComponent;
  @ViewChild(ReviewLeaveDoneComponent) reviewLeaveDoneComponent: ReviewLeaveDoneComponent;

  constructor() { }

  ngOnInit() {
  }

  /**
   * tab切换时更新数据
   * @param index
   */
  changeTab(index){
    if (index === 0){
      this.reviewLeaveTodoComponent.refreshData();
    } else if (index === 1){
      this.reviewLeaveDoneComponent.refreshData();
    }

  }

}
