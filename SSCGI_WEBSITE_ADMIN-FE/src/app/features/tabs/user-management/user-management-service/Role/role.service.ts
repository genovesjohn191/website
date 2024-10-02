import { Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environments';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from '../../../../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private baseRoleUrl = environment.apiUrl + "Role/"
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.authService.getToken()}`
  });

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private authService: AuthService) { }
// role
createRole(form: any, userId: number): Observable<any> {
  const url = this.baseRoleUrl + "createRole"
  const params = new HttpParams()
  .set('userId', userId)
  return this.http.post(url, form, { headers: this.headers, params: params }).pipe(
    map(data => data),
    retry(3),
    catchError(this.handleError.bind(this))
  );
}

updateRole(form: any): Observable<any> {
  const url = this.baseRoleUrl + "editRole"
  console.log(form)
  return this.http.put(url, form, { headers: this.headers,  }).pipe(
    map(data => data),
    retry(3),
    catchError(this.handleError.bind(this))
  );
}

deleteRole(roleId:any, userId: number){
  const url = this.baseRoleUrl + "deleteRole/"+ roleId
  const params = new HttpParams()
  .set('userId', userId)
  return this.http.delete(url, { headers: this.headers, params: params }).pipe(
    map(data => data),
    retry(3),
    catchError(this.handleError.bind(this))
  );
}

restoreRole(roleId:any, userId: number){
  const url = this.baseRoleUrl + "restoreRole/"+ roleId
  const params = new HttpParams()
  .set('userId', userId)
  return this.http.put(url,{},{ headers: this.headers , params: params}).pipe(
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

getDeletedRole(): Observable<any> {
  const url = this.baseRoleUrl +"getAllDeletedRole"
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
