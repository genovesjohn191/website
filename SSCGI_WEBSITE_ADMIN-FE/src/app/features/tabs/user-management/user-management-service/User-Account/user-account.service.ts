import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../../../../../environments/environments';
import { AuthService } from '../../../../auth/auth.service';
import { Observable, map, retry, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  private baseUserAccUrl = environment.apiUrl + "UserAccount/"
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.authService.getToken()}`
  });

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private authService: AuthService) { }
  getUserAccount(): Observable<any> {
    const url = this.baseUserAccUrl + "getUserAccList"
    return this.http.get(url, { headers: this.headers }).pipe(
      map(data => data),
      retry(3),
      catchError(this.handleError.bind(this))
    );
  }

  createUserAccount(form: any): Observable<any> {
    const url = this.baseUserAccUrl + "createUserAcc"
    return this.http.post(url, form, { headers: this.headers }).pipe(
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
