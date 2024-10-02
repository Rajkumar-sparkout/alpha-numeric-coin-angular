import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { SidebarComponent } from '../../../shared/sidebar/sidebar.component';
import { RouterLink } from '@angular/router';
import { InitiativeService } from '../../../../services/initiative.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../../shared/pagination/pagination.component';

@Component({
  selector: 'app-initiative',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, RouterLink, CommonModule, PaginationComponent],
  templateUrl: './initiative.component.html',
  styleUrl: './initiative.component.css'
})
export class InitiativeComponent implements OnInit{

  public initiativeList: any[] = [];
  public startingIndex: number = 1;
  public currentPage: number = 1;
  public itemsPerPage: number = 10;
  public search: string = '';
  public id: string = '';

  constructor(
    private initiativeService: InitiativeService
  ){}

  ngOnInit(): void {
    this.getAllInitiatives(this.search)
  }

  getAllInitiatives(search: string){
    this.initiativeService.getInitiatives(search, this.itemsPerPage, this.currentPage).subscribe({
      next: (res: any)=> {
        this.initiativeList = res.data.docs;
      },
      error: (error: HttpErrorResponse)=>{
        console.log(error)
      }
    })
  }

  openModal(id: string): void {
    this.id = id;
    const modal = document.getElementById('deleteModal');
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }
  }

  closeModal(): void {
    const modal = document.getElementById('deleteModal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }

  confirmDelete(): void {
    this.initiativeService.deleteInitiativeById(this.id).subscribe({
      next: (res: any)=> {
        this.getAllInitiatives(this.search);
        this.closeModal();
      },
      error: (err: HttpErrorResponse)=> {
        console.log(err);        
      }
    });
  }

}
