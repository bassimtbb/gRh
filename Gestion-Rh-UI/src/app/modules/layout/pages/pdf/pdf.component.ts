import { Component, ElementRef, Injectable, ViewChild } from '@angular/core';
import { Demande } from '../../../../services/models';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
export class PdfComponent {
  @ViewChild('Pret', { static: false }) Pret: ElementRef | undefined;
  @ViewChild('Conge', { static: false }) Conge: ElementRef | undefined;
  @ViewChild('ChangementHoraire', { static: false }) ChangementHoraire: ElementRef | undefined;
  @ViewChild('AutorisationTravailSup', { static: false }) AutorisationTravailSup: ElementRef | undefined;
  @ViewChild('AutorisationTeletravail', { static: false }) AutorisationTeletravail: ElementRef | undefined;
  @ViewChild('AutorisationSortie', { static: false }) AutorisationSortie: ElementRef | undefined;
  @ViewChild('Acompte', { static: false }) Acompte: ElementRef | undefined;
  ngAfterViewInit() {
    console.log('Pret element:', this.Pret);
  }
  downloadPdf(demande: Demande) {
    this.ngAfterViewInit();
    let element: ElementRef | undefined;

    switch (demande.type) {
      case "Pret":
        element = this.Pret;
        break;
      case "Conge":
        element = this.Conge;
        break;
      case "ChangementHoraire":
        element = this.ChangementHoraire;
        break;
      case "AutorisationTravailSup":
        element = this.AutorisationTravailSup;
        break;
      case "AutorisationTeletravail":
        element = this.AutorisationTeletravail;
        break;
      case "AutorisationSortie":
        element = this.AutorisationSortie;
        break;
      case "Acompte":
        element = this.Acompte;
        break;
      default:
        console.error('Invalid type');
        return;
    }

    if (element) {
      html2canvas(element.nativeElement).then(canvas => {
        const contentDataURL = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 210;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        pdf.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('filename.pdf');
      }).catch(error => {
        console.error('Error generating PDF', error);
      });
    } else {
      console.error('Element not found');
    }
  }
}
