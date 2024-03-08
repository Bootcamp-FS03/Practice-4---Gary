import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { ProfileService } from 'src/app/core/services/profile.service';
import { Profile } from '../models/profile.model';

export const getProfileResolver: ResolveFn<Observable<Profile>> = () => {
  const profileService = inject(ProfileService);
  return profileService.getProfile();
};
