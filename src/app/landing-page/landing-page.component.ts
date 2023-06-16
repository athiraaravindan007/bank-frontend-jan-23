import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
    // button toggle read more and read less
    isCollapse:boolean = true


    // function for button toggle
    collapse(){
      this.isCollapse = !this.isCollapse
    }

}
