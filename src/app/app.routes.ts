import { Routes } from '@angular/router';
import { PatientComponent } from './pages/patient/patient.component';
import { MedicComponent } from './pages/medic/medic.component';

export const routes: Routes = [
  {
    path: 'pages/patient',
    component: PatientComponent,
  },
  { path: 'pages/medic', component: MedicComponent },
];
