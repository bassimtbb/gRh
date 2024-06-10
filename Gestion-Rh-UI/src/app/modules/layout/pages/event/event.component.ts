import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EventService, NotificationService, UserService,  } from '../../../../services/services';
import { EventDto, User } from '../../../../services/models';
import { TokenService } from '../../../../services/token/token.service';
import { NotificationsService } from '../../../layout/NotificationsService';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent implements OnInit {
  @ViewChild('listeEmplPdf') listeEmplPdf: ElementRef | undefined;


  selectedEvent!: EventDto ;
  user!: User;
  events:EventDto[]=[];
  ispostuler!:boolean;
  listeEmpl:User[]=[];
  alert: string = "d-none";
  datePickerId = new Date().toISOString().split("T")[0];
  eventUpdate:EventDto={};

  Msg:String="";
  Role:any="";
  ngOnInit() {
    this.eventService.findAll3()
      .subscribe(events => {
        this.events = events;
        console.log(this.events);
      }, error => {
        console.error('Error retrieving events:', error);
      });
      const email = this.tokenService.email;
      this.userService.loadUserByUsername({ username: email as string })
      .subscribe((utilisateur: User) => { 
        this.Role=this.tokenService.userRole(); 
        console.log("Role: ",this.Role);
        this.user = utilisateur;});
  
  }
  
  downloadPdf(){
    html2canvas(this.listeEmplPdf!.nativeElement).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf.jsPDF();
      const imgWidth = 210;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      pdf.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('demande.pdf');
    })
   }
  eventClicked(event: EventDto) {
    this.listeEmpl = event.listEmploye ?? [];
    this.selectedEvent = event;
    // Assign empty array if undefined
    console.log(this.listeEmpl);
    this.ispostuler=this.isInList(this.listeEmpl, this.user)
    this.eventUpdate=event;
  }
  

  constructor(
    private  userService:UserService,
    private tokenService: TokenService,
   private  eventService:EventService,
   private notificationsService: NotificationsService,
   private  notificationService:NotificationService,


  ){}

  eventAdd :EventDto={
    dateD: '',
    dateF: '',
    description: '',
    duree: 0,
    img: '',
    lieu: '',
    titre:'',
    nbrPlace: 0
  }
  addevent() {
    console.log("this.eventAdd", this.eventAdd);
  
    // Validate event data before sending to the server
    // (Optional, but recommended for robustness)
    const validationErrors = this.validateEvent(this.eventAdd);
    if (validationErrors.length > 0) {
      this.alert = 'alert alert-danger';
      this.Msg = `Événement non ajouté. Erreurs de validation : ${validationErrors.join(', ')}`;
      return;  // Exit the function if validation fails
    }
    this.eventAdd={ 
      ...this.eventAdd,
    duree: this.duree(this.eventAdd.dateD!, this.eventAdd.dateF!)
    }
    this.eventService.add3({ body: this.eventAdd })
      .subscribe(event => {
        console.log("event", event);
        this.ngOnInit(); 
        this.alert = 'alert alert-success';
        this.Msg = `Événement "${event.titre}" est ajouté avec succès!`;

        setTimeout(() => {
          this.alert = 'd-none';
          this.Msg = "";
        }, 5000); // Display success message for 5 seconds
      }, error => {
        console.error('Error adding event:', error);
        this.alert = 'alert alert-danger';
        setTimeout(() => {
          this.alert = 'd-none';
        this.Msg = `Événement non ajouté. Une erreur est survenue : ${error.message || error}`; // Provide a more informative error message
      }, 5000); // Display success message for 5 seconds

      });
  }
  
  validateEvent(event: any): string[] {
    const errors = [];
  
    // Validate Title (already present)
    if (!event.titre) {
      errors.push('Le titre est obligatoire.');
    } else if (event.titre.length < 3) {
      errors.push('Le titre doit contenir au moins 3 caractères.');
    }
  
    // Validate Location (already present)
    if (!event.lieu) {
      errors.push('Le lieu est obligatoire.');
    }
  
    // Validate Dates
    if (!event.dateD || !event.dateF) {
      errors.push('Les dates de début et de fin sont obligatoires.');
    } else if (new Date(event.dateD) > new Date(event.dateF)) {
      errors.push('La date de début doit être antérieure à la date de fin.');
    }
  
    // Validate Number of Places
    if (!event.nbrPlace) {
      errors.push('Le nombre de places est obligatoire.');
    } else if (event.nbrPlace <= 0 || !Number.isInteger(event.nbrPlace)) {
      errors.push('Le nombre de places doit être un entier positif.');
    }
  
    // Validate Duration
    // if (!event.duree) {
    //   errors.push('La durée est obligatoire.');
    // } else if (event.duree <= 0 || !Number.isInteger(event.duree)) {
    //   errors.push('La durée doit être un entier positif.');
    // }
  
    // Validate Description (optional, you can add checks here)
    if (!event.description) {
      errors.push('Une description est obligatoire.');  // Uncomment if required
    }
  
 
  
    return errors;
  }
  
  get EventCover(): string {
    if (0) {
      return 'data:image/jpg;base64,' ;
    }
    return 'https://cdni.iconscout.com/illustration/premium/thumb/event-management-service-5631302-4693331.png?f=webp';
  }

  isInList(listeEmpl: User[], utilisateur: User): boolean {
    this.listeEmpl=listeEmpl;

    for (const empl of listeEmpl) {
      if (empl.id === utilisateur.id) {
        return true;
      }
    }
    return false;
  }


  inscrire(event: EventDto) {
          this.eventService.addEmployeToEvent({
            id: event.id as number,
            body: this.user.id as number
          })
          .subscribe(response => {
            this.notificationService.sendNotif({userID:this.user.id as number,body:"EVENEMENT_INSCRIRE" })
            .subscribe( notif=>
              {console.log("Notification Event_INSCRIRE");
              this.notificationsService.triggerReloadNotification();
  
  
              }, error => {
                console.error('NO Notification Event_INSCRIRE', error);
              }
  
            )
            this.ngOnInit();

            console.log('Successfully added user to event:', response);
          }, error => {
            console.error('Error adding user to event:', error);
          });
   
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
  
  updateEvent() { 
    const validationErrors = this.validateEvent(this.eventUpdate);
    if (validationErrors.length > 0) {
      this.alert = 'alert alert-danger';
      this.Msg = `Événement non modifiée. Erreurs de validation : ${validationErrors.join(', ')}`;
      setTimeout(() => {
        this.alert = 'd-none';
        this.Msg = ""; // Clear the message after hiding the alert
      }, 5000);
      console.log("error");
this.ngOnInit();
      return; // Exit the function if validation fails
    }
    console.log("this.eventUpdate", this.eventUpdate);
    this.eventUpdate = {
      ...this.eventUpdate,
      duree: this.duree(this.eventUpdate.dateD!, this.eventUpdate.dateF!)
    };
  
    this.eventService.update3({ id: this.eventUpdate.id as number, body: this.eventUpdate }) 
      .subscribe(Event => {
        console.log("Event", Event);
        this.ngOnInit();
        this.Msg = `Événement "${Event.titre}" modifiée avec succès!`;
        this.alert = 'alert alert-success';
  
        setTimeout(() => {
          this.alert = 'd-none';
          this.Msg = ""; // Clear the message after hiding the alert
        }, 5000); // Display success message for 5 seconds
      }, error => {
        console.error('Error updating Event:', error);
        this.alert = 'alert alert-danger';
        this.Msg = `Event non modifiée. Une erreur est survenue : ${error.message || error}`; // Provide a more informative error message
  
        setTimeout(() => {
          this.alert = 'd-none';
          this.Msg = ""; // Clear the message after hiding the alert
        }, 5000); // Display error message for 5 seconds
      });
  }
  eventDelete(event :EventDto) { 
    this.eventService.delete3({ id: event.id as number }) 
      .subscribe(() => {
        console.log("event", event);
        this.ngOnInit();
        this.Msg = `Événement "${event.titre}" supprimée avec succès!`;
        this.alert = 'alert alert-success';
  
        setTimeout(() => {
          this.alert = 'd-none';
          this.Msg = ""; // Clear the message after hiding the alert
        }, 5000); // Display success message for 5 seconds
      }, error => {
        console.error('Error deleting event:', error);
        this.alert = 'alert alert-danger';
        this.Msg = `Événement non supprimée. Une erreur est survenue : ${error.message || error}`; // Provide a more informative error message
  
        setTimeout(() => {
          this.alert = 'd-none';
          this.Msg = ""; // Clear the message after hiding the alert
        }, 5000); // Display error message for 5 seconds
      });
  }
  
}
