import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LivestreamRoutingModule } from './livestream-routing.module';
import { LivestreamComponent } from './livestream.component';
import { NgxAgoraModule } from 'ngx-agora';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    LivestreamComponent
  ],
  imports: [
    CommonModule,
    LivestreamRoutingModule,
    FormsModule,
    NgxAgoraModule.forRoot({AppID: environment.agora.appId})
  ]
})
export class LivestreamModule { }
