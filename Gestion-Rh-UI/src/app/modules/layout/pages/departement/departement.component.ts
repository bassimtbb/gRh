import { Component } from '@angular/core';
import { Departement, DepartementDto, User } from '../../../../services/models';
import { ActivatedRoute } from '@angular/router';
import { DepartementService } from '../../../../services/services';

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrl: './departement.component.scss'
})
export class DepartementComponent {
  alert: string = "d-none";
  Msg:String="";
  departement:DepartementDto={};
  manager:User={};
  ListeEmpl:User[] =[];
  constructor(
    private route: ActivatedRoute,
    private departmentService:DepartementService
  ) {} 
  
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
    
      if (id) {
        try {
          const departmentId = parseInt(id, 10); 
          console.log(departmentId);
          this.departmentService.findById3({ id: departmentId as number})
            .subscribe(data => {
              this.departement = data;
              this.manager=data.manager!;
              this.ListeEmpl=data.listEmploye!;
              console.log("this.departement ",     this.departement );
              console.log("this.manager",     this.manager);
              console.log("this.ListeEmpl",     this.ListeEmpl);
            });
        } catch (error) { this.alert = "alert alert-danger";
          this.Msg = "Error: Invalid department ID format."; 
          setTimeout(() => {
          this.alert = 'd-none';
        }, 5000)}
      } else {
        this.alert = "alert alert-danger";
        this.Msg = "Error: No department ID found in the URL.";
        setTimeout(() => {
          this.alert = 'd-none';
        }, 5000)}
    });
  }
  


}
