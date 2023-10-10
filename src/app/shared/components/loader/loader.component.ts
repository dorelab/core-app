import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: [ './loader.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {
  isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(private loaderService: LoaderService, private ref: ChangeDetectorRef) {
  }

  ngAfterContentChecked() {
    this.ref.detectChanges();
  }
}
