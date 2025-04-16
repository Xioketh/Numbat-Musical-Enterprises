import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError, throwError } from "rxjs";
import { AuthService } from "../Services/AuthService";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userAuthService: AuthService,
    private router:Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.headers.get('No-Auth') === 'True') {
      return next.handle(req.clone());
    }

    const token = this.userAuthService.getToken();
    const tokenValue = token || 'defaultToken';
    req = this.addToken(req, tokenValue);

    return next.handle(req).pipe(
        catchError(
            (err:HttpErrorResponse) => {
                console.log(err.status);
                if(err.status === 401) {
                    this.router.navigate(['/login']);
                } else if(err.status === 403) {
                  console.log('foribidden!!!!!!!!!!!')
                    this.router.navigate(['/forbidden']);
                }
                return throwError("Some thing is wrong");
            }
        )
    );
  }


  private addToken(request:HttpRequest<any>, token:string) {
    console.log(token)
      return request.clone(
          {
              setHeaders: {
                  Authorization : `Bearer ${token}`
              }
          }
      );
  }
}