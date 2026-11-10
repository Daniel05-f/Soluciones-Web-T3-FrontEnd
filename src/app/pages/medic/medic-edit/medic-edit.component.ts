import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MedicService } from '../../../services/medic.service';
import { Medic } from '../../../model/medic';
import { switchMap, tap } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { SpecialtyService } from '../../../services/specialty.service';

@Component({
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    RouterLink,
  ],
  selector: 'app-medic-edit',
  styleUrl: './medic-edit.component.css',
  templateUrl: './medic-edit.component.html',
})
export class MedicEditComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly medicService = inject(MedicService);
  private readonly specialtyService = inject(SpecialtyService);

  protected $specialties = this.specialtyService.$specialtiesChange;

  protected $form = signal(
    new FormGroup({
      idMedic: new FormControl<number | null>(null),
      idSpecialty: new FormControl<number | null>(null, [Validators.required]),
      primaryName: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(70),
      ]),
      surname: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(70),
      ]),
      cmpMedic: new FormControl<string>('', [Validators.required]),
      photo: new FormControl<string>(''),
    }),
  );

  private readonly $params = toSignal(this.route.params, {
    initialValue: {},
  });

  protected $id = computed(() => Number(this.$params()['id']));
  protected $isEdit = computed(() => this.$id() > 0);
  protected $f = computed(() => this.$form().controls);

  constructor() {
    this.specialtyService.findAll().subscribe((data) => {
      this.specialtyService.setSpecialtyChange(data);
    });
    effect(() => {
      const id = this.$id();

      if (id > 0) {
        this.medicService.findById(id).subscribe((data) => this.$form().patchValue(data));
      }
    });
  }

  operate() {
    const form = this.$form();
    const isEdit = this.$isEdit();
    const id = this.$id();

    if (form.invalid) {
      form.markAllAsTouched();
      return;
    }

    const medic: Medic = form.value as Medic;

    const operation$ = isEdit ? this.medicService.update(id, medic) : this.medicService.save(medic);

    operation$
      .pipe(
        switchMap(() => this.medicService.findAll()),
        tap((data) => this.medicService.setMedicChange(data)),
        tap(() => this.medicService.setMessageChange(isEdit ? 'UPDATED' : 'CREATED')),
      )
      .subscribe(() => {
        this.router.navigate(['/pages/medic']);
      });
  }
}
