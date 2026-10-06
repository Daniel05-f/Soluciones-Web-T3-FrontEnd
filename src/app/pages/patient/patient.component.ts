import { Component, effect, inject, signal, viewChild } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { Patient } from '../../model/patient';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatSort } from '@angular/material/sort';

@Component({
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatButtonModule,
  ],
  selector: 'app-patient',
  styleUrl: './patient.component.css',
  templateUrl: './patient.component.html',
})
export class PatientComponent {
  private readonly patientService = inject(PatientService);
  
  protected $patients = toSignal<Patient[]>(this.patientService.findAll());
  protected $dataSource = signal(new MatTableDataSource<Patient>());
  protected $paginator = viewChild(MatPaginator);
  protected $sort = viewChild(MatSort);

  //@ViewChild(MatPaginator) paginator: MatPaginator;
  //@ViewChild(MatSort) sort: MatSort;

  protected displayedColumns: string[] = ['idPatient', 'firstName', 'lastName', 'dni', 'actions'];

  //Esta escuchando los signals de pacientes, paginador y sort para actualizar la tabla cada vez que haya un cambio
  constructor() {
    effect( () => {
      const data = this.$patients();
      const p = this.$paginator();
      const s = this.$sort();
      const ds = this.$dataSource();
      
      ds.data = data;
      ds.paginator = p;
      ds.sort = s;
    });    
  }


  applyFilter(e: any){
   const filterValue = e.target.value;
   this.$dataSource().filter = filterValue.trim().toLowerCase();
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
