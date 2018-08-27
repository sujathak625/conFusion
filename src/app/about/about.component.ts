import { Component, OnInit,Input } from '@angular/core';
import {Leader} from '../shared/leader';
import {LeaderService} from '../services/leader.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {  
   leaders:Leader[];

  constructor(private leaderService: LeaderService) { }

  ngOnInit() {   
  //  this.leaderService.getLeaders().then(leaders => this.leaders = leaders);
  this.leaderService.getLeaders().subscribe(leaders => this.leaders = leaders);
  }
}
