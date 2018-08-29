import { Injectable } from '@angular/core';

import {Leader} from '../shared/leader';
import {LEADERS} from '../shared/leaders';


import { Observable,of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { map,catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Restangular } from 'ngx-restangular';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private http: HttpClient, 
    private processHTTPMsgService: ProcessHTTPMsgService,@Inject('BaseURL')private BaseURL,
    private restangular: Restangular) { }

  getLeaders(): Observable<Leader[]> {
  
    /*return new Promise(resolve=> {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(LEADERS), 2000);
    });*/
  //  return of(LEADERS).pipe(delay(2000));
   // implementation of rest angular
   return this.restangular.all('leaders').getList();
  }

  getLeader(id: number): Observable<Leader> {   
   /* return new Promise(resolve=> {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(LEADERS.filter((lead) => (lead.id === id))[0]), 2000);
    });*/
  //  return of(LEADERS.filter((lead) => (lead.id === id))[0]).pipe(delay(2000));
   // implementation of rest angular
   return  this.restangular.one('leaders', id).get();
  }

  getFeaturedLeader(): Observable<Leader> {
   
    /*return  new Promise(resolve=> {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(LEADERS.filter((leader) => leader.featured)[0]), 2000);
    });*/
  //  return of(LEADERS.filter((lead) => lead.featured)[0]).pipe(delay(2000));
   // implementation of rest angular
   return this.restangular.all('leaders').getList({featured: true})
   .pipe(map(leaders => leaders[0]));
  }
}
