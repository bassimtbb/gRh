import { Component, OnInit } from '@angular/core';
import { FormationDto, User ,Notification} from '../../../../services/models';
import { FormationService, NotificationService, UserService } from '../../../../services/services';
import { TokenService } from '../../../../services/token/token.service';
import {  Output, EventEmitter  } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { NotificationsService } from '../../../layout/NotificationsService';
@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrl: './formation.component.scss'
})
export class FormationComponent implements OnInit {
  private user!: User;
  datePickerId = new Date().toISOString().split("T")[0];
  notification: Notification  = {
    type: "FORMATION_INSCRIRE"

  }; // Create a new notification object

  selectedFormation!: FormationDto ;
  formations:FormationDto[]=[];
  private img64 !:string;
  listeEmpl:User[]=[];
  alert: string = "d-none";
  Msg:String="";
   ispostuler!:boolean;
  formationAdd :FormationDto={
    dateD: '',
    dateF: '',
    description: '',
    duree: 0,
    img: '',
    lieu: '',
    titre:'',
    nbrPlace: 0
  }
  formationUpdate:FormationDto={};
  Role: any;

  constructor(
   private  formationService:FormationService,
   private  usersService:UserService,
   private  notificationService:NotificationService,
   private tokenService: TokenService,
   private notificationsService: NotificationsService

  ){}
  public  onInputFile(formation: any) {  
    let base64!: string | ArrayBuffer | null;
    let targetformation = formation.target;
    let file: File = targetformation.files[0];
    let fileReader: FileReader = new FileReader();

    fileReader.onload = (e) => {
    base64 = fileReader.result as string; // Type assertion (careful)
      this.img64 =base64?.split(',')[1];
  
      if (this.img64) {
        console.log('Image data:', this.img64);
      } else {
        console.error('Error: Invalid base64 data');
        // Handle the error (e.g., display an error message to the user)
      }
    };
  
    fileReader.onerror = (error) => {
      console.error('Error reading file:', error);
      // Handle the error (e.g., display an error message to the user)
    };
  
    fileReader.readAsDataURL(file);
  }
  
  duree(dateDebutStr:string,    dateFinStr:string):number{
    // Convertissez les chaînes de caractères en objets Date
const dateDebut = new Date(dateDebutStr);
const dateFin = new Date(dateFinStr);

// Calculez la différence en millisecondes entre les deux dates
const differenceEnMillisecondes = dateFin.getTime() - dateDebut.getTime();
const differenceEnJours:number = differenceEnMillisecondes / (1000 * 60 * 60 * 24);
// Convertissez la différence en jours

console.log(`La durée est de ${differenceEnJours} jours.`);
return differenceEnJours;

  }
  ngOnInit(): void {
    this.formationService.findAll2() 
    .subscribe(formation => {
      this.formations=formation;
        console.log(this.formations)   
      }, error => {
        console.error('Error retrieving user information:', error);
      });
      const email = this.tokenService.email;
      this.usersService.loadUserByUsername({ username: email as string })
      .subscribe(utilisateur => {  
        this.Role=this.tokenService.userRole(); 
        console.log("Role: ",this.Role);
        this.user = utilisateur;});
  }

   get fromationCover(): string {
    if (0) {
      return 'data:image/jpg;base64,' ;
    }
    return 'https://lamanu.fr/wp-content/uploads/2022/02/cover-formation-communication-webdesign.svg';
  }



formationClicked(formation: FormationDto) {
  this.listeEmpl = formation.listEmploye ?? [];
  this.selectedFormation = formation;
  // Assign empty array if undefined
  this.ispostuler=this.isInList(this.listeEmpl, this.user)
this.formationUpdate=formation;


}



