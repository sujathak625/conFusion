import { Injectable } from '@angular/core';

import { Dish } from '../shared/dish';
//import { DISHES } from '../shared/dishes';


import { Observable, of } from 'rxjs';

import { delay } from 'rxjs/operators';

import { Http, Response } from '@angular/http';

import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { map,catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Restangular } from 'ngx-restangular';
@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(private http: HttpClient, 
    private processHTTPMsgService: ProcessHTTPMsgService,@Inject('BaseURL')private BaseURL,
    private restangular: Restangular) { }

  getDishes(): Observable<Dish[]> {
    //the below is client side retrieval. This is commented to implement server side fetch
    // return of(DISHES).pipe(delay(2000));
    //server side fetch implmentation
    // return this.http.get(baseURL+'dishes').map(res => {return this.processHTTPMsgService.extractData(res)});;
  //  return this.http.get<Dish[]>(baseURL + 'dishes');
  // implementing below with error handling
 // return this.http.get<Dish[]>(baseURL + 'dishes').pipe(catchError(this.processHTTPMsgService.handleError));
// REST implementation
return this.restangular.all('dishes').getList();
}

  getDish(id: number): Observable<Dish> {
    /*  return new Promise(resolve=> {
        // Simulate server latency with 2 second delay
          setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]), 2000);
      });*/
    //the below is client side retrieval. This is commented to implement server side fetch
    // return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
    // server side implementation
   // return this.http.get<Dish>(baseURL + 'dishes/' + id);
   // with error handling
  // return this.http.get<Dish>(baseURL + 'dishes/' + id)
  // .pipe(catchError(this.processHTTPMsgService.handleError));
  // using REST implementation
  return  this.restangular.one('dishes', id).get();
}

  getFeaturedDish(): Observable<Dish> {
    /* return  new Promise(resolve=> {
      // Simulate server latency with 2 second delay
        setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000);
    });*/
  //  return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
  //return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]));
  // with error handling
  //return this.http.get<Dish[]>(baseURL + 'dishes?featured=true').pipe(map(dishes => dishes[0]))
 // .pipe(catchError(this.processHTTPMsgService.handleError));
 // using REST implementation
 return this.restangular.all('dishes').getList({featured: true})
      .pipe(map(dishes => dishes[0]));

  }

  getDishIds(): Observable<number[] | any> {
    //the below is client side retrieval. This is commented to implement server side fetch
    // return of(DISHES.map(dish => dish.id));
    // server side implementation
   // return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)));
  // return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)));
  // with error handling
 // return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
 // .pipe(catchError(error => error));
 // using REST implementation
 return this.getDishes()
 .pipe(map(dishes => dishes.map(dish => dish.id)),
   catchError(error => error ));
  }

}
