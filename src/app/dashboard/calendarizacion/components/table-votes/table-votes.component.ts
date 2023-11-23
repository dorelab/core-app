import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { IVotesIniciative } from '@app/shared';

@Component({
  selector: 'table-votes',
  templateUrl: './table-votes.component.html',
  styleUrls: ['./table-votes.component.scss'],
})
export class TableVotesComponent implements OnChanges {
  @Input({ required: true }) dataSet: IVotesIniciative[] = [];
  public dataSource: IVotesIniciative[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (this.dataSet) {
      console.log(this.dataSet);
      this.dataSource = this.dataSet;
    }
  }
}
