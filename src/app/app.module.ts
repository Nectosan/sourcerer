import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApplicationComponent } from './application/application.component';
import { HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import {InMemoryCache} from '@apollo/client/core';
import { environment } from '../environments/environment';
import { NgApexchartsModule } from "ng-apexcharts";
import { RepositoriesComponent } from './repositories/repositories.component';
import { LangagesComponent } from './langages/langages.component';


const token = environment.token;
const uri = environment.uri;

@NgModule({
  declarations: [
    AppComponent,
    ApplicationComponent,
    RepositoriesComponent,
    LangagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgApexchartsModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        const cache = new InMemoryCache();
        return {
          link: httpLink.create({
            uri: "https://api.github.com/graphql",
            headers:new HttpHeaders().set('Authorization',`Bearer ${token}` )
          }),
          cache
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
