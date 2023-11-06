import { IApiResponseCommon } from '../interfaces';

export class TableData implements IApiResponseCommon {
  public count: number;
  public next: string | null;
  public previous: string | null;
  public results: any[];

  constructor(private _data: any) {
    if (Array.isArray(_data)) {
      this.count = _data.length;
      this.next = null;
      this.previous = null;
      this.results = ([] as any[]).concat(_data);
    } else {
      //TODO:IMPLEMENTAR
      this.count = _data.count;
      this.next = _data.next;
      this.previous = _data.previous;
      this.results = ([] as any[]).concat(_data.results);
    }
  }

  upDateResults(data: any[]) {
    this.results = ([] as any[]).concat(data);
    this.count = data.length;
  }
}
