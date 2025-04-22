import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AuthService} from "./AuthService";

@Injectable({
  providedIn: 'root'
})


export class usersService {

  requestHeader = new HttpHeaders({'No-Auth': 'True'});
  d: any

  constructor(private httpClient: HttpClient, private userAuthService: AuthService) {
  }


  public roleMatch(allowedRoles: string | any[]): boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          }
        }
      }
    }

    return isMatch;
  }

  login(data: any): Observable<Object> {
    return this.httpClient.post(`http://localhost:8085/authenticate`, data, {headers: this.requestHeader,});
  }

  registerUser(data: any): Observable<Object> {
    console.log(data)
    return this.httpClient.post(`http://localhost:8085/registerNewUser`, data, {headers: this.requestHeader,});
  }

  getAllUsers(): Observable<Object> {
    return this.httpClient.post(`http://localhost:8085/getAllUsers`, null);
  }

  getByUserId(): Observable<any> {
    const paylord={
      userId:localStorage.getItem('userID')
    }
    return this.httpClient.post(`http://localhost:8085/getByUserId`, paylord);
  }



}
