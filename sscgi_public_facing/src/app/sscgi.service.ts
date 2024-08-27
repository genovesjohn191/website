import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SscgiService {

  private getLandingPageStylesUrl = environment.apiUrl + "LandingPageStyles/getLandingPageStyles";
  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    let options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

    return this.http.get(this.getLandingPageStylesUrl, options).pipe(
      map(data => data),
      retry(3),
      catchError(this.handleError)
    );
  }



  //function for handling errors
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occured: ', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      )
    }
    return throwError('Something bad happened, please try again later');
  }
}