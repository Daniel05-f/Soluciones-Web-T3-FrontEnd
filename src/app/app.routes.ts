import { Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { PatientComponent } from './pages/patient/patient.component';
import { PatientEditComponent } from './pages/patient/patient-edit/patient-edit.component';
import { MedicComponent } from './pages/medic/medic.component';
import { MedicEditComponent } from './pages/medic/medic-edit/medic-edit.component';
import { SpecialtyComponent } from './pages/specialty/specialty.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'pages/patient',
        component: PatientComponent,
        children: [
          { path: 'new', component: PatientEditComponent },
          { path: 'edit/:id', component: PatientEditComponent },
        ],
      },
      {
        path: 'pages/medic',
        component: MedicComponent,
        children: [
          { path: 'new', component: MedicEditComponent },
          { path: 'edit/:id', component: MedicEditComponent },
        ],
      },
      {
        path: 'pages/specialty',
        component: SpecialtyComponent,
      },
    ],
  },
];
