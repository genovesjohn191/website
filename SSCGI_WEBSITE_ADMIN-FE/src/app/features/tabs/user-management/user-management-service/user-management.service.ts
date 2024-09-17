import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environments';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, from, map, Observable, retry, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoleData } from '../../../../shared/interfaces/role-model';
import { AuthService } from '../../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  public personId: any;

  // role
  private baseRoleUrl = environment.apiUrl + "Role/"

  // people
  private basePeopleUrl = environment.apiUrl + "People/"
  // useracc
  private baseUserAccUrl = environment.apiUrl + "UserAccount/"

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.authService.getToken()}`
  });

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private authService: AuthService) { }



  // useracc
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


  // people
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

  // role
  createRole(form: any): Observable<any> {
    const url = this.baseRoleUrl + "createRole"
    return this.http.post(url, form, { headers: this.headers }).pipe(
      map(data => data),
      retry(3),
      catchError(this.handleError.bind(this))
    );
  }

  updateRole(form: any): Observable<any> {
    const url = this.baseRoleUrl + "editRole"
    console.log(form)
    return this.http.put(url, form, { headers: this.headers }).pipe(
      map(data => data),
      retry(3),
      catchError(this.handleError.bind(this))
    );
  }

  getRole(): Observable<any> {
    const url = this.baseRoleUrl +"getRoleList"
    return this.http.get(url, { headers: this.headers }).pipe(
      map(data => data),
      retry(3),
      catchError(this.handleError.bind(this))
    );
  }

  getRoleById(roleId: string) {
    const url = this.baseRoleUrl + "getRoleById"
    const params = new HttpParams().set('roleId', roleId);

    return this.http.get<any>(url, { headers: this.headers, params: params })
      .pipe(
        map(data => data),
        retry(3),
        catchError(this.handleError)
      );
  }

  getRolePolicyById(roleId: string) {
    const url = this.baseRoleUrl + "getRolePolicyById";
    const params = new HttpParams().set('roleId', roleId);

    return this.http.get<any>(url, { headers: this.headers, params: params })
      .pipe(
        map(data => data),
        retry(3),
        catchError(this.handleError)
      );
  }
  getRolePolicyControlById(rolePolicyId: string) {
    const url = this.baseRoleUrl +"getRolePolicyControlById"
    const params = new HttpParams().set('roleId', rolePolicyId);

    return this.http.get<any>(url, { headers: this.headers, params: params })
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
