import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../model/patient';

@Service()
export class PatientService {

  private url = `${environment.HOST}/v1/patients`;

  //constructor(private http: HttpClient) {}
  private readonly http = inject(HttpClient);

  findAll(){    
    return this.http.get<Patient[]>(this.url);
  }
}
