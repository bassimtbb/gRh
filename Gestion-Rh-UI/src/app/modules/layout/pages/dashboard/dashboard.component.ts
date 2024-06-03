import { Component, OnInit } from '@angular/core';
import { StatistiqueService, DepartementService, UserService, EventService, FormationService } from '../../../../services/services';
import { StatistiqueDemandeResult, StatistiqueDemandeByDepartementResult, StatistiqueEventResult, StatistiqueFormationResult, StatistiqueGeneraleResult, DepartementDto, Formation, FormationDto } from '../../../../services/models';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  statistiqueDemandeByDepartementResult!: StatistiqueDemandeByDepartementResult;
  statistiqueDemandeResult!: StatistiqueDemandeResult;
  statistiqueEventResult!: StatistiqueEventResult;
  statistiqueFormationResult!: StatistiqueFormationResult;
  statistiqueGeneraleResult!: StatistiqueGeneraleResult;
  departements: DepartementDto[] = [];
  selectedDepartementStatistiques!: StatistiqueDemandeByDepartementResult;
  departementId: number = 1;
  eventId: number = 1;
  formationId: number = 1;

  demande: any[] = [];  
  employee: any[] = [];

  view: [number, number] = [900, 180];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  colorScheme: Color = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal
  };
  
  formations: FormationDto[] = [];
  formationStatistics: { [id: number]: number } = {};

  events: FormationDto[] = [];
  eventStatistics: { [id: number]: number } = {};

  constructor(
    private statistiqueService: StatistiqueService,
    private userService: UserService,
    private departementService: DepartementService,
    private eventService: EventService,
    private formationService: FormationService,
  ) {}

  ngOnInit(): void {
    this.loadStatistiqueDemande();
    this.loadStatistiqueDemandeByDepartement(this.departementId);
    this.loadStatistiqueGenerale();
    this.loadDepartementsStatistiques();
    this.loadFormations();
    this.loadEvents();
  }

  fetchEvents(): void {
    this.eventService.findAll3().subscribe(events => {
      this.events = events;
      this.events.forEach(event => {
        this.loadStatistiqueEvent(event.id!);
      });
    });
  }

  fetchFormations(): void {
    this.formationService.findAll2().subscribe(formations => {
      this.formations = formations;
      this.formations.forEach(formation => {
        this.loadStatistiqueFormation(formation.id!);
      });
    });
  }
  loadEvents(): void {
    this.fetchEvents();
  }

  loadStatistiqueEvent(eventId: number): void {
    this.statistiqueService.getStatistiqueEvent({ eventId }).subscribe(result => {
      const percentage = (result.eventCountEmployeeRegistered! / result.eventNumberOfSeats!) * 100;
      this.eventStatistics[eventId] = percentage;
      console.log(this.eventStatistics)
    });
  }
  loadStatistiqueDemande(): void {
    this.statistiqueService.getStatistiqueDemande().subscribe(result => {
      this.statistiqueDemandeResult = result;
      this.updateChartDataDemande();
    });
  }

  loadStatistiqueDemandeByDepartement(departementId: number): void {
    this.statistiqueService.getStatistiqueDemandeByDepartement({ departementId }).subscribe(result => {
      this.statistiqueDemandeByDepartementResult = result;
    });
  }

  loadFormations(): void {
    this.fetchFormations();
  }

  loadStatistiqueFormation(formationId: number): void {
    this.statistiqueService.getStatistiqueFormation({ formationId }).subscribe(result => {
      const percentage = (result.formationCountEmployeeRegistered! / result.formationNumberOfSeats!) * 100;
      this.formationStatistics[formationId] = percentage;
      console.log(this.formationStatistics)
    });
  }

  loadStatistiqueGenerale(): void {
    this.statistiqueService.getStatistiqueGenerale().subscribe(result => {
      this.statistiqueGeneraleResult = result;
    });
  }

  loadDepartementsStatistiques(): void {
    this.departementService.findAll4().subscribe(departements => {
      this.departements = departements;
      this.departements.forEach(departement => {
        this.statistiqueService.getStatistiqueDemandeByDepartement({ departementId: departement.id as number }).subscribe(statistiques => {
          this.statistiqueDemandeByDepartementResult = statistiques;
        });
      });
    });
  }

  openDemandeModal(departementId: number): void {
    this.statistiqueService.getStatistiqueDemandeByDepartement({ departementId }).subscribe(statistiques => {
      this.selectedDepartementStatistiques = statistiques;
    });
  }

  updateChartDataDemande(): void {
    this.demande = [
      { name: 'En attente Sup H', value: this.statistiqueDemandeResult.demandeCountEn_attente_Sup_H },
      { name: 'En attente RRH', value: this.statistiqueDemandeResult.demandeCountEn_attente_RRH },
      { name: 'Validée', value: this.statistiqueDemandeResult.demandeCountValidee },
      { name: 'Refusée Sup H', value: this.statistiqueDemandeResult.demandeCountRefusee_Sup_H },
      { name: 'Refusée RRH', value: this.statistiqueDemandeResult.demandeCountRefusee }
    ];
  }
  updateChartDataEmployee(): void {
    this.employee = [
      
      { name: 'Refusée Sup H', value: this.statistiqueDemandeResult.demandeCountRefusee_Sup_H },
      { name: 'Refusée RRH', value: this.statistiqueDemandeResult.demandeCountRefusee }
    ];
  }
}
