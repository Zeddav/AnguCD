import { Component, OnInit,HostListener  } from '@angular/core';
import { CD } from '../models/cd.model';
import { CdsService } from '../services/cds.service';


@Component({
  selector: 'app-list-cd',
  standalone: false,
  templateUrl: './list-cd.component.html',
  styleUrl: './list-cd.component.scss'
})
export class ListCDComponent implements OnInit {
  listcd!: CD[];
  columns: number = 3;

  constructor(private myCDsService: CdsService){}
  ngOnInit(): void {
    this.myCDsService.getCDs().subscribe((cds)=>{this.listcd=cds});
    this.setColumns()
  }
  setColumns() {
    if (window.innerWidth <= 600) {
      this.columns = 1; // 1 colonne pour téléphone
    } else if (window.innerWidth <= 960) {
      this.columns = 2; // 2 colonnes pour tablette
    } else {
      this.columns = 3; // 3 colonnes pour PC
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.setColumns(); 
  }

}
