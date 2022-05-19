import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'testSviluppatoriAngular';

  public formType: string | null;

  constructor(){}

  ngOnInit(): void {
  }

  getUserFromId(){
    this.formType = null;
    this.formType = "SEARCH";
  }

  register(){
    this.formType = null;
    this.formType = "REGISTER";
  }

  refresh(): void {
    window.location.reload();
  }
  
}
