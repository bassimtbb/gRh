import { Component, OnInit } from '@angular/core';
import { FormationDto } from '../../../../services/models';
import { FormationControllerService } from '../../../../services/services';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrl: './formation.component.scss'
})
export class FormationComponent implements OnInit {
  ngOnInit(): void {
    this.findformation() ;
  }

  formations:FormationDto[]=[];
  constructor(
   private  formationService:FormationControllerService
  ){}

  Eformation :FormationDto={
    dateD: '',
    dateF: '',
    description: '',
    duree: 0,
    img: '',
    lieu: '',
    titre:'',
    nbrPlace: 0
  }

  
  formationAdd: any;



  findformation() {
    this.formationService.findAll2() 
    .subscribe(formation => {
      this.formations=formation;
        console.log(this.formations)   
        setTimeout(() => {
          this.ngOnInit();     

        }, 50000); // 5 seconds
      }, error => {
        console.error('Error retrieving user information:', error);
      });
}

}