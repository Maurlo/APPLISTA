import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidatorFn } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PersonService } from '../../service/person.service';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-add-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.scss'],
})
export class AddUserFormComponent implements OnInit {
  userForm: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddUserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { person: Person },
    private personService: PersonService
  ) {
    this.userForm = this.fb.group({
      id: [''],
      firstName: ['', [Validators.required, this.onlyLettersValidator()]],
      lastNameP: ['', [Validators.required, this.onlyLettersValidator()]],
      lastNameM: ['', [Validators.required, this.onlyLettersValidator()]],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    });
  }

  ngOnInit(): void {
    if (this.data && this.data.person) {
      this.isEditMode = true;
      this.userForm.patchValue(this.data.person);
    }
  }

  // Validador personalizado para solo letras
  private onlyLettersValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const onlyLettersRegex = /^[A-Za-zÁáÉéÍíÓóÚúÜüÑñ\s]+$/;
      const valid = onlyLettersRegex.test(control.value);
      return valid ? null : { onlyLetters: { value: control.value } };
    };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const personData: Person = this.userForm.value;

      if (this.isEditMode) {
        this.personService.updatePerson(personData).subscribe({
          next: (response) => {
            console.log('Persona actualizada correctamente:', response);
            this.dialogRef.close(response);
          },
          error: (error) => {
            console.error('Error al actualizar la persona:', error);
          },
        });
      } else {
        this.personService.addPerson(personData).subscribe({
          next: (response) => {
            console.log('Persona agregada correctamente:', response);
            this.dialogRef.close(response);
          },
          error: (error) => {
            console.error('Error al agregar la persona:', error);
          },
        });
      }
    }
  }
}