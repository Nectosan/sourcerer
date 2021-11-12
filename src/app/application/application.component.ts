import { Component, OnInit, ViewChild } from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import { ChartComponent } from "ng-apexcharts";
import {ApexNonAxisChartSeries, ApexResponsive, ApexChart} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit {
  @ViewChild("chart") chart: any;
  
  name : string="";
  login : string="";
  followers : any;
  following : any;
  repo : any;
  avatarUrl : any;
  repoName : any;
  primaryLanguage: any;
  stringbuilder : string="";
  repoAccessible : Array<string> = new Array;
  language : Array<string> = new Array;
  chartOptions: any;
  size :  Array<string> = new Array;
  languagesChart :  Array<string> = new Array;
  commits: Array<string> = new Array;
  nbtotalCommits: any;
  location : any;

  constructor(private apollo:Apollo) { }

  ngOnInit() {
    this.apollo
    .watchQuery({
      query: gql`
      { 
        viewer { 
          id
          login
          name
          location
          followers(first:0) {
            totalCount
           }
          following(first:0) {
            totalCount
           }
          repositories(first:100, affiliations: OWNER){
            totalCount
            nodes {
              nameWithOwner
            }
            
            nodes {
              defaultBranchRef {
                target {
                  ... on Commit {
                    history(first: 100) {
                      totalCount
                    }
                  }
                }
              }
            }

            nodes {
              languages(first: 10) {
                nodes {
                  name
                  
                }

                edges {
                  size
                  node{
                    name
                  }
                }
              }
            }
          }
          avatarUrl
          
         
        }
        repository(owner:"Nectosan", name:"hi-python") {
          object(expression:"master") {
            repository {
              name
            }
           
          }
        }

        
      }
      `,
    })
    .valueChanges.subscribe((result: any) => {
      this.name= result.data.viewer.name;
      this.login=result.data.viewer.login;
      this.followers=result.data.viewer.followers.totalCount;
      this.following=result.data.viewer.following.totalCount;
      this.repo=result.data.viewer.repositories.totalCount;
      this.avatarUrl=result.data.viewer.avatarUrl;
      this.repoName=result.data.repository.object.repository.name;
      this.location=result.data.viewer.location
     


      for(let i=0; i< Object.keys(result.data.viewer["repositories"]["nodes"]).length; i++) {
        this.commits.push(result.data.viewer["repositories"]["nodes"][i]["defaultBranchRef"]["target"]["history"]["totalCount"])
      } 
      this.nbtotalCommits = eval(this.commits.join("+"))

      for (let element of result.data.viewer.repositories.nodes){
          this.repoAccessible.push(element.nameWithOwner);
      }

      for (let element of result.data.viewer.repositories.nodes){
       
        this.size.push(element.languages.edges[0].size);
        this.languagesChart.push(element.languages.edges[0].node.name);
    }

    this.chartOptions = {
      series: this.size,
      chart: {
        width: 380,
        type: "pie"
      },
      labels:  this.languagesChart,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
    });

    

  }

  getName(){
    return this.name;
  }

  getLogin(){
    return this.login;
  }

  getFollowers(){
    return this.followers;
  }

  getFollowing(){
    return this.following
  }

  getRepo(){
    return this.repo
  }

  getAvatarUrl(){
    return this.avatarUrl
  }

  
  getRepoName(){
    return this.repoName
  }

  getPrimaryLanguages(){
    return this.primaryLanguage;
  }

  getLanguages(){
    return this.language;
  }

  getAllRepos(){
    return this.repoAccessible;
  }

  

}
