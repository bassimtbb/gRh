import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import {  Demande,} from '../../services/models';

@Injectable({
  providedIn: 'root'
})
export class PDFservice {
  @ViewChild('content') content: ElementRef | undefined;

 downloadPdf(demande : Demande){
  let type = "";
   pdfDown:Blob;


  switch(demande.type) {
    case "Pret":
      type = "PRET";
      break;
    case "Conge":
      type = "CONGE";
      break;
    case "ChangementHoraire":
      type = "CHANGEMENT_HORAIRE";
      break;
    case "AutorisationTravailSup":
      type = "AUTORISATION_TRAVAIL_SUP";
      break;
    case "AutorisationTeletravail":
      type = "AUTORISATION_TELETRAVAIL";
      break;
    case "AutorisationSortie":
      type = "AUTORISATION_SORTIE";
      break;
    case "Acompte":
      type = "ACOMPTE";
      break;
    default:
      type = "UNKNOWN";
      break;
  }



    html2canvas(this.content!.nativeElement).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jspdf.jsPDF();
      const imgWidth = 210;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      pdf.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('filename.pdf');
    });
  


}

}