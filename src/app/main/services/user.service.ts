import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { UserI } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  public getUserData(user: string): Observable<UserI> {
    return this.http.get<UserI>(`https://api.github.com/users/${user}`);
  }

  public getUserRepos(user: string): Observable<any[]> {
    return new Observable((subscriber: Subscriber<any[]>) => {
      this.getUserData(user).subscribe((data: UserI) => {
        const pages: number = Math.ceil(data.public_repos / 100);

        for (let i = 1; i <= pages; i++) {
          this.http
            .get(
              `https://api.github.com/users/${user}/repos?page=${i}&per_page=100`
            )
            .subscribe((data: any[]) => {
              subscriber.next(data);
            });
        }
      });
    });
  }
}
