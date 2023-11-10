import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { PageResultModel } from '../../interfaces';

@Component({
  selector: 'dynamic-page-result',
  templateUrl: './dynamic-page-result.component.html',
  styleUrls: ['./dynamic-page-result.component.scss'],
})
export class DynamicPageResultComponent {
  @Input() set message(info: PageResultModel | null) {
    if (info) {
      this.icon = info.icon;
      this.title = info.title;
      this.subTitle = info?.subTitle ?? undefined;
      this.isShowButton = info.showButton;
      this.buttonLabel = info?.buttonLabel ?? 'Volver';
    }
  }

  @Output() onClickBtn = new EventEmitter<void>()

  public icon: string = '';
  public title: string = '';
  public subTitle: string | undefined = undefined;
  public isShowButton: boolean = false;
  public buttonLabel: string = '';
}
