import { Component, Input, OnInit } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import { Pipe, PipeTransform } from '@angular/core';


@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.css']
})
export class RepositoriesComponent implements OnInit {

  @Input() repo:any;
  language :  Array<string> = new Array;
  couleurs :  Array<string> = new Array;
  nbCommits : any;
  date :any;
  description : any;
  namewithOwner : any;
  count = 0;

  constructor(private apollo:Apollo) {
    
   }

  ngOnInit(): void {

   this.getLanguages(this.repo.name)
  
  }

  
  getLanguages(nom : String){

    this.apollo.watchQuery
    ({
      query: gql`
      { 
        viewer { 
         
          repository(name: "${nom}"){
            id
            description
            nameWithOwner

            languages(first: 10) {
              nodes {
                id
                name
                color
              }
            }

            defaultBranchRef {
              target {
                ... on Commit {
                  id
                  history {
                    totalCount
                  }
                }
              }
            }
          }

          repositories(first: 100, affiliations: OWNER) {
            nodes {id
              updatedAt
            }
          }
          
        }
      }
      `,
    }).valueChanges.subscribe((result: any) => {
      
      this.description= result.data.viewer.repository.description
      this.namewithOwner=result.data.viewer.repository.nameWithOwner

      for (let element of result.data.viewer.repository.languages.nodes){
        this.language.push(element);
      }

      this.nbCommits = result.data.viewer.repository.defaultBranchRef.target.history.totalCount
      
      

    });
    
  }

}
