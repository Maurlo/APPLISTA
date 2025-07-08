import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatTableDataSource } from "@angular/material/table";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { PersonService } from "../../service/person.service";
import { Person } from "../../models/person.model";
import { ChangeDetectorRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AddUserFormComponent } from '../add-user-form/add-user-form.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonModule } from "@angular/common";
import { MatPaginatorModule } from '@angular/material/paginator';


@Component({
  selector: "app-person",
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    AddUserFormComponent,
    MatPaginatorModule, 
    MatSort,
  ],
  templateUrl: "./person.component.html",
  styleUrls: ["./person.component.scss"],
  
})
export class PersonComponent implements OnInit {
  dataSource = new MatTableDataSource<Person>([]); 
  displayedColumns: string[] = [
    "id",
    "firstName",
    "lastNameP",
    "lastNameM",
    "address",
    "phone",
    "actions",
  ];
  personForm: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private personService: PersonService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) {
    this.personForm = this.fb.group({
      firstName: [""],
      lastNameP: [""],
      lastNameM: [""],
      address: [""],
      phone: [""],
    });
  }

  ngOnInit(): void {
    this.loadPersons();
  
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  
    this.dataSource.filterPredicate = (data: Person, filter: string) => {
      const fullName = `${data.firstName} ${data.lastNameP} ${data.lastNameM}`.toLowerCase();
      return fullName.includes(filter);
    };
  }

  loadPersons(): void {
    this.personService.getPersons().subscribe({
      next: (persons) => {
        this.dataSource.data = persons;
        this.dataSource.paginator = this.paginator; 
        this.dataSource.sort = this.sort; 
      },
      error: (error) => {
        console.error("Error al cargar las personas:", error);
      },
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deletePerson(id: string): void {
    console.log("ID a eliminar:", id); 
    console.log("Tipo de ID:", typeof id); 

    this.personService.deletePerson(id).subscribe({
      next: () => {
        console.log("Persona eliminada correctamente");
        this.dataSource.data = this.dataSource.data.filter((person) => person.id !== id);
      },
      error: (error) => {
        console.error("Error al eliminar la persona:", error);
      },
    });
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserFormComponent, {
      width: '600px',
      panelClass: ['custom-dialog', 'mat-mdc-dialog'],
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo se cerró');
      this.loadPersons(); 
    });
  }

  openEditUserDialog(person: Person): void {
    const dialogRef = this.dialog.open(AddUserFormComponent, {
      width: '600px',
      panelClass: ['custom-dialog', 'mat-mdc-dialog'],
      data: { person: person }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('El diálogo de edición se cerró');
      this.loadPersons();
    });
  }
  
}
