import { RepositoryI } from '../models/repository.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, Subject } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { UserI } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  // Global repos
  public repos: Subject<RepositoryI[]> = new Subject();

  public getUserData(user: string): Observable<UserI> {
    return this.http.get<UserI>(`https://api.github.com/users/${user}`);
  }

  public getUserRepos(user: string): Observable<RepositoryI[]> {
    // will return one observable that contains all the repos after concating them to each other:
    return this.getUserData(user).pipe(
      switchMap((data: UserI) => {
        //public_repos is the amt of repos the user has
        const pages: number = Math.ceil(data.public_repos / 100);

        // forkJoin will emit the result as (RepositoryI[][]) once all the sub-observables are completed:
        return forkJoin(
          Array.from(new Array(pages)).map((_, page: number) =>
            this.http.get<RepositoryI[]>(
              `https://api.github.com/users/${user}/repos?page=${
                page + 1
              }&per_page=100`
            )
          )
        ).pipe(
          // will reduce the RepositoryI[][] to be RepositoryI[] after concating them to each other:
          map((res: RepositoryI[][]) =>
            res.reduce((acc: RepositoryI[], value: RepositoryI[]) => {
              return acc.concat(value);
            }, [])
          )
        );
      })
    );
  }
}
