import { inject, Service, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../model/patient';

@Service()
export class PatientService {

  private url = `${environment.HOST}/v1/patients`;

  //constructor(private http: HttpClient) {}
  private readonly http = inject(HttpClient);

  private readonly _patients = signal<Patient[]>([]);
  private readonly _message = signal<string>('');

  readonly $patientsChange = this._patients.asReadonly();
  readonly $messageChange = this._message.asReadonly();

  findAll(){    
    return this.http.get<Patient[]>(this.url);
  }

  findById(id: number){
    return this.http.get<Patient>(`${this.url}/${id}`);
  }

  save(patient: Patient){
    return this.http.post(this.url, patient);
  }

  update(id: number, patient: Patient){
    return this.http.put(`${this.url}/${id}`, patient);
  }

  delete(id: number){
    return this.http.delete(`${this.url}/${id}`);
  }

  ////set////
  setPatientChange(data: Patient[]){
    this._patients.set(data);
  }

  setMessageChange(msg: string){
    this._message.set(msg);
  }
}
