import { Component } from '@angular/core';

@Component({
  selector: 'app-atm-machine',
  templateUrl: './atm-machine.component.html',
  styleUrls: ['./atm-machine.component.scss'],
})
export class ATMMachineComponent {
  notes : notes []= [
    { value: 2000, count: 0, deposite: 0 },
    { value: 500, count: 0, deposite: 0 },
    {value : 300, count:0, deposite : 0},
    { value: 200, count: 0, deposite: 0 },
    { value: 100, count: 0, deposite: 0 },
  ];

  withdrawLog: any[] = [];
  depositeLog: any[] = [];
  errorLog: any[] = [];

  totalAmt = 0;

  deposite() {
    let totalDeposited = 0;

    this.notes.forEach((note) => {
      if (note.deposite >= 0) {
        note.count += Number(note.deposite);
        totalDeposited += Number(note.deposite) * note.value;
        note.deposite = 0;
      }
    });

    if (totalDeposited > 0) {
      this.depositeLog.unshift({
        dateTime: new Date(),
        type: 'Deposit',
        amount: totalDeposited,
      })
    }else{
      this.errorLog.unshift({
        msg: 'Cannot Deposit',
        dateTime: new Date(),
      });
    }
    this.totalAmt += totalDeposited;
  }

  withdrawAmount!: number;

  withdrawAmt() {
    if (
      this.totalAmt > 0 &&
      this.withdrawAmount >= 100 &&
      this.totalAmt >= this.withdrawAmount
    ) {
      let remainingWithdrawAmount = this.withdrawAmount;
      let canWithdraw = true;

      const notesToDeduct: any = {};

      for (let note of this.notes) {
        if (note.count > 0) {
          const notesToWithdraw = Math.min(
            Math.floor(remainingWithdrawAmount / note.value),
            note.count
          );

          if (notesToWithdraw > 0) {
            notesToDeduct[note.value] = notesToWithdraw;
            // console.log("obj :",notesToDeduct, notesToDeduct[note.value])
            remainingWithdrawAmount -= notesToWithdraw * note.value;
          }

          if (remainingWithdrawAmount === 0) {
            break;
          }
        }
      }

      if (remainingWithdrawAmount > 0) {
        canWithdraw = false;
      }

      if (canWithdraw) {
        let withdrawNotes = '';
        for (let note of this.notes) {
          if (notesToDeduct[note.value]) {
            note.count -= notesToDeduct[note.value];
            withdrawNotes += `${note.value} :${notesToDeduct[note.value]} `
          }
        }

        this.totalAmt -= this.withdrawAmount;

        this.withdrawLog.unshift({
          dateTime: new Date(),
          type: 'Withdrawal',
          amount: this.withdrawAmount,
          noteCounter : withdrawNotes
        });
      } else {
        this.errorLog.unshift({
          msg: 'Cannot Withdraw',
          dateTime: new Date(),
        });
      }
    } else {
      this.errorLog.unshift({
        msg: 'Cannot Withdraw',
        dateTime: new Date(),
      });
    }
    this.withdrawAmount = 0;
  }




}

interface notes{
  value : number,
  count : number,
  deposite : number,
}
