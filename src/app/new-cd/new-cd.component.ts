import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CD } from '../models/cd.model';
import { CdsService } from '../services/cds.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-cd',
  standalone: false,
  templateUrl: './new-cd.component.html',
  styleUrl: './new-cd.component.scss'
})
export class NewCDComponent implements OnInit{

  formulaire!: FormGroup;
  currentCD!: CD;
  imageRegEx?: RegExp;


  constructor(private formBuilder: FormBuilder, private cdServ: CdsService, private router: Router){}

  ngOnInit(): void{
    this.imageRegEx = new RegExp("https?:\/\/.*\.$")

    this.formulaire=this.formBuilder.group({
      title: [null,[Validators.required, Validators.minLength(1)]],
      author: [null,[Validators.required, Validators.minLength(6)]],
      thumbnail: [null,[Validators.required, Validators.pattern(this.imageRegEx)]],
      dateDeSortie: [null,[Validators.required, Validators.min(0)]],
      quantite: [null,[Validators.required, Validators.min(0)]],
      price: [null,[Validators.required, Validators.min(0)]]
    })
    this.formulaire.valueChanges.subscribe((formValue) =>{
      this.currentCD={
        id: 0,
        title: formValue.title,
        author: formValue.author,
        thumbnail: formValue.thumbnail,
        dateDeSortie: formValue.dateDeSortie,
        quantite: formValue.quantite,
        price: formValue.price,
        onsale: false
      };
    });
  }

  onSubmit(){
    let newCd : CD = {
    id : 0,
    title : this.formulaire.get('title')?.value,
    author : this.formulaire.get('author')?.value,
    thumbnail: this.formulaire.get('thumbnail')?.value,
    dateDeSortie: this.formulaire.get('dateDeSortie')?.value,
    quantite: this.formulaire.get('quantite')?.value,
    price: this.formulaire.get('price')?.value,
    onsale : false
  }

  this.cdServ.addCD(newCd).subscribe({
    next : cd =>
      {
        this.router.navigateByUrl('/catalog')
      },
      error : err =>
        {
          console.error('Observable ajout CD a emis erreur : '+err);
          alert("Dsl Cd pas ajouté");
        }
  })
  }

}
