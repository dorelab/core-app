import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { IAPISummarySession } from '@app/shared';

@Component({
  selector: 'table-attendance',
  templateUrl: './table-attendance.component.html',
  styleUrls: ['./table-attendance.component.scss'],
})
export class TableAttendanceComponent implements OnChanges {
  @Input({ required: true }) dataSet: any[] = [];
  public dataSource: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (this.dataSet) {
      console.log(this.dataSet);
      this.dataSource = this.dataSet;
      console.log(this.dataSource);
    }
  }
}
