import { Component, Input } from '@angular/core';
import { CD } from '../models/cd.model';
import { CdsService } from '../services/cds.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cd',
  standalone: false,
  templateUrl: './cd.component.html',
  styleUrls: ['./cd.component.scss']
})
export class CDComponent {

  @Input() Cd!: CD;
  theCd!:CD;
  idCd!: string;

  constructor(private cdsService: CdsService, private route: ActivatedRoute){}

  ngOnInit(): void{
    this.idCd=this.route.snapshot.params['id'];
    if(this.idCd !== undefined){
      this.theCd=this.cdsService.getCDById(+this.idCd);
    }
    else{
      this.theCd=this.Cd;
    }
  }
  onAddCD() {
    this.theCd.quantite++;
  }

}
