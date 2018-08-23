import { Component, OnInit,Input } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {Leader} from '../shared/leader';
import {LEADERS} from '../shared/leaders';
import {LeaderService} from '../services/leader.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {  
   leaders:Leader[];

  constructor(private leaderService: LeaderService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    return this.leaders=this.leaderService.getLeaders();   
  }
}
