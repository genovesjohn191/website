import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environments';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../../auth/auth.service';
import { map, retry, catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private basePeopleUrl = environment.apiUrl + "People/"
  public personId: any;


  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.authService.getToken()}`
  });

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private authService: AuthService) { }

  getPeopleById(personId: string) {
    const url = this.basePeopleUrl + "getPersonById";
    const params = new HttpParams().set('personId', personId);
    return this.http.get<any>(url, { headers: this.headers, params: params })
      .pipe(
        map(data => data),
        retry(3),
        catchError(this.handleError)
      );
  }

  updatePeople(form: any) {
    const url = this.basePeopleUrl + "updatePerson"
    return this.http.put<any>(`${url}/${this.personId}`, form, { headers: this.headers }).
      pipe(
        map(data => data),
        retry(3),
        catchError(this.handleError)
      )

  }

  createPeople(form: any): Observable<any> {
    const url = this.basePeopleUrl + "createPeople"
    return this.http.post(url, form, { headers: this.headers }).pipe(
      map(data => data),
      retry(3),
      catchError(this.handleError.bind(this))
    );
  }


  getPeople(): Observable<any> {
    const url = this.basePeopleUrl + "getPeopleList"
    return this.http.get(url, { headers: this.headers }).pipe(
      map(data => data),
      retry(3),
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
