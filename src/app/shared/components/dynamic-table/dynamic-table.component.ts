import { LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  MatPaginator,
  MatPaginatorIntl,
  PageEvent,
} from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import {
  MatTableDataSource,
  MatTableDataSourcePaginator,
} from '@angular/material/table';
import {
  ColumnsListModel,
  DataSetListModel,
  conditionModel,
  configsTableModel,
} from '@app/shared';

@Component({
  selector: 'dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
})
export class DynamicTableComponent implements OnInit, OnChanges {
  @Input() dataSet: DataSetListModel | null = null;
  @Input() columns: ColumnsListModel[] = [];
  @Input() loading: boolean = false;
  @Input() configs: configsTableModel | null;
  @Input() isShowDisclaimer: boolean = false;
  @Input() isShowActions: boolean = false;
  @Output() pageEvent = new EventEmitter<PageEvent>();
  @Output() selectRowEvent = new EventEmitter<any[]>();
  @Output() buttonsEvent = new EventEmitter<{
    id: string | number;
    data: any;
  }>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ContentChild('actions') actions: TemplateRef<any> | null = null;
  @ContentChild('disclaimer') disclaimer: TemplateRef<any> | null = null;
  fields: string[] = [];
  dataSource: MatTableDataSource<any, MatTableDataSourcePaginator> =
    new MatTableDataSource<any>([]);
  selection: SelectionModel<any> | null = null;
  pageSize: number = 10;

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private matPaginatorIntl: MatPaginatorIntl
  ) {
    this.matPaginatorIntl.itemsPerPageLabel = 'Items por pagina: ';
    this.configs = {
      isPagination: false,
    };
  }

  ngAfterViewInit() {
    if (!this.configs?.isLazy) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.dataSet) {
      const data = ([] as any).concat(this.dataSet.results);
      this.dataSource = new MatTableDataSource<any>(data);
      if (!this.configs?.isLazy) {
        this.dataSource.paginator = this.paginator;
      }
    }
    if (this.columns) {
      this.fields = this.columns.map((c) => c.field);
    }
    if (this.isShowActions) {
      this.fields = this.fields.concat('Actions');
    }

    if (this.configs) {
      if (this.configs.isActiveFilters) {
        this.paginator.firstPage();
      }
    }

    if (this.configs && this.configs.isMultiSelection) {
      this.selection = new SelectionModel<any>(true, []);
    } else {
      this.selection = new SelectionModel<any>(false, []);
    }
    this.selection?.changed.asObservable().subscribe(({ source }) => {
      this.selectRowEvent.emit(source.selected);
    });
  }

  ngOnInit() {
    // this.selection?.changed.asObservable().subscribe(({ source }) => {
    //   this.selectRowEvent.emit(source.selected);
    // });
  }

  isAllSelected() {
    const numSelected = this.selection?.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection?.clear();
      return;
    }

    this.selection?.select(...this.dataSource.data);
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  setValidationButton(row: any, conditions: conditionModel): boolean {
    if (conditions) {
      const { key, value } = conditions;
      if (Array.isArray(value)) {
        const valueRow = row[key as keyof typeof row];

        return value.includes(valueRow);
      } else {
        const valueRow = row[key as keyof typeof row];

        return value == valueRow;
      }
    }

    return true;
  }
}
