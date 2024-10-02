import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { WalletService } from '../../services/wallet.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../environment/environment';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi';
import * as wagmiConfig from '../../configurations/wagmi.config';
import { Router, RouterLink } from '@angular/router';
import { switchNetwork, watchAccount, watchNetwork } from '@wagmi/core';
import { interval, takeUntil, Observable, firstValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ToasterComponent } from '../shared/toaster/toaster.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ToasterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements OnInit{

  public message: string = '';
  public messageType: 'success' | 'error' = 'success';

  constructor(
    private router: Router,
    private walletService: WalletService,
  ){}

  ngOnInit(): void {
    this.wagmiConfiguration();
  }

  public wagmiConfiguration() {
    const projectId = environment.WALLET_CONNECT_PROJECT_ID;
    const modal = createWeb3Modal({
      wagmiConfig: defaultWagmiConfig(wagmiConfig.config.metaData),
      projectId,
      themeMode: 'light',
      enableAnalytics: wagmiConfig.config.enableAnalytics, 
      themeVariables: wagmiConfig.config.themeVariables,
    });

    watchAccount(async (account)=> {
      console.log("account address----->" +account.address)
      if(account.address){
        try{
          await this.walletService.sendAccountAddress(account.address).subscribe({
            next: (res: any)=> {
              const token = res?.data?.session?.session_token;
              localStorage.setItem('authToken', token)
              // setTimeout(()=> {
              //   this.message = res.message;
              //   this.messageType = 'success';
              // },700)
              this.router.navigate(['/dashboard']);
            }, error: (err: HttpErrorResponse) => {
              console.log(err);
            }
          });
        }catch(err){
          console.log("error",err)
        }
      }else {
        this.router.navigate([''])
      }
    })
  }

}
