import { Component } from '@angular/core';

@Component({
  selector: 'app-seat-booking',
  templateUrl: './seat-booking.component.html',
  styleUrls: ['./seat-booking.component.scss']
})
export class SeatBookingComponent {
  seatMap = [
    ["O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O"],
    ["O", "O", "O", "O", "O", "O", "O", "O"]
  ];
  selectedSeats: any[] =[];
  selectedNumSeats: any;

  allocateSeats(numSeats: number) {
    let allocatedSeats = [];
    for (let i = 0; i < this.seatMap.length; i++) {
      const emptySeatIndices = this.getEmptySeatIndices(this.seatMap[i]);

      if (numSeats === 4 && emptySeatIndices.length >= 4) {
        const startIndex = Math.floor((emptySeatIndices.length - 4) / 2);
        for (let j = startIndex; j < startIndex + 4; j++) {
          this.seatMap[i][emptySeatIndices[j]] = 'X';
          allocatedSeats.push({ row: i, seat: emptySeatIndices[j] });
        }
        break;
      } else if (numSeats === 3) {
        const startIndex = Math.floor((this.seatMap[i].length - 3) / 2);
        let emptySeatIndices = [];
        for (let j = startIndex; j < startIndex + 3; j++) {
          if (this.seatMap[i][j] === 'O') {
            emptySeatIndices.push(j);
          } else {
            emptySeatIndices = [];
            break;
          }
        }
        if (emptySeatIndices.length === 3) {
          for (let j = startIndex; j < startIndex + 3; j++) {
            this.seatMap[i][j] = 'X';
            allocatedSeats.push({ row: i, seat: j });
          }
          break;
        }
      } else if (numSeats === 2) {
        if (emptySeatIndices.includes(0) && emptySeatIndices.includes(1)) {
          this.seatMap[i][0] = 'X';
          this.seatMap[i][1] = 'X';
          allocatedSeats.push({ row: i, seat: 0 });
          allocatedSeats.push({ row: i, seat: 1 });
          break;
        } else if (
          emptySeatIndices.includes(this.seatMap[i].length - 1) &&
          emptySeatIndices.includes(this.seatMap[i].length - 2)
        ) {
          const lastIndex = this.seatMap[i].length - 1;
          this.seatMap[i][lastIndex] = 'X';
          this.seatMap[i][lastIndex - 1] = 'X';
          allocatedSeats.push({ row: i, seat: lastIndex });
          allocatedSeats.push({ row: i, seat: lastIndex - 1 });
          break;
        }
      } else if (numSeats === 1) {
        for (let j = 0; j < this.seatMap[i].length; j++) {
          if (this.seatMap[i][j] === 'O') {
            this.seatMap[i][j] = 'X';
            allocatedSeats.push({ row: i, seat: j });
            break;
          }
        }
        if (allocatedSeats.length > 0) {
          break;
        }
      }
    }
    this.selectedSeats = allocatedSeats;
  }

  getEmptySeatIndices(seatRow: any[]) {
    return seatRow.reduce((emptySeatIndices, seat, index) => {
      if (seat === 'O') {
        emptySeatIndices.push(index);
      }
      return emptySeatIndices;
    }, []);
  }

  selectNumSeats(numSeats: number) {
    this.selectedNumSeats = numSeats;
    this.allocateSeats(numSeats);
  }

  isSeatSelected(row: number, seat: number): boolean {
    return this.selectedSeats.some(s => s.row === row && s.seat === seat);
  }
}