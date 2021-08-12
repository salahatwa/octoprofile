import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserI } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public getUserData(user: string): Observable<UserI> {
    return this.http.get<UserI>(`https://api.github.com/users/${user}`);
  }
}
