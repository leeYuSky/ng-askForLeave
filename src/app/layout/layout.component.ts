import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  isCollapsed = true;
  constructor(){}

  ngOnInit() {
  }

  log(msg: string){
    console.log(msg);
  }

}
