import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageBuilderService {

  public pageBaseUrl = environment.apiUrl + "Page/"
  constructor(private http: HttpClient) { }


  getPages(): Observable<any> {
    let options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

    return this.http.get(this.pageBaseUrl + "getPages", options).pipe(
      map(data => data),
      retry(3),
      catchError(this.handleError)
    );
  }

  updatePageOrder(currentPageId: string, newOrder: any): Observable<any> {
    const options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    const body = { pageOrder: newOrder };

    return this.http.put(`${this.pageBaseUrl}updatePageOrder/${currentPageId}`, body, options).pipe(
      map(data => {
        return data;
      }),
      retry(3),
      catchError(error => {
        console.error('Error updating page order:', error);
        return throwError(this.handleError(error));
      })
    );
  }
  updatePage(currentPageId: string, updatedPage: any): Observable<any> {
    const options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

    return this.http.put(`${this.pageBaseUrl}updatePage/${currentPageId}`, updatedPage, options).pipe(
      map(response => {
        return response; // Optionally return the response if needed
      }),
      retry(3),
      catchError(error => {
        console.error('Error saving page:', error);
        return throwError(this.handleError(error)); // Handle error accordingly
      })
    );
  }

  createPage(newPage: any): Observable<any> {
    const options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

    return this.http.post(`${this.pageBaseUrl}createPages`, newPage, options).pipe(
      map((response: any) => {
        return response; // Optionally return the response if needed
      }),
      retry(3), // Retry the request up to 3 times on failure
      catchError(error => {
        console.error('Error adding page:', error); // Log the error
        return throwError(this.handleError(error)); // Handle error accordingly
      })
    );
  }

  updateStatus(currentPageId: string, newStatus: boolean): Observable<any> {
    const options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    const body = { isDisplay: newStatus };

    return this.http.put(`${this.pageBaseUrl}updateStatus/${currentPageId}`, body, options).pipe(
      map(() => {

      }),
      retry(3), // Retry the request up to 3 times on failure
      catchError(error => {
        console.error('Error updating page status:', error); // Log the error
        return throwError(this.handleError(error)); // Handle error accordingly
      })
    );
  }


  deletePage(pageId: string): Observable<any> {
    return this.http.delete(`${this.pageBaseUrl}deletePage/${pageId}`).pipe(
      map(() => {

      }),
      retry(3), // Retry the request up to 3 times on failure
      catchError(error => {
        console.error('Error occurred while deleting the page:', error); // Log the error

        return throwError(this.handleError(error)); // Handle error accordingly
      })
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

  getImages(): Observable<any> {
    let options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

    return this.http.get(this.pageBaseUrl + "images", options).pipe(
      map(data => data),
      retry(3),
      catchError(this.handleError)
    );
  }

 
  updateDataPrivacyPage(currentPageId: string, updatedPage: any): Observable<any> {
    const options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };


    return this.http.put(`${this.pageBaseUrl}updateDataPrivacyPage/${currentPageId}`, updatedPage, options).pipe(
      map(() => {


      }),
      retry(3), // Retry the request up to 3 times on failure
      catchError(error => {
        console.error('Error saving page:', error); // Log the error
        return throwError(this.handleError(error)); // Handle error accordingly
      })
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
