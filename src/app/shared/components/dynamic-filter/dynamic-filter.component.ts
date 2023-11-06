import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'dynamic-filter',
  templateUrl: './dynamic-filter.component.html',
  styleUrls: ['./dynamic-filter.component.less']
})
export class DynamicFilterComponent {
  @Input() header:string | null=null;
  @Output() onSearch = new EventEmitter<string>();
  @Output() onClearSearch = new EventEmitter<void>();

  public query: string = '';
  public isFilter: boolean = false;

  search(){
    this.onSearch.emit(this.query);
    this.isFilter = true;
  }

  clearSearch(){
    this.onClearSearch.emit();
    this.isFilter = false;
    this.query = '';
  }
}
