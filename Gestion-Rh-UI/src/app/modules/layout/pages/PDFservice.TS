import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PDFservice {
  private baseUrl = 'http://localhost:8081'; // Replace this with your backend base URL

  constructor(private http: HttpClient) { }

  downloadPdf(demandeId: number, typeDemande: string): Observable<Blob> {
    const url = `${this.baseUrl}/demande/pdf/${demandeId}?typeDemande=${typeDemande}`;
    
    // Set responseType to 'blob' to receive binary data
    return this.http.get(url, { responseType: 'blob' });
  }

  // Other methods for CRUD operations on demands
}
