import { Component } from '@angular/core';
import {Apollo,gql} from 'apollo-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My app';
  repoAccessible : Array<any> = new Array;
  listDate: Array<string> = new Array;


  constructor(private apollo:Apollo) { 
    this.apollo
    .watchQuery({
      query: gql`
      { 
        viewer { 
         
          repositories(first:100, affiliations: OWNER){
            edges {
              node {
                updatedAt
                id
                name
              }
            }
          }

        }
      }
      `,
    })
    .valueChanges.subscribe((result: any) => {
      
      for (let i = 0; i <result.data.viewer.repositories.edges.length; i++) {
        this.repoAccessible.push(result.data.viewer.repositories.edges[i].node);

      }


    });
  }

  
  
}
