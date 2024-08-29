import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoleData } from '../../../shared/interfaces/role-model';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  private createRoleUrl = environment.apiUrl + "Role/createRole";
  private getRoleUrl = environment.apiUrl + "Role/getRoleList"

  private getPeopleUrl = environment.apiUrl + "People/getPeopleList";
  private createPeopleUrl = environment.apiUrl + "People/createPeople";

  private createUserAccUrl = environment.apiUrl + "UserAccount/createUserAcc"
  private getUserAccUrl = environment.apiUrl + "UserAccount/getUserAccList"

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  getUserAccount(): Observable<any> {
    let options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

    return this.http.get(this.getUserAccUrl, options).pipe(
      map(data => data),
      retry(3),
      catchError(this.handleError.bind(this))
    );
  }


  createUserAccount(form: any): Observable<any> {
    let options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

    return this.http.post(this.createUserAccUrl, form, options).pipe(
      map(data => data),
      retry(3),
      catchError(this.handleError.bind(this))
    );
  }


  createPeople(form: any): Observable<any> {
    let options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

    return this.http.post(this.createPeopleUrl, form, options).pipe(
      map(data => data),
      retry(3),
      catchError(this.handleError.bind(this))
    );
  }


  getPeople(): Observable<any> {
    let options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

    return this.http.get(this.getPeopleUrl, options).pipe(
      map(data => data),
      retry(3),
      catchError(this.handleError.bind(this))
    );
  }

  createRole(form: any): Observable<any> {
    let options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

    return this.http.post(this.createRoleUrl, form, options).pipe(
      map(data => data),
      retry(3),
      catchError(this.handleError.bind(this))
    );
  }


  getRole(): Observable<any> {
    let options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

    return this.http.get(this.getRoleUrl, options).pipe(
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
