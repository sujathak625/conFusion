import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';


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
export class PromotionService {

  constructor(private http: HttpClient, 
    private processHTTPMsgService: ProcessHTTPMsgService,@Inject('BaseURL')private BaseURL,
    private restangular: Restangular) { }

  getPromotions(): Observable<Promotion[]> {  
  /*  return new Promise(resolve=> {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(PROMOTIONS), 2000);
    });*/
  //  return of(PROMOTIONS).pipe(delay(2000));
  // implementation of rest angular
  return this.restangular.all('promotions').getList();
  }

  getPromotion(id: number): Observable<Promotion> {
    
  /*  return new Promise(resolve=> {
        // Simulate server latency with 2 second delay
        setTimeout(() => resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]), 2000);
    });*/
   // return of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000));
   // implemenation of restangular
   return  this.restangular.one('promotions', id).get();
    
  }

  getFeaturedPromotion(): Observable<Promotion> {    
 /*   return  new Promise(resolve=> {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(PROMOTIONS.filter((promo) => promo.featured)[0]), 2000);
    });*/
   // return of(PROMOTIONS.filter((promo) => promo.featured)[0]).pipe(delay(2000));
   // implementation of restangular
   return this.restangular.all('promotions').getList({featured: true})
   .pipe(map(promotions => promotions[0]));
  }

}
