import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { Web3Service } from './service/web3.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  accountNumber: any;

  balance: any;
  constructor(private web3: Web3Service, private cd: ChangeDetectorRef) {

    this.web3.checkAndInstantiateWeb3()
      .then((checkConn: any) => {
        if (checkConn === 'connected') {
          this.web3.loadBlockChainData()
            .then((accountData: any) => {
              this.accountNumber = accountData[0];
              this.web3.getEtherBalance(this.accountNumber)
                .then((data: any) => {
                  this.balance = Number(data).toFixed(2);
                  console.log(data);
                });


            }, err => {
              console.log('account error', err);
            });
        }
      }, err => {
        alert(err);
      });
  }

  ngOnInit() {
    // Try fetch initial values 
  }




}
