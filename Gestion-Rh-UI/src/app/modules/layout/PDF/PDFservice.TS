import { Component, ElementRef, Injectable, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import {  Demande,} from '../../../services/models';

@Injectable({
  providedIn: 'root'
})
@Component({
  templateUrl: './Pdf.html',
})
export class PDFservice {







  @ViewChild('Pret') Pret: ElementRef | undefined;
  @ViewChild('Conge') Conge: ElementRef | undefined;
  @ViewChild('ChangementHoraire') ChangementHoraire: ElementRef | undefined;
  @ViewChild('AutorisationTravailSup') AutorisationTravailSup: ElementRef | undefined;
  @ViewChild('AutorisationTeletravail') AutorisationTeletravail: ElementRef | undefined;
  @ViewChild('AutorisationSortie') AutorisationSortie: ElementRef | undefined;
  @ViewChild('Acompte') Acompte: ElementRef | undefined;

 downloadPdf(demande : Demande){
  let type :any;
  switch(demande.type) {
    case "Pret":
      type = this.Pret!.nativeElement;
      break;
    case "Conge":
      type = this.Conge!.nativeElement;
      break;
    case "ChangementHoraire":
      type = this.ChangementHoraire!.nativeElement;
      break;
    case "AutorisationTravailSup":
      type = this.AutorisationTravailSup!.nativeElement;
      break;
    case "AutorisationTeletravail":
      type = this.AutorisationTeletravail!.nativeElement;
      break;
    case "AutorisationSortie":
      type = this.AutorisationSortie!.nativeElement;
      break;
    case "Acompte":
      type = this.Acompte!.nativeElement;
      break;
    default:
      type = "UNKNOWN";
      break;
  }
    html2canvas(type).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf.jsPDF();
      const imgWidth = 210;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      pdf.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('filename.pdf');
    });
}

}