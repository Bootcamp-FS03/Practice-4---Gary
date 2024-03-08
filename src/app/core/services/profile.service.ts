import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Profile } from '../models/profile.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private readonly BASE_URL = environment.baseUrl;
  private readonly PROFILE_URL = environment.api.profile;

  private _profile$ = new BehaviorSubject<Profile | null>(null);

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.isLoggedIn$.subscribe(() => {
      this.setProfile(null);
    });
  }

  getProfile(useCache: boolean = true): Observable<Profile> {
    if (useCache && this.profile) return this.profile$ as Observable<Profile>;

    return this.http.get<Profile>(`${this.BASE_URL}${this.PROFILE_URL}`).pipe(
      tap((profile) => {
        if (!this.profile) {
          this.setProfile(profile);
        }
      }),
    );
  }

  get profile$() {
    return this._profile$.asObservable();
  }

  setProfile(profile: Profile | null) {
    this._profile$.next(profile);
  }

  get profile() {
    return this._profile$.value;
  }
}
