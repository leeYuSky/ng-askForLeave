import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ask-leave-draft',
  templateUrl: './ask-leave-draft.component.html',
  styleUrls: ['./ask-leave-draft.component.css']
})
export class AskLeaveDraftComponent implements OnInit {
  _dataSet = [];
  constructor() { }

  ngOnInit() {
    for (let i = 0; i < 46; i++) {
      this._dataSet.push({
        key    : i,
        name   : `Edward King ${i}`,
        age    : 32,
        address: `London, Park Lane no. ${i}`,
      });
    }
  }

}
