import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-langages',
  templateUrl: './langages.component.html',
  styleUrls: ['./langages.component.css']
})
export class LangagesComponent implements OnInit {
  @Input() nomLangages: any;
  @Input() couleurs : any;

  constructor() { }

  ngOnInit(): void {
  }

}
