import { Component, OnInit } from '@angular/core';
import { FormationDto, Utilisateur } from '../../../../services/models';
import { FormationService, UtilisateurService } from '../../../../services/services';
import { TokenService } from '../../../../services/token/token.service';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrl: './formation.component.scss'
})
export class FormationComponent implements OnInit {
  private user!: Utilisateur;
  selectedFormation!: FormationDto ;
  formations:FormationDto[]=[];
  private img64 !:string;
  listeEmpl:Utilisateur[]=[];
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

  constructor(
   private  formationService:FormationService,
   private  utilisateurService:UtilisateurService,
   private tokenService: TokenService

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
  

  ngOnInit(): void {
    this.formationService.findAll1() 
    .subscribe(formation => {
      this.formations=formation;
        console.log(this.formations)   
      }, error => {
        console.error('Error retrieving user information:', error);
      });
      const email = this.tokenService.email;
      this.utilisateurService.loadUserByUsername({ email: email as string })
      .subscribe(utilisateur => {  this.user = utilisateur;});
  }

   get fromationCover(): string {
    if (0) {
      return 'data:image/jpg;base64,' ;
    }
    return 'https://lamanu.fr/wp-content/uploads/2022/02/cover-formation-communication-webdesign.svg';
  }



formationClicked(formation: FormationDto) {
   // Check if listeEmpl exists before accessing it
   if (!formation.listEmploye) {
    console.error("'listeEmpl' is undefined. Formation data might be incomplete.");
    return; // Exit the function if listeEmpl is missing
  }
  this.listeEmpl = formation.listEmploye;

  this.selectedFormation = formation;
  this.ispostuler=this.isInList(this.listeEmpl, this.user)
  console.log(this.ispostuler);
}




 isInList(listeEmpl: Utilisateur[], utilisateur: Utilisateur): boolean {
  this.listeEmpl=listeEmpl;
  for (const empl of this.listeEmpl) {
    if (empl.id === utilisateur.id) {
      return true;
    }
  }
  return false;
}

postuler(formation: FormationDto) {
        this.formationService.addEmployeToFormation({
          id: formation.id as number,
          body: this.user.id as number
        }).subscribe(response => {
          console.log('Successfully added user to formation:', response);
        this.ngOnInit();
        }, error => {
          console.error('Error adding user to formation:', error);
        });

}



  addformation(){ 
    const validationErrors = this.validateFormation(this.formationAdd);
    if (validationErrors.length > 0) {
      this.alert = 'alert alert-danger';
      this.Msg = `Fromation non ajouté. Erreurs de validation : ${validationErrors.join(', ')}`;
      return;  // Exit the function if validation fails
    }
    console.log("this.formationAdd",this.formationAdd);
    console.log( "imga",this.img64);
    this.formationAdd={
      ...this.formationAdd,
    }

    this.formationService.add1({body :this.formationAdd}) 
    .subscribe(formation => {
       console.log("formation",formation);
       this.ngOnInit();
       this.Msg = `Formation "${formation.titre}" est ajouté avec succès!`;

       setTimeout(() => {
        this.alert = 'd-none';
        this.Msg = "";
      }, 5000); // Display success message for 5 seconds
    }, error => {
      console.error('Error adding formation:', error);
      this.alert = 'alert alert-danger';
      setTimeout(() => {
        this.alert = 'd-none';
      this.Msg = `Formation non ajouté. Une erreur est survenue : ${error.message || error}`; // Provide a more informative error message
    }, 5000); // Display success message for 5 seconds
  })};
  // Optional validation function (replace with your specific validation logic)
  validateFormation(fromation: any): string[] {
    const errors = [];
    if (!fromation.titre) {
      errors.push('Le titre est obligatoire.');
    }
    if (!fromation.lieu) {
      errors.push('Le lieu est obligatoire.');
    }
    if (!fromation.description) {
      errors.push('Le description est obligatoire.');
    }
    return errors;
  }

}