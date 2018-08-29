import { Component, OnInit,Input } from '@angular/core';
import {Leader} from '../shared/leader';
import {LeaderService} from '../services/leader.service';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {  
   leaders:Leader[];
   leaderErrMess:any;
  
  constructor(private leaderService: LeaderService,@Inject('BaseURL')private BaseURL) { }

  ngOnInit() {   
  //  this.leaderService.getLeaders().then(leaders => this.leaders = leaders);
 // this.leaderService.getLeaders().subscribe(leaders => this.leaders = leaders);

  this.leaderService.getLeaders()
   .subscribe(leaders => this.leaders = leaders,
     leaderErrorMess => this.leaderErrMess = <any>leaderErrorMess.message);
  }
}
