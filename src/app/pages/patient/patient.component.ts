import { Component, effect, inject, signal, untracked, viewChild } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../model/patient';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSort } from '@angular/material/sort';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, tap } from 'rxjs';

@Component({
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterOutlet,
    RouterLink,
  ],
  selector: 'app-patient',
  styleUrl: './patient.component.css',
  templateUrl: './patient.component.html',
})
export class PatientComponent {
  
  private readonly patientService = inject(PatientService);
  private readonly snackBar = inject(MatSnackBar);
  
  //protected $patients = toSignal<Patient[]>(this.patientService.findAll());
  protected $dataSource = signal(new MatTableDataSource<Patient>());
  protected $paginator = viewChild(MatPaginator);
  protected $sort = viewChild(MatSort);

  //@ViewChild(MatPaginator) paginator: MatPaginator;
  //@ViewChild(MatSort) sort: MatSort;

  //Enlaza con el signal del service para que cada vez que haya un cambio en los pacientes, se actualice la tabla
  protected $patients = this.patientService.$patientsChange;
  // protected $patients = this.patientService.$listChange;

  protected displayedColumns: string[] = ['idPatient', 'firstName', 'lastName', 'dni', 'actions'];

  //Esta esuchando los signals de pacientes, paginador y sort para actualizar la tabla cada vez que haya un cambio
  constructor() {
    this.patientService.findAll().subscribe(data => this.patientService.setPatientChange(data));

    effect( () => {
      const data = this.$patients();
      const p = this.$paginator();
      const s = this.$sort();
      const ds = this.$dataSource();
      
      ds.data = data;
      ds.paginator = p;
      ds.sort = s;
    });    

    effect(() => {
      const message = this.patientService.$messageChange();
      if(message){
        this.snackBar.open(message, 'INFO', {duration: 2000, horizontalPosition: 'right', verticalPosition: 'top'});
        //this.patientService.setMessageChange('');
        //esta limpieza no activa el rastreo del effect, no entra a un bucle infinito
        untracked( () => this.patientService.setMessageChange('') );
      }
    });
  }


  applyFilter(e: any){
   const filterValue = e.target.value;
   this.$dataSource().filter = filterValue.trim().toLowerCase();
  }

  delete(idPatient: number){
    const ok = window.confirm('Are you sure to delete?');
    if(ok){
      this.patientService.delete(idPatient)
      .pipe(
        switchMap( () => this.patientService.findAll() ),
        tap( data => this.patientService.setPatientChange(data) ),
        tap( () => this.patientService.setMessageChange('DELETED') )
      )
      .subscribe();
    }
  }


  /**
   *  //protected patients: Patient[] = [];
  protected $dataSource = signal(new MatTableDataSource<Patient>());
  //protected dataSource2$ = new Observable<MatTableDataSource<Patient>>();
  protected displayedColumns: string[] = ['idPatient', 'firstName', 'lastName', 'dni'];

  private readonly patientService = inject(PatientService);

  /*ngOnInit(): void {
    this.patientService.findAll().subscribe(data => {
      this.$dataSource.set(new MatTableDataSource<Patient>(data));
    });
  }*/ 
}
