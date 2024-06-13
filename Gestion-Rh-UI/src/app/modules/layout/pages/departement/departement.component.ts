import { Component, OnInit } from '@angular/core';
import { Departement, DepartementDto, User, UserDto } from '../../../../services/models';
import { ActivatedRoute } from '@angular/router';
import { DepartementService, UserService } from '../../../../services/services';
import { TokenService } from '../../../../services/token/token.service';

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrl: './departement.component.scss'
})
export class DepartementComponent  implements OnInit  {
  employes:UserDto[]=[];
  alert: string = "d-none";
  Msg:String="";
  departement:DepartementDto={};
  // employeAux!:UserDto;
  manager:User={};
  ListeEmpl:UserDto[] =[];
  ListeEmplAux:User[] =[];
   role = this.tokenService.userRole();

  Sup_h:User|null=null;
  constructor(
    private route: ActivatedRoute,
    private departmentService:DepartementService,
    private userService: UserService,
    private tokenService: TokenService
  ) {}
  ngOnInit(): void {
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
          this.departmentService.findById4({ id: departmentId as number})
            .subscribe(data => {
              this.departement = data;
              this.manager=data.manager!;
              this.ListeEmpl=data.listEmploye!;
              // console.log("this.departement ",     this.departement );
              // console.log("this.manager",     this.manager);
              // console.log("this.ListeEmpl",     this.ListeEmpl);
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
  
  AddEmployeToDepart(employe: UserDto) {      
    console.log("employe.departement?.manager != null  ",employe.departement?.manager != null)
    console.log("employe   ",employe )
    console.log("employe.departement?.manager   ",employe.departement?.manager )

    if (employe.departement?.manager != null) {
      console.log( "employe.id", employe.id)
      console.log("employe.departement?.manager.id  ",employe.departement?.manager.id)
      console.log("employe.departement?.manager.id == employe.id ",employe.departement?.manager.id == employe.id)

      if (employe.departement?.manager.id== employe.id) {
        this.alert = 'alert alert-danger';
        this.Msg = `Employé(e) ${employe.firstname} ${employe.lastname} est déjà un(e) supérieur(e) hiérarchique dans le département ${employe.departement?.name}`;
        setTimeout(() => {
          this.alert = 'd-none';
        }, 5000);
        return console.log("error");; 

      }
      
    }
    this.departmentService.findByIdEn({ id: employe.id as number })
      .subscribe(departement => {
        if (departement.manager) {
        }else{
          this.Sup_h =null;
        }
        console.log("département : ", departement);
        console.log("departement.manager :", departement.manager);
      });
  
  
        this.departmentService.addEmployeToDepartement({ id: this.departement.id as number, body: employe.id as number })
          .subscribe(departement => {
            this.ngOnInit();
            this.alert = "alert alert-success";
            this.Msg = `Employé(e) ${employe.firstname} ${employe.lastname} a été ajouté(e) avec succès au département ${departement.name}`;
            setTimeout(() => {
              this.alert = 'd-none';
            }, 5000);
          });
  }
  




  removeEmployefromDepart( employe : UserDto){
    this.departmentService.deleteEmpl({id :employe.departement!.id as number ,body:employe.id as number})
    .subscribe(departement =>{
      this.ngOnInit();

      this.alert = "alert alert-success";
      this.Msg = `Employé(e) ${employe.firstname} ${employe.lastname} a été retiré avec succès du département ${departement.name} `; 
      setTimeout(() => {
      this.alert = 'd-none';
    }, 5000)}
    )

  }




  isInTheDepartment(employe : UserDto){
  
    for (const empl of this.ListeEmpl ) {
      if (empl.id === employe.id) {
        return true;
      }
    }
    return false;
  }

  SetSupH(employe : UserDto) {
    console.log("remouve :" ,employe);
    this.departmentService.setSup({id :employe.departement!.id as number ,body:employe.id as number})
    .subscribe(departement =>{
      this.ngOnInit();
      this.alert = "alert alert-success";
      this.Msg = `Le Supérieur hiérarchique ${employe.firstname} ${employe.lastname} a été affecté avec succès au département ${departement.name}`; 
      setTimeout(() => {
      this.alert = 'd-none';
    }, 5000)}
    )
  }
  remouveSupH(employe : UserDto) {
    console.log("remouve :" ,employe);
    this.departmentService.deleteSupH({id :employe.departement!.id as number ,body:employe.id as number})
    .subscribe(departement =>{
      this.ngOnInit();
      this.alert = "alert alert-success";
      this.Msg = `Le Supérieur hiérarchique ${employe.firstname} ${employe.lastname} a été révoqué avec succès du département ${departement.name}`; 
      setTimeout(() => {
      this.alert = 'd-none';
    }, 5000)}
    )
  }

}
