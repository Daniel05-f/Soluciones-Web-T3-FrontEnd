import { Component, effect, inject, signal, viewChild } from '@angular/core';
import { SpecialtyService } from '../../services/specialty.service';
import { Specialty } from '../../model/specialty';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
  ],
  selector: 'app-specialty',
  styleUrl: './specialty.component.css',
  templateUrl: './specialty.component.html',
})
export class SpecialtyComponent {
  private readonly specialtyService = inject(SpecialtyService);

  protected $dataSource = signal(new MatTableDataSource<Specialty>());
  protected $paginator = viewChild(MatPaginator);
  protected $sort = viewChild(MatSort);
  protected $specialties = this.specialtyService.$specialtiesChange;

  protected displayedColumns: string[] = ['idSpecialty', 'name', 'description'];

  constructor() {
    this.specialtyService.findAll().subscribe((data) => {
      this.specialtyService.setSpecialtyChange(data);
    });

    effect(() => {
      const data = this.$specialties();
      const paginator = this.$paginator();
      const sort = this.$sort();
      const ds = this.$dataSource();

      ds.data = data;
      ds.paginator = paginator;
      ds.sort = sort;
    });
  }

  applyFilter(e: any) {
    const filterValue = e.target.value;
    this.$dataSource().filter = filterValue.trim().toLowerCase();
  }
}
