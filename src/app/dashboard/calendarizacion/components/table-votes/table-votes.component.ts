import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { EnvironmentModel, IVotesIniciative } from '@app/shared';
import { ENVIRONMENT } from 'src/environments/environment';

@Component({
  selector: 'table-votes',
  templateUrl: './table-votes.component.html',
  styleUrls: ['./table-votes.component.scss'],
})
export class TableVotesComponent implements OnChanges {
  @Input({ required: true }) dataSet: IVotesIniciative[] = [];
  public dataSource: IVotesIniciative[] = [];
  private _env: EnvironmentModel = inject(ENVIRONMENT);

  ngOnChanges(changes: SimpleChanges): void {
    if (this.dataSet) {
      this.dataSource = this.dataSet;
    }
  }
}
