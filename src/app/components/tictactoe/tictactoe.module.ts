import {MatButtonModule, MatCardModule, MatCheckboxModule} from '@angular/material';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TicTacToeComponent} from './tictactoe.component';
import {BoardService} from './services/board.service';

@NgModule({
  imports: [CommonModule, FormsModule, MatButtonModule, MatCardModule, MatCheckboxModule],
  providers: [BoardService],
  declarations: [TicTacToeComponent],
  exports: [TicTacToeComponent]
})
export class TicTacToeModule {
}
