import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PatientService } from '../../../services/patient.service';
import { Patient } from '../../../model/patient';
import { switchMap, tap } from 'rxjs';

@Component({
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],
  selector: 'app-patient-edit',
  styleUrl: './patient-edit.component.css',
  templateUrl: './patient-edit.component.html',
})
export class PatientEditComponent {
  private readonly route= inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly patientService = inject(PatientService);

  protected $form = signal(new FormGroup({
    idPatient: new FormControl<number | null>(null),
    firstName: new FormControl<string>(''),
    lastName: new FormControl<string>(''),
    dni: new FormControl<string>(''),
    address: new FormControl<string>(''),
    phone: new FormControl<string>(''),
    email: new FormControl<string>('')
  }));

  private readonly $params = toSignal(this.route.params, { initialValue: {} });
  protected $id = computed(() => this.$params()['id']);
  protected $isEdit = computed(() => !!this.$id()); //En JS es como decir  !! ¿Existe realmente este dato?, devuelve true o false
  protected $f = computed(() => this.$form().controls);

  constructor() {
    effect(() => {
      const id = this.$id();
      if(id){
        this.patientService.findById(id).subscribe(data => this.$form().patchValue(data));
      }
    });
  }

  /*ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      console.log('ID:', id);
    });
  }*/

  operate(){
    const form = this.$form();
    const isEdit = this.$isEdit();
    const id = this.$id();

    // if(form.invalid) return;

    const patient: Patient = form.value as Patient;
    /*const patient: Patient = new Patient();
    patient.idPatient = form.value.idPatient;
    patient.firstName = form.value.firstName;
    patient.lastName = form.value.lastName;
    patient.dni = form.value.dni;
    patient.address = form.value.address;
    patient.phone = form.value.phone;
    patient.email = form.value.email;*/

    const operation$ = isEdit ? this.patientService.update(id, patient) : this.patientService.save(patient);

    operation$.pipe(
      switchMap(() => this.patientService.findAll()),
      tap(data => this.patientService.setPatientChange(data)),
      tap(() => this.patientService.setMessageChange(isEdit ? 'UPDATED' : 'CREATED'))
    )
    .subscribe(() => {
      this.router.navigate(['/pages/patient']);
    });
    
  }
}
