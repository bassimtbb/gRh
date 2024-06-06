import { Component, OnInit } from '@angular/core';
import { StatistiqueService, DepartementService, UserService, EventService, FormationService } from '../../../../services/services';
import { StatistiqueDemandeResult, StatistiqueDemandeByDepartementResult, StatistiqueEventResult, StatistiqueFormationResult, StatistiqueGeneraleResult, DepartementDto, FormationDto, StatistiqueUserByDepartementResult, EventDto } from '../../../../services/models';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  statistiqueDemandeByDepartementResult: StatistiqueDemandeByDepartementResult[]=[];
  statistiqueUserByDepartementResult: StatistiqueUserByDepartementResult[] = [];
  statistiqueDemandeResult!: StatistiqueDemandeResult;
  statistiqueEventResult: StatistiqueEventResult[]=[];
  statistiqueFormationResult: StatistiqueFormationResult[]=[];
  statistiqueGeneraleResult!: StatistiqueGeneraleResult;
  departements: DepartementDto[] = [];
  selectedDepartementStatistiques!: StatistiqueDemandeByDepartementResult;
  departementId: number = 1;
  eventId: number = 1;
  formationId: number = 1;
  departementNames=["Informatique","Finance","Ressources_Humaine"];
  departIndex=0;
  demande: any[] = [];  
  employee: any[] = [];
  demandesDepartementChart: any[] = [];
  demandesDepartement: any[] = [];
  employeeChart: any[] = [];

  view: [number, number] = [900, 180];
  viewdemande: [number, number] = [1450, 200];


  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  colorScheme: Color = {
    domain: ['#FF5733', '#33FF57', '#3357FF', '#FF33A1'],
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal
  };
  
  colorSchemeEmploye: Color = {
    domain: ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#33FFA1', '#A133FF', '#FFA133'],
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal
  };
  
  colorSchemeDemandes: Color = {
    domain: ['#FF5733', '#33FF57', '#3357FF'],
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal
  };
  
  formations: FormationDto[] = [];
  formationStatistics: { [id: number]: number } = {};

  events: EventDto[] = [];
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
    this.loadStatistiqueGenerale();
    this.loadFormations();
    this.loadEvents();
    this.loadStatistiqueDemandes();
    this.loadStatistiqueUser(); 

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
    this.statistiqueService.getStatistiqueEvent({  eventId })
    .subscribe(result => {
      // Push the result to the array
      this.statistiqueEventResult.push(result);
    });
  }

  loadStatistiqueDemande(): void {
    this.statistiqueService.getStatistiqueDemande().subscribe(result => {
      this.statistiqueDemandeResult = result;
      this.updateChartDataDemande();
    });
  }



  loadFormations(): void {
    this.fetchFormations();
  }

  loadStatistiqueFormation(formationId: number): void {
    this.statistiqueService.getStatistiqueFormation({ formationId: formationId as number })
    .subscribe(result => {
      // Push the result to the array
      this.statistiqueFormationResult.push(result);
    });
  }

  loadStatistiqueGenerale(): void {
    this.statistiqueService.getStatistiqueGenerale().subscribe(result => {
      this.statistiqueGeneraleResult = result;
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

  loadStatistiqueUser(): void {
    this.departementService.findAll4().subscribe(departements => {
      this.departements = departements;

      // Reset arrays before filling
      this.employee = [];
      this.statistiqueUserByDepartementResult = [];

      // Collect all the observables
      const observables = departements.map(departement =>
        this.statistiqueService.getStatistiqueUserByDepartement({ departementId: departement.id as number })
      );

      // Use forkJoin to wait for all observables to complete
      forkJoin(observables).subscribe(results => {
        results.forEach((statistiques, index) => {
          this.statistiqueUserByDepartementResult.push(statistiques);
          this.employee.push({ name: statistiques.nameDep, value: statistiques.numUser });
        });

        this.updateChartDataEmployee();

      });
    });
  }
  updateChartDataEmployee(): void {
    this.employeeChart = [
      { name: this.statistiqueUserByDepartementResult[0].nameDep!, value: this.statistiqueUserByDepartementResult[0].numUser!},
      { name: this.statistiqueUserByDepartementResult[1].nameDep!, value: this.statistiqueUserByDepartementResult[1].numUser!},
      { name: this.statistiqueUserByDepartementResult[2].nameDep!, value: this.statistiqueUserByDepartementResult[2].numUser!},

    ];
  }loadStatistiqueDemandes(): void {
    this.departementService.findAll4().subscribe(departements => {
      this.departements = departements;
      console.log("Departements loaded: ", this.departements); // Debugging
  
      // Reset arrays before filling
      this.demandesDepartement = [];
      this.statistiqueDemandeByDepartementResult = [];
  
      // Collect all the observables
      const observables = departements.map(departement =>
        this.statistiqueService.getStatistiqueDemandeByDepartement({ departementId: departement.id as number })
      );
  
      // Use forkJoin to wait for all observables to complete
      forkJoin(observables).subscribe(results => {
        results.forEach((statistiques, index) => {
          this.statistiqueDemandeByDepartementResult.push(statistiques);
          this.demandesDepartement.push([
            { name: 'Congé', value: statistiques.congeCountByDepartement },
            { name: 'Autorisation de sortie', value: statistiques.autorisationSortieCountByDepartement },
            { name: 'Autorisation de télétravail', value: statistiques.autorisationTeletravailCountByDepartement },
            { name: 'Autorisation de travail supplémentaire', value: statistiques.autorisationTravailSupCountByDepartement },
            { name: 'Changement Horaire de travail', value: statistiques.changementHoraireCountByDepartement },
            { name: 'Acompte sur Salaire/prime', value: statistiques.acompteCountByDepartement },
            { name: 'Prêt', value: statistiques.pretCountByDepartement }
          ]);
        });
  
        this.updateChartDataDemandes();
        console.log('demandesDepartement', this.demandesDepartement);
        console.log('demandesDepartementChart', this.demandesDepartementChart);
      });
    });
  }
  next(){

    this.departIndex+=1;
  if(this.departIndex>2){    
    this.departIndex=0;
  }
  this.ngOnInit();

  }
  previes(){
    this.departIndex-=1;
    if(this.departIndex<0){    
      this.departIndex=2;
    }
    this.ngOnInit();
  }
  updateChartDataDemandes(): void {
    // Here you may need to ensure that you are aggregating or selecting data correctly
     this.demandesDepartementChart =
[   [  { name: this.demandesDepartement[0][0].name, value: this.demandesDepartement[0][0].value},
      { name: this.demandesDepartement[0][1].name, value: this.demandesDepartement[0][1].value},
      { name: this.demandesDepartement[0][2].name, value: this.demandesDepartement[0][2].value},
      { name: this.demandesDepartement[0][3].name, value: this.demandesDepartement[0][3].value},
      { name: this.demandesDepartement[0][4].name, value: this.demandesDepartement[0][4].value},
      { name: this.demandesDepartement[0][5].name, value: this.demandesDepartement[0][5].value},
      { name: this.demandesDepartement[0][6].name, value: this.demandesDepartement[0][6].value}
    ],
    [  { name: this.demandesDepartement[1][0].name, value: this.demandesDepartement[1][0].value},
    { name: this.demandesDepartement[1][1].name, value: this.demandesDepartement[1][1].value},
    { name: this.demandesDepartement[1][2].name, value: this.demandesDepartement[1][2].value},
    { name: this.demandesDepartement[1][3].name, value: this.demandesDepartement[1][3].value},
    { name: this.demandesDepartement[1][4].name, value: this.demandesDepartement[1][4].value},
    { name: this.demandesDepartement[1][5].name, value: this.demandesDepartement[1][5].value},
    { name: this.demandesDepartement[1][6].name, value: this.demandesDepartement[1][6].value}
  ],   
  [  { name: this.demandesDepartement[2][0].name, value: this.demandesDepartement[2][0].value},
  { name: this.demandesDepartement[2][1].name, value: this.demandesDepartement[2][1].value},
  { name: this.demandesDepartement[2][2].name, value: this.demandesDepartement[2][2].value},
  { name: this.demandesDepartement[2][3].name, value: this.demandesDepartement[2][3].value},
  { name: this.demandesDepartement[2][4].name, value: this.demandesDepartement[2][4].value},
  { name: this.demandesDepartement[2][5].name, value: this.demandesDepartement[2][5].value},
  { name: this.demandesDepartement[2][6].name, value: this.demandesDepartement[2][6].value}
]]
  }
  

}
