import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-deliv',
  templateUrl: './add-deliv.component.html',
  styleUrls: ['./add-deliv.component.css']
})
export class AddDelivComponent implements OnInit {
  isLoading : boolean ;
  status = "";
  constructor() { }

  ngOnInit(): void {
  }

  onSwitch(a : number){
    if(a == 1) {
      this.status = "right-panel-active";
    }
    else 
    this.status = "";
  }

}
