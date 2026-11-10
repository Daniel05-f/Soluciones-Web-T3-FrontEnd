
import { Component, effect, inject, signal, untracked, viewChild } from '@angular/core';
import { MedicService } from '../../services/medic.service';
import { Medic } from '../../model/medic';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSort, MatSortModule } from '@angular/material/sort';
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
    MatSortModule,
    RouterLink,
    RouterOutlet,
  ],
  selector: 'app-medic',
  styleUrl: './medic.component.css',
  templateUrl: './medic.component.html',
})
export class MedicComponent {
  private readonly medicService = inject(MedicService);
  private readonly snackBar = inject(MatSnackBar);

  protected $dataSource = signal(new MatTableDataSource<Medic>());
  protected $paginator = viewChild(MatPaginator);
  protected $sort = viewChild(MatSort);

  protected $medics = this.medicService.$medicsChange;

  protected displayedColumns: string[] = [
    'idMedic',
    'primaryName',
    'surname',
    'cmpMedic',
    'actions',
  ];

  constructor() {
    this.medicService.findAll().subscribe((data) => this.medicService.setMedicChange(data));

    effect(() => {
      const data = this.$medics();
      const p = this.$paginator();
      const s = this.$sort();
      const ds = this.$dataSource();

      ds.data = data;
      ds.paginator = p;
      ds.sort = s;
    });

    effect(() => {
      const message = this.medicService.$messageChange();

      if (message) {
        this.snackBar.open(message, 'INFO', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
        });

        untracked(() => this.medicService.setMessageChange(''));
      }
    });
  }

  applyFilter(e: any) {
    const filterValue = e.target.value;
    this.$dataSource().filter = filterValue.trim().toLowerCase();
  }

  delete(idMedic: number) {
    const ok = window.confirm('Are you sure to delete?');

    if (ok) {
      this.medicService
        .delete(idMedic)
        .pipe(
          switchMap(() => this.medicService.findAll()),
          tap((data) => this.medicService.setMedicChange(data)),
          tap(() => this.medicService.setMessageChange('DELETED')),
        )
        .subscribe();
    }
  }
}

