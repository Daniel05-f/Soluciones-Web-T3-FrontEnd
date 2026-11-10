import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Medic } from '../model/medic';

@Injectable({
  providedIn: 'root',
})
export class MedicService {
  private url = `${environment.HOST}/v1/medics`;

  private readonly http = inject(HttpClient);

  private readonly _medics = signal<Medic[]>([]);
  private readonly _message = signal<string>('');

  readonly $medicsChange = this._medics.asReadonly();
  readonly $messageChange = this._message.asReadonly();

  findAll() {
    return this.http.get<Medic[]>(this.url);
  }

  findById(id: number) {
    return this.http.get<Medic>(`${this.url}/${id}`);
  }

  save(medic: Medic) {
    return this.http.post(this.url, medic);
  }

  update(id: number, medic: Medic) {
    return this.http.put(`${this.url}/${id}`, medic);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  setMedicChange(data: Medic[]) {
    this._medics.set(data);
  }

  setMessageChange(msg: string) {
    this._message.set(msg);
  }
}
