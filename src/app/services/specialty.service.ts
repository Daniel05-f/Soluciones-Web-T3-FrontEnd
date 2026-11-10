import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Specialty } from '../model/specialty';

@Injectable({
  providedIn: 'root',
})
export class SpecialtyService {
  private url = `${environment.HOST}/v1/specialties`;
  private readonly http = inject(HttpClient);

  private readonly _specialties = signal<Specialty[]>([]);
  readonly $specialtiesChange = this._specialties.asReadonly();

  findAll() {
    return this.http.get<Specialty[]>(this.url);
  }

  setSpecialtyChange(data: Specialty[]) {
    this._specialties.set(data);
  }
}
