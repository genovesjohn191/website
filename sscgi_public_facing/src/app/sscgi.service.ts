import { Injectable } from '@angular/core';
import { environment } from '../environments/environments';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SscgiService {

  private getLandingPageStylesUrl = environment.apiUrl + "LandingPageStyles/getLandingPageStyles";
  private pageBaseUrl =  environment.apiUrl + "Page/"
  private careerBaseUrl =  environment.apiUrl + "Career/"
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${this.authService.getToken()}`
  });

  public personalInfo:any;
  constructor(private http: HttpClient) { }


  apply(form: any): Observable<any> {
    let options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

    return this.http.post(this.careerBaseUrl + "applicant/save", form, options).pipe(
      map(data => data),
      retry(3),
      catchError(this.handleError.bind(this))
    );
  }


  getPages(): Observable<any> {
    let options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

    return this.http.get(this.pageBaseUrl + "getPages", options).pipe(
      map(data => data),
      retry(3),
      catchError(this.handleError)
    );
  }

  getDataPrivacyPage(): Observable<any> {
    let options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

    return this.http.get(this.pageBaseUrl + "getDataPrivacyPage", options).pipe(
      map(data => data),
      retry(3),
      catchError(this.handleError)
    );
  }

  getData(): Observable<any> {
    let options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

    return this.http.get(this.getLandingPageStylesUrl, options).pipe(
      map(data => data),
      retry(3),
      catchError(this.handleError)
    );
  }

  getCareer(): Observable<any> {
    const url = this.careerBaseUrl +"getCareerList"
    return this.http.get(url, { headers: this.headers }).pipe(
      map(data => data),
      retry(3),
      catchError(this.handleError.bind(this))
    );
  }


  getCareerById(careerId:any): Observable<any> {
    const url = this.careerBaseUrl + "getCareerById"+ "?careerId=" + careerId
    return this.http.get(url, { headers: this.headers,  }).pipe(
      map(data => data),
      catchError(this.handleError.bind(this))
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
