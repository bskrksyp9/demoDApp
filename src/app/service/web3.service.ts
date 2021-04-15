import { Injectable } from '@angular/core';
import Web3 from 'web3';


declare var require;
declare let window: any;

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  private messageResult: any;

  constructor() {
  }

  public checkAndInstantiateWeb3(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (window.ethereum) {
        this.messageResult = 'connected';
        window.web3 = new Web3(window.ethereum);
        window.ethereum.enable();
        resolve(this.messageResult);
      } else if (window.web3) {
        this.messageResult = 'connected';
        window.web3 = new Web3(window.web3.currentProvider);
        resolve(this.messageResult);
      } else {
        this.messageResult = 'No Ethereum browser detected. you should consider trying MetaMask';
        reject(this.messageResult);
      }
    });
  }

  public loadBlockChainData(): Promise<string> {
    return new Promise((resolve, reject) => {
      const web3 = window.web3;
      const account = web3.eth.getAccounts();

      if (account !== undefined) {
        resolve(account);
      } else {
        this.messageResult = 'There is no account';
        reject(this.messageResult);
      }
    });
  }


  public getEtherBalance(account) {


    return new Promise((resolve) => {
      const web3 = window.web3;
      const balance = web3.eth.getBalance(account)
        .then(bal => {
          resolve(web3.utils.fromWei(bal, 'Ether'));
        });

    });

  }

}
