import { Component, OnInit } from '@angular/core';
import { EventService, UserService } from '../../../../services/services';
import { EventDto, User } from '../../../../services/models';
import { TokenService } from '../../../../services/token/token.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent implements OnInit {
  selectedEvent!: EventDto ;
  user!: User;
  events:EventDto[]=[];
  ispostuler!:boolean;
  listeEmpl:User[]=[];
  alert: string = "d-none";
  Msg:String="";
  Role:any="";
  ngOnInit() {
    this.eventService.findAll2()
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
  
  // eventClicked(event :EventDto) {
  //   if (event) {
  //     console.error("'listeEmpl' is undefined. event data might be incomplete.");
  //     return; 
  //   }
  //   console.log(event.listeEmpl.);

  //   this.listeEmpl = event;
  //   this.selectedEvent = event;
  //   this.ispostuler=this.isInList(this.listeEmpl, this.user)
  //   console.log(this.ispostuler);
  // }
  eventClicked(event: EventDto) {
    this.listeEmpl = event.listEmploye ?? [];
    this.selectedEvent = event;
    // Assign empty array if undefined
    console.log(this.listeEmpl);
    this.ispostuler=this.isInList(this.listeEmpl, this.user)

  }
  

  constructor(
    private  userService:UserService,
    private tokenService: TokenService,
   private  eventService:EventService
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
  
    this.eventService.add2({ body: this.eventAdd })
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
  
  // Optional validation function (replace with your specific validation logic)
  validateEvent(event: any): string[] {
    const errors = [];
    if (!event.titre) {
      errors.push('Le titre est obligatoire.');
    }
    if (!event.lieu) {
      errors.push('Le lieu est obligatoire.');
    }
    if (!event.description) {
      errors.push('Le description est obligatoire.');
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


  postuler(event: EventDto) {
          this.eventService.addEmployeToEvent({
            id: event.id as number,
            body: this.user.id as number
          })
          .subscribe(response => {
            
            this.ngOnInit();

            console.log('Successfully added user to event:', response);
          }, error => {
            console.error('Error adding user to event:', error);
          });
   
  }
  
  

}
