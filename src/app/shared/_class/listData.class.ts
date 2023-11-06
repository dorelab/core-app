import { ListDataModel } from '../interfaces';

export class ListData implements ListDataModel {
  public count: number;
  public page_size: number;
  public enabledPagination: boolean;
  public results: any[];

  constructor(
    private data: any,
    private showPagination: boolean = true,
    private pageSize: number = 5
  ) {
    this.page_size = pageSize;
    this.enabledPagination = showPagination;
    if (Array.isArray(data)) {
      this.count = data.length;
      this.results = ([] as any[]).concat(data);

    } else {
      this.count = data.count;
      this.results = ([] as any[]).concat(data.results);
    }
  }
}
