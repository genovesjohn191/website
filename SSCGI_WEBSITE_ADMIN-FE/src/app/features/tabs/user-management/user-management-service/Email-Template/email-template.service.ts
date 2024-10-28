import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environments';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, retry, catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../../../../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class EmailTemplateService {
  public emailTemplateId: any;
  private baseEmailTemplateUrl = environment.apiUrl + "EmailTemplate/"
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.authService.getToken()}`
  });


  constructor( private http: HttpClient, private authService: AuthService, private snackBar: MatSnackBar) { }

  getDeletedETemplate() :Observable<any> {
    const url = this.baseEmailTemplateUrl + "getDeletedTemplateList"
    return this.http.get(url, { headers: this.headers}).pipe(
      map(data => data),
      retry(3),
      catchError(this.handleError.bind(this))
    );
  }
  
  updateEmailTemplate(form: any) {
    const url = this.baseEmailTemplateUrl + "updateEmailTemplate"
    return this.http.put<any>(`${url}/${this.emailTemplateId}`, form, { headers: this.headers }).pipe(
      map(data => data),
      retry(3),
      catchError(this.handleError.bind(this))
    );
  }


  getEmailTemplate(): Observable<any> {
    const url = this.baseEmailTemplateUrl + "getEmailTemplateList"
    return this.http.get(url, { headers: this.headers}).pipe(
      map(data => data),
      retry(3),
      catchError(this.handleError.bind(this))
    );
  }

  deleteEmailTemp(emailTemplateId: string,userId:string){
    console.log("DeleteemailTemplateId",emailTemplateId); 
    const url = `${this.baseEmailTemplateUrl}deleteEmailTemplate/${emailTemplateId}`;
    const params = new HttpParams()
    .set('emailTemplateId',emailTemplateId);
    return this.http.put(url, {}, {headers: this.headers, params:params }).pipe(
      retry(3),
      catchError(this.handleError.bind(this))
    )   
  }

  restoreEmailTemplate(emailTemplateId: string,userId: string) {
    const url = `${this.baseEmailTemplateUrl}restoreEmailTemplate/${emailTemplateId}`;
    const params = new HttpParams()
    .set('emailTemplateId', emailTemplateId);
    return this.http.put(url, {}, { headers: this.headers, params: params }).pipe(
      retry(3), // Retry the request up to 3 times in case of failure
      catchError(this.handleError.bind(this)) // Handle errors
    );
  }

  getCategory(): Observable<any> {
    const url = this.baseEmailTemplateUrl +"getCategory"
    return this.http.get(url, { headers: this.headers }).pipe(
      map(data => data),
      retry(3),
      catchError(this.handleError.bind(this))
    );
  }

  createEmailTemplate(form: any): Observable<any> {
    console.log("CreateForm2",form);
    const url = this.baseEmailTemplateUrl + "createEmailTemplate"
    console.log("URL",url);
    return this.http.post(url, form, { headers: this.headers }).pipe(
      map(data => data),
      retry(3),
      catchError(this.handleError.bind(this))
    );
  }

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
