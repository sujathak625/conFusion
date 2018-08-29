import { Component, OnInit } from '@angular/core';
import { Dish } from '../shared/dish';
import { Promotion } from '../shared/promotion';
import { Leader } from '../shared/leader';

import { DishService } from '../services/dish.service';
import { PromotionService } from '../services/promtion.service';
import { LeaderService } from '../services/leader.service';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dish: Dish;
  promotion: Promotion;
  leader: Leader;
  dishErrMess:any
  promoErrMess:any
  leaderErrMess:any
  constructor(private dishservice: DishService,
    private promotionservice: PromotionService,
    private leaderService: LeaderService, @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    //  this.dishservice.getFeaturedDish().then(dish => this.dish = dish);
    // using server side implementation
  //  this.dishservice.getFeaturedDish().subscribe(dish => this.dish = dish);
    //  this.promotionservice.getFeaturedPromotion().then(promotion=>this.promotion=promotion);
   // this.promotionservice.getFeaturedPromotion().subscribe(promotion => this.promotion = promotion);
    //  this.leaderService.getFeaturedLeader().then(leader=>this.leader=leader);
   // this.leaderService.getFeaturedLeader().subscribe(leader => this.leader = leader);

 // using REST implementation
   this.dishservice.getFeaturedDish()
   .subscribe(dish => this.dish = dish,
     errmess => this.dishErrMess = <any>errmess.message);
 this.promotionservice.getFeaturedPromotion()
   .subscribe(promotion => this.promotion = promotion,
     errmess => this.promoErrMess = <any>errmess.message);
 this.leaderService.getFeaturedLeader()
   .subscribe(leader => this.leader = leader,
     errmess => this.leaderErrMess = <any>errmess.message);
  }
}
