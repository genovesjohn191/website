import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { environment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private baseCareerUrl = environment.apiUrl + "Career/"
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${this.authService.getToken()}`
  });

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  getApplicant(): Observable<any> {
    const url = this.baseCareerUrl +"get/applicants"
    return this.http.get(url, { headers: this.headers }).pipe(
      map(data => data),
      retry(3),
      catchError(this.handleError.bind(this))
    );
  }


  getCareer(): Observable<any> {
    const url = this.baseCareerUrl +"getCareerList"
    return this.http.get(url, { headers: this.headers }).pipe(
      map(data => data),
      retry(3),
      catchError(this.handleError.bind(this))
    );
  }

  getCareerInActive(): Observable<any> {
    const url = this.baseCareerUrl +"getCareerInActiveList"
    return this.http.get(url, { headers: this.headers }).pipe(
      map(data => data),
      retry(3),
      catchError(this.handleError.bind(this))
    );
  }

  createCareer(form: any): Observable<any> {
    const url = this.baseCareerUrl + "createCareer"
    return this.http.post(url, form, { headers: this.headers}).pipe(
      map(data => data),
      retry(3),
      catchError(this.handleError.bind(this))
    );
  }

  deleteCareer(careerId:any, deletedBy:any){
    const url = this.baseCareerUrl + "deleteCareer/"+ careerId
    const params = new HttpParams()
      .set('deletedBy', deletedBy)
    return this.http.delete(url, { headers: this.headers,params: params }).pipe(
      map(data => data),
      retry(3),
      catchError(this.handleError.bind(this))
    );
  }

  restoreCareer(careerId:any, restoreBy:any){
    const url = this.baseCareerUrl + "restoreCareer/"+ careerId
    const params = new HttpParams()
      .set('restoredBy', restoreBy)
    return this.http.put(url, { headers: this.headers,params: params }).pipe(
      map(data => data),
      retry(3),
      catchError(this.handleError.bind(this))
    );
  }

  updateCareer(form:any, careerId:any): Observable<any> {
    const url = this.baseCareerUrl + "updateCareer/"+ careerId
    return this.http.put(url, form, { headers: this.headers,  }).pipe(
      map(data => data),
      catchError(this.handleError.bind(this))
    );
  }

  //function for handling errors
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occured: ', error.error.message);
    } else {
      this.showSnackBar("Internal Server Error");

      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      )

    }
    return throwError('Something bad happened, please try again later');
  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}
