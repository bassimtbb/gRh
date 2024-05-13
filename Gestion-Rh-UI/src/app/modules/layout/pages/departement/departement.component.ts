import { Component } from '@angular/core';
import { Departement, DepartementDto, User, UserDto } from '../../../../services/models';
import { ActivatedRoute } from '@angular/router';
import { DepartementService, UserService } from '../../../../services/services';

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrl: './departement.component.scss'
})
export class DepartementComponent {
  employes:UserDto[]=[];
  alert: string = "d-none";
  Msg:String="";
  departement:DepartementDto={};
  employeAux!:UserDto;
  manager:User={};
  ListeEmpl:User[] =[];
  ListeEmplAux:User[] =[];
  constructor(
    private route: ActivatedRoute,
    private departmentService:DepartementService,
    private userService: UserService
  ) {} 
  
  ngOnInit() {
    this.userService.findAll()
    .subscribe(
      employes =>{
        this.employes=employes;
      }
    )
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
        } catch (error) { 
          this.alert = "alert alert-danger";
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
  
  AddEmployeToDepart(employe : UserDto) {

   
    this.departmentService.addEmployeToDepartement({id :this.departement.id as number ,body:employe.id as number})
    .subscribe(departement =>{
      this.alert = "alert alert-success";
      this.Msg = `Employé(e) ${employe.firstname} ${employe.lastname}a été ajouté(e) avec succès au département ${departement.name} `; 
      setTimeout(() => {
      this.alert = 'd-none';
    }, 5000)}
  )

    this.ngOnInit();
  }




  remouveEmployefromDepart( employe : UserDto){
console.log("remouve :" ,employe);

    this.departmentService.deleteEmpl({id :employe.departement!.id as number ,body:employe.id as number})
    .subscribe(departement =>{
      this.alert = "alert alert-success";
      this.Msg = `Employé(e) ${employe.firstname} ${employe.lastname} a été suprrimé avec succès du département ${departement.name}`; 
      setTimeout(() => {
      this.alert = 'd-none';
    }, 5000)}
    )

this.ngOnInit();
  }




  isInTheDepartment(employe : UserDto){
    for (const empl of employe.departement?.listEmploye! ) {
      if (empl.id === employe.id) {
        return true;
      }
    } 
    return false;
  }
SetSupH() {
throw new Error('Method not implemented.');
}

}
