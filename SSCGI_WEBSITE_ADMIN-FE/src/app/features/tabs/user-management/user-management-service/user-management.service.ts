import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environments';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoleData } from '../../../../shared/interfaces/role-model';
import { AuthService } from '../../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  public personId: any;

  // role
  private createRoleUrl = environment.apiUrl + "Role/createRole";
  private getRoleUrl = environment.apiUrl + "Role/getRoleList"
  private getRoleByIdUrl = environment.apiUrl + "Role/getRoleListById"
  private getRolePolicyByIdUrl = environment.apiUrl + "Role/getRolePolicyById"
  private getRolePolicyControlByIdUrl = environment.apiUrl + "Role/getRolePolicyControlById"

  // people
  private getPeopleUrl = environment.apiUrl + "People/getPeopleList";
  private createPeopleUrl = environment.apiUrl + "People/createPeople";
  private updatePeopleUrl = environment.apiUrl + "People/updatePerson"
  private getByIdPeopleUrl = environment.apiUrl + "People/getPersonById"

  // useracc
  private createUserAccUrl = environment.apiUrl + "UserAccount/createUserAcc"
  private getUserAccUrl = environment.apiUrl + "UserAccount/getUserAccList"

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private authService: AuthService) { }


  // useracc
  getUserAccount(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.get(this.getUserAccUrl, { headers: headers }).pipe(
      map(data => data),
      retry(3),
      catchError(this.handleError.bind(this))
    );
  }

  createUserAccount(form: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.post(this.createUserAccUrl, form, { headers: headers }).pipe(
      map(data => data),
      retry(3),
      catchError(this.handleError.bind(this))
    );
  }


  // people
  getPeopleById(personId: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    const params = new HttpParams().set('personId', personId);

    return this.http.get<any>(this.getByIdPeopleUrl, { headers: headers, params: params })
      .pipe(
        map(data => data),
        retry(3),
        catchError(this.handleError)
      );
  }

  updatePeople(form: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    // this.personId = localStorage.getItem("personId")
    return this.http.put<any>(`${this.updatePeopleUrl}/${this.personId}`, form, { headers: headers }).
      pipe(
        map(data => data),
        retry(3),
        catchError(this.handleError)
      )

  }

  createPeople(form: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.post(this.createPeopleUrl, form, { headers: headers }).pipe(
      map(data => data),
      retry(3),
      catchError(this.handleError.bind(this))
    );
  }


  getPeople(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.get(this.getPeopleUrl, { headers: headers }).pipe(
      map(data => data),
      retry(3),
      catchError(this.handleError.bind(this))
    );
  }

  // role
  createRole(form: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.post(this.createRoleUrl, form, { headers: headers }).pipe(
      map(data => data),
      retry(3),
      catchError(this.handleError.bind(this))
    );
  }


  getRole(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get(this.getRoleUrl, { headers: headers }).pipe(
      map(data => data),
      retry(3),
      catchError(this.handleError.bind(this))
    );
  }

  getRoleById(roleId: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    const params = new HttpParams().set('roleId', roleId);

    return this.http.get<any>(this.getRoleByIdUrl, { headers: headers, params: params })
      .pipe(
        map(data => data),
        retry(3),
        catchError(this.handleError)
      );
  }


  getRolePolicyById(roleId: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    const params = new HttpParams().set('roleId', roleId);

    return this.http.get<any>(this.getRolePolicyByIdUrl, { headers: headers, params: params })
      .pipe(
        map(data => data),
        retry(3),
        catchError(this.handleError)
      );
  }

  getRolePolicyControlById(rolePolicyId: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    const params = new HttpParams().set('roleId', rolePolicyId);

    return this.http.get<any>(this.getRolePolicyControlByIdUrl, { headers: headers, params: params })
      .pipe(
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
