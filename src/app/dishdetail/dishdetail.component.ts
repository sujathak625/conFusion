import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
  dishcopy = null;
  dish: Dish;
  dishIds: number[];
  prev: number;
  next: number;
  comment: Comment;
  dishErrMess: string;
  errMess:string;
  @ViewChild('cform') commentFormDirective;
  commentForm: FormGroup;

  formErrors = {
    'rating': '',
    'comment': ''
  };

  validationMessages = {
    'author': {
      'required': 'Name is required.',
      'minlength': 'Name must be at least 2 characters long.',
      'maxlength': 'Name cannot be more than 25 characters long.'
    },
    'comment': {
      'required': 'Comment is required.'
    },
  };


  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,@Inject('BaseURL')private BaseURL) { }

  ngOnInit() {
    //  const id = +this.route.snapshot.params['id'];
    // this.dishservice.getDish(id).then(dish => this.dish = dish);
    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
  //  this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(+params['id'])))
   //   .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); },dishErrMess => this.dishErrMess = <any>dishErrMess);
   this.route.params.pipe(
   switchMap((params: Params) => { return this.dishservice.getDish(+params['id']); }))
   .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); },
       errmess => { this.dish = null; this.errMess = <any>errmess; });
   this.createForm();

  }

  goBack(): void {
    this.location.back();
  }

  setPrevNext(dishId: number) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  createForm() {
    this.commentForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      rating: 5,
      comment: ['', [Validators.required]],
      date: ''
    });
    this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    console.log(this.comment);
    this.commentForm.reset({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
      rating: 5,
      comment: ['', [Validators.required]],
      date: ''
    });
    this.addToComments(this.comment);
    this.commentFormDirective.resetForm();
  }

  addToComments(comment:Comment) {
    this.comment.date =  new Date().toISOString();
   // this.dish.comments.push(this.comment);
   this.dishcopy.comments.push(this.comment);
   this.dishcopy.save()
     .subscribe(dish => { this.dish = dish; console.log(this.dish); });

  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
}