 isInList(listeEmpl: User[], user: User): boolean {
  this.listeEmpl=listeEmpl;
  for (const empl of this.listeEmpl) {
    if (empl.id === user.id) {
      return true;
    }
  }
  return false;
}

inscrire (formation: FormationDto) {
  console.log( this.user.id);
  console.log(formation.id);
        this.formationService.addEmployeToFormation({
          id: formation.id as number,
          body: this.user.id as number
        }).subscribe(response => {
          console.log('Successfully added user to formation:', response);
          this.notificationService.sendNotif({userID:this.user.id as number,body:"FORMATION_INSCRIRE" })
          .subscribe( notif=>
            {console.log("Notification FORMATION_INSCRIRE");
            this.notificationsService.triggerReloadNotification();


            }, error => {
              console.error('NO Notification FORMATION_INSCRIRE', error);
            }

          )

          

        this.ngOnInit();
        }, error => {
          console.error('Error adding user to formation:', error);
        });

}


addFormation() { 
  const validationErrors = this.validateFormation(this.formationAdd);
  if (validationErrors.length > 0) {
    this.alert = 'alert alert-danger';
    this.Msg = `Formation non ajoutée. Erreurs de validation : ${validationErrors.join(', ')}`;
    setTimeout(() => {
      this.alert = 'd-none';
      this.Msg = ""; // Clear the message after hiding the alert
    }, 5000);
    console.log("error");
    return; // Exit the function if validation fails
  }
  console.log("this.formationAdd", this.formationAdd);
  console.log("imga", this.img64);
  this.formationAdd = {
    ...this.formationAdd,
    duree: this.duree(this.formationAdd.dateD!, this.formationAdd.dateF!)
  };

  this.formationService.add2({ body: this.formationAdd }) 
    .subscribe(formation => {
      console.log("formation", formation);
      this.ngOnInit();
      this.Msg = `Formation "${formation.titre}" ajoutée avec succès!`;
      this.alert = 'alert alert-success';

      setTimeout(() => {
        this.alert = 'd-none';
        this.Msg = ""; // Clear the message after hiding the alert
      }, 5000); // Display success message for 5 seconds
    }, error => {
      console.error('Error adding formation:', error);
      this.alert = 'alert alert-danger';
      this.Msg = `Formation non ajoutée. Une erreur est survenue : ${error.message || error}`; // Provide a more informative error message

      setTimeout(() => {
        this.alert = 'd-none';
        this.Msg = ""; // Clear the message after hiding the alert
      }, 5000); // Display error message for 5 seconds
    });
}

formationDelete(formation :FormationDto) { 
  this.formationService.delete2({ id: formation.id as number }) 
    .subscribe(() => {
      console.log("formation", formation);
      this.ngOnInit();
      this.Msg = `Formation "${formation.titre}" supprimée avec succès!`;
      this.alert = 'alert alert-success';

      setTimeout(() => {
        this.alert = 'd-none';
        this.Msg = ""; // Clear the message after hiding the alert
      }, 5000); // Display success message for 5 seconds
    }, error => {
      console.error('Error deleting formation:', error);
      this.alert = 'alert alert-danger';
      this.Msg = `Formation non supprimée. Une erreur est survenue : ${error.message || error}`; // Provide a more informative error message

      setTimeout(() => {
        this.alert = 'd-none';
        this.Msg = ""; // Clear the message after hiding the alert
      }, 5000); // Display error message for 5 seconds
    });
}

updateFormation() { 
  const validationErrors = this.validateFormation(this.formationUpdate);
  if (validationErrors.length > 0) {
    this.alert = 'alert alert-danger';
    this.Msg = `Formation non modifiée. Erreurs de validation : ${validationErrors.join(', ')}`;
    setTimeout(() => {
      this.alert = 'd-none';
      this.Msg = ""; // Clear the message after hiding the alert
    }, 5000);
    console.log("error");
    return; // Exit the function if validation fails
  }
  console.log("this.formationUpdate", this.formationUpdate);
  console.log("imga", this.img64);
  this.formationUpdate = {
    ...this.formationUpdate,
    duree: this.duree(this.formationUpdate.dateD!, this.formationUpdate.dateF!)
  };

  this.formationService.update2({ id: this.formationUpdate.id as number, body: this.formationUpdate }) 
    .subscribe(formation => {
      console.log("formation", formation);
      this.ngOnInit();
      this.Msg = `Formation "${formation.titre}" modifiée avec succès!`;
      this.alert = 'alert alert-success';

      setTimeout(() => {
        this.alert = 'd-none';
        this.Msg = ""; // Clear the message after hiding the alert
      }, 5000); // Display success message for 5 seconds
    }, error => {
      console.error('Error updating formation:', error);
      this.alert = 'alert alert-danger';
      this.Msg = `Formation non modifiée. Une erreur est survenue : ${error.message || error}`; // Provide a more informative error message

      setTimeout(() => {
        this.alert = 'd-none';
        this.Msg = ""; // Clear the message after hiding the alert
      }, 5000); // Display error message for 5 seconds
    });
}





  validateFormation(fromation: any): string[] {
    const errors = [];
  
    // // Validate Title (already present)
    if (!fromation.titre) {
      errors.push('Le titre est obligatoire.');
    } else if (fromation.titre.length < 3) {
      errors.push('Le titre doit contenir au moins 3 caractères.');
    }
  
    // Validate Location (already present)
    if (!fromation.lieu) {
      errors.push('Le lieu est obligatoire.');
    }
  
    // Validate Dates
    if (!fromation.dateD || !fromation.dateF) {
      errors.push('Les dates de début et de fin sont obligatoires.');
    } else if (new Date(fromation.dateD) >= new Date(fromation.dateF)) {
      errors.push('La date de début doit être antérieure à la date de fin.');
    }
  
    // Validate Number of Places
    if (!fromation.nbrPlace) {
      errors.push('Le nombre de places est obligatoire.');
    } else if (fromation.nbrPlace <= 0 || !Number.isInteger(fromation.nbrPlace)) {
      errors.push('Le nombre de places doit être un entier positif.');
    }
  
    // Validate Duration
    // if (!fromation.duree) {
    //   errors.push('La durée est obligatoire.');
    // } else if (fromation.duree <= 0 || !Number.isInteger(fromation.duree)) {
    //   errors.push('La durée doit être un entier positif.');
    // }
  
    // Validate Description (optional, you can add checks here)
    if (!fromation.description) {
      errors.push('Une description est obligatoire.');  // Uncomment if required
    }
  
    // // Validate Image (optional, you can add checks here based on file type/size)
    // // if (!fromation.img) {
    // //   errors.push('Une image est obligatoire.');  // Uncomment if required
    // // }
  
    return errors;
  }

}