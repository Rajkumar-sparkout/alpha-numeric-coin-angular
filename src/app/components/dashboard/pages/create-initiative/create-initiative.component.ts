import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { InitiativeService } from '../../../../services/initiative.service';
import { Initiative } from '../../../../interfaces/common';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToasterComponent } from '../../../shared/toaster/toaster.component';


@Component({
  selector: 'app-create-initiative',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, NavbarComponent, SidebarComponent, ToasterComponent],
  templateUrl: './create-initiative.component.html',
  styleUrl: './create-initiative.component.css'
})
export class CreateInitiativeComponent implements OnInit{

  public isOpen: boolean = false;
  public message: string = '';
  public messageType: 'success' | 'error' = 'success';

  constructor(
    private initiativeService: InitiativeService,
    private route: Router,
  ){}

  ngOnInit(): void {
    
  }

  initiativeForm = new FormGroup({
    initiativeName: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    identifier: new FormControl('', Validators.required),
    walletAddress: new FormControl('', Validators.required)
  });

  get formControl(){
    return this.initiativeForm.controls;
  }

  toggleDatePicker() {
    this.isOpen = !this.isOpen;
  }

  initiative: Initiative = new Initiative()
  createInitiative(){
    if(this.initiativeForm.valid){
      this.initiative.initiative = JSON.parse(JSON.stringify(this.initiativeForm.value.initiativeName)); 
      this.initiative.start_period = JSON.parse(JSON.stringify(this.initiativeForm.value.startDate)); 
      this.initiative.end_period = JSON.parse(JSON.stringify(this.initiativeForm.value.endDate)); 
      this.initiative.identifier = JSON.parse(JSON.stringify(this.initiativeForm.value.identifier)); 
      this.initiative.wallet_address = JSON.parse(JSON.stringify(this.initiativeForm.value.walletAddress)); 
      this.initiativeService.createInitiative(this.initiative).subscribe({
        next: (res: any)=> {
          this.message = res.message;
          this.messageType = 'success';
          setTimeout(()=> {
            this.route.navigate(['/dashboard'])
          },700)
        },
        error: (err: HttpErrorResponse)=> {
          console.log(err);
          this.message = 'Initiative created failed';
          this.messageType = 'error';
        }
      })
    }
  }
}
