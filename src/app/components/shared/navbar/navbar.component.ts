import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { WalletService } from '../../../services/wallet.service';
import { ToasterComponent } from '../toaster/toaster.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, ToasterComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NavbarComponent {

  public isDropdownOpen: boolean = false;
  public message: string = '';
  public messageType: 'success' | 'error' = 'success';

  constructor(private walletService: WalletService){}

  toggleDropdown(){
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout(){
    this.walletService.logout().subscribe({
      next: (res: any)=> {
        localStorage.clear();
        this.message = res.message;
        this.messageType = 'success';
      }
    })
  }

}
