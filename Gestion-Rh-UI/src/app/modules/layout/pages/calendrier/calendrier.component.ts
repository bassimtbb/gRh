import { Component, OnInit, HostListener } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { CalendarControllerService, EventService, UserService } from '../../../../services/services';
import { TokenService } from '../../../../services/token/token.service';
import { Formation } from '../../../../services/models/formation';
import { CongeDto, EventDto } from '../../../../services/models';

@Component({
  selector: 'app-calendrier',
  templateUrl: './calendrier.component.html',
  styleUrls: ['./calendrier.component.scss']
})
export class CalendrierComponent implements OnInit {
  userId: number | null | undefined;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    dateClick: this.handleDateClick.bind(this),
    events: [] // Initialize as an empty array
  };
  role: any;
  filterOptions = {
    conges: false,
    formations: false,
    events: false
  };

  private allEvents: any[] = [];

  constructor(
    private userService: UserService,
    private calendarService: CalendarControllerService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.userId = this.tokenService.Id;
    this.role = this.tokenService.userRole();

    this.updateCalendarHeight();
    if (this.role == 'RRH') {
      this.fetchAllCongeValid();
      this.fetchEvents();
      this.fetchFormations();
    }
    if (this.role == 'SUP_H') {
      this.fetchCongeValidByDepartement();
      this.fetchEvents();
      this.fetchFormations();
    }
    if (this.role == 'EMPLOYE') {
      this.fetchEventsByUser();
      this.fetchFormationsByUser();
      this.fetchCongeValidByUser();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.updateCalendarHeight();
  }

  updateCalendarHeight(): void {
    const calendarHeight = window.innerHeight - 110; // Adjust 100 as needed for header/footer
    this.calendarOptions.height = calendarHeight;
    this.calendarOptions.contentHeight = calendarHeight - 60; // Adjust 50 as needed for internal content
  }

  fetchEvents(): void {
    if (this.userId) {
      this.calendarService.getEvents().subscribe(
        (events: EventDto[]) => {
          const formattedEvents = this.formatEvents(events);
          this.allEvents = [...this.allEvents, ...formattedEvents];
          this.filterEvents();
        },
        error => {
          console.error('Error fetching events:', error);
        }
      );
    }
  }

  fetchEventsByUser(): void {
    if (this.userId) {
      this.calendarService.getEventsByUserId({ userId: this.userId as number })
        .subscribe(
          (events: EventDto[]) => {
            const formattedEvents = this.formatEvents(events);
            this.allEvents = [...this.allEvents, ...formattedEvents];
            this.filterEvents();
          },
          error => {
            console.error('Error fetching events:', error);
          }
        );
    }
  }

  fetchAllCongeValid(): void {
    if (this.userId) {
      this.calendarService.getConges().subscribe(
        (Conges: CongeDto[]) => {
          const formattedConges = this.formatConges(Conges);
          this.allEvents = [...this.allEvents, ...formattedConges];
          this.filterEvents();
        },
        error => {
          console.error('Error fetching Conges:', error);
        }
      );
    }
  }

  fetchCongeValidByUser(): void {
    if (this.userId) {
      this.calendarService.getCongesByUserId({ userId: this.userId as number }).subscribe(
        (Conges: CongeDto[]) => {
          const formattedConges = this.formatConges(Conges);
          this.allEvents = [...this.allEvents, ...formattedConges];
          this.filterEvents();
        },
        error => {
          console.error('Error fetching Conges:', error);
        }
      );
    }
  }

  fetchCongeValidByDepartement(): void {
    if (this.userId) {
      this.userService.findById({ id: this.userId as number })
        .subscribe(user => {
          this.calendarService.getCongesByDepartementId({ departementId: user.departement?.id as number }).subscribe(
            (Conges: CongeDto[]) => {
              const formattedConges = this.formatConges(Conges);
              this.allEvents = [...this.allEvents, ...formattedConges];
              this.filterEvents();
            },
            error => {
              console.error('Error fetching Conges:', error);
            }
          );
        });
    }
  }

  fetchFormations(): void {
    if (this.userId) {
      this.calendarService.getFormations().subscribe(
        (formations: Formation[]) => {
          const formattedFormations = this.formatFormations(formations);
          this.allEvents = [...this.allEvents, ...formattedFormations];
          this.filterEvents();
        },
        error => {
          console.error('Error fetching formations:', error);
        }
      );
    }
  }

  fetchFormationsByUser(): void {
    if (this.userId) {
      this.calendarService.getFormationsByUserId({ userId: this.userId }).subscribe(
        (formations: Formation[]) => {
          const formattedFormations = this.formatFormations(formations);
          this.allEvents = [...this.allEvents, ...formattedFormations];
          this.filterEvents();
        },
        error => {
          console.error('Error fetching formations:', error);
        }
      );
    }
  }

  addJoursAuDate(debut: Date, jour: number): Date {
    let newDate = new Date(debut);
    newDate.setDate(newDate.getDate() + jour);
    return newDate;
  }

  formatEvents(events: EventDto[]): any[] {
    return events.map(event => {
      const finDate = event.dateF ? new Date(event.dateF) : new Date();
      return {
        title: "ÉVÉNEMENT :" + event.titre,
        start: event.dateD,
        end: this.addJoursAuDate(finDate, event.duree!),
        color: '#C00606' // Set the color for events to green
      }
    });
  }

  formatConges(conges: CongeDto[]): any[] {
    return conges.map(conge => {
      const debutDate = conge.debut ? new Date(conge.debut) : new Date();
      return {
        title: conge.utilisateur?.firstname + " " + conge.utilisateur?.lastname,
        start: debutDate,
        end: this.addJoursAuDate(debutDate, conge.duree!-1),
        color: '#078CCD' // Set the color for conges to blue
      };
    });
  }

  formatFormations(formations: Formation[]): any[] {
    return formations.map(formation => {
      const finDate = formation.dateF ? new Date(formation.dateF) : new Date();
      return {
        title: "FORMATION :" + formation.titre,
        start: formation.dateD,
        end: this.addJoursAuDate(finDate, formation.duree!),
        color: '#0E743F' // Set the color for formations to red
      }
    });
  }

  updateCalendarEvents(newEvents: any[]): void {
    this.calendarOptions.events = newEvents;
  }

  filterEvents(): void {
    const filteredEvents = this.allEvents.filter(event => {
      if (this.filterOptions.conges && event.color === '#078CCD') {
        return true;
      }
      if (this.filterOptions.formations && event.color === '#0E743F') {
        return true;
      }
      if (this.filterOptions.events && event.color === '#C00606') {
        return true;
      }
      return false;
    });
    this.updateCalendarEvents(filteredEvents);
  }

  handleDateClick(arg: DateClickArg): void {
    alert('Date clicked: ' + arg.dateStr);
  }
}
