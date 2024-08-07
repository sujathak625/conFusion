import { Injectable } from '@angular/core';
import { Observable,of,throwError } from 'rxjs';
import {Http,Response} from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProcessHTTPMsgService {

  constructor() { }

  public extractData(res:Response) {
    let body=res.json();
    return body ||  {};
  }

  public handleError(error: HttpErrorResponse | any) {
    let errMsg: string;

    if (error.error instanceof ErrorEvent) {
      errMsg = error.error.message;
    } else {
      errMsg = `${error.status} - ${error.statusText || ''} ${error.error}`;
    }

    return throwError(errMsg);
  }
}
