export interface IApiResponseCommon {
  readonly count: number;
  readonly next: null | string;
  readonly previous: null | string;
  readonly results: any;
}

export interface IApiResponseMessageCommon{
  readonly success: number;
  readonly message: string;
}


export interface IApiResponseDetailKey{
  readonly id:number;
  readonly nombre:string;
}
