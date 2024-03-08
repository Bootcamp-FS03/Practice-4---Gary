import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RootComponent } from './root/root.component';
import { FeedComponent } from './feed/feed.component';
import { getProfileResolver } from 'src/app/core/resolvers/get-profile-resolver';

const routes: Routes = [
  {
    path: '',
    component: RootComponent,
    resolve: [getProfileResolver],
    children: [
      {
        path: '',
        redirectTo: 'feed',
        pathMatch: 'full',
      },
      {
        path: 'feed',
        component: FeedComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RootRoutingModule {}
