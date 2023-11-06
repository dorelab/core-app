import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ListData } from '../../_class';
import { MatListOption } from '@angular/material/list';

@Component({
  selector: 'dynamic-list',
  templateUrl: './dynamic-list.component.html',
  styleUrls: ['./dynamic-list.component.less'],
})
export class DynamicListComponent implements OnChanges {
  @Input({required:true}) dataSet: ListData | null = null;
  @Input({required:true}) field:string = 'nombre'
  @Input() lazy: boolean = false;
  @Input() header:string | null=null;
  @Output() pageEvent = new EventEmitter<PageEvent>();
  @Output() onChecked = new EventEmitter<any[]>();
  public displayData: any[] = [];
  public selected: any;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.dataSet && !this.lazy) {
      this.displayData = this.dataSet.enabledPagination
        ? this.dataSet.results.slice(0, this.dataSet.page_size)
        : this.dataSet.results;
    } else if (this.dataSet && this.lazy) {
      this.displayData = this.dataSet.results;
    }
  }

  pageChange(event: PageEvent) {
    if (!this.lazy) {
      let startIndex = event.pageIndex * event.pageSize;
      let endIndex = startIndex + event.pageSize;
      if (endIndex > this.dataSet!.count) {
        endIndex = this.dataSet!.count;
      }
      this.displayData = this.dataSet?.results.slice(
        startIndex,
        endIndex
      ) as any[];
    } else {
      this.pageEvent.emit(event);
    }
  }

  checked(valuesSelected: any){
    const values = valuesSelected.map((o: { id: number; }) => o.id);
    this.onChecked.emit(values);
  }

}
