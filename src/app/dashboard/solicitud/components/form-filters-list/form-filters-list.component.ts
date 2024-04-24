import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { RequestService, ITypeRequestModel, RequestFilters, RequestFiltersForm, AlertsService} from '@app/shared';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'form-filters-list',
  templateUrl: './form-filters-list.component.html',
  styleUrls: ['./form-filters-list.component.scss']
})

export class FormFiltersListComponent implements OnInit {
  private _RequestService: RequestService = inject(RequestService);
  private _AlertsService: AlertsService = inject(AlertsService);
  public listTypesRequest: ITypeRequestModel[] = [];
  public formFilter!: FormGroup<RequestFiltersForm>;
  private _fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  public date = null;
  public showClean: boolean = false;
  @Input() idUserLogin: number = 0;
  @Output() onFilter = new EventEmitter();
  datesRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  get formControls() {
    return this.formFilter.controls;
  }

  ngOnInit(): void {
    this._buildForm();
    this._getListTypesRequests();
    // this.handleFilter();
  }

  private _buildForm(): void {
    this.formFilter = this._fb.group<RequestFiltersForm>(
      {
        consejero__id: this._fb.control(this.idUserLogin, {validators: [Validators.required]}),
        tipo: this._fb.control('', { validators: []}),
        search: this._fb.control('', { validators: []}),
        fecha_solicitud__lte: this._fb.control('', { validators: []}),
        fecha_solicitud__gte: this._fb.control('', { validators: []})
      }
    );
  }

  private _getListTypesRequests(): void {
    this._RequestService.getTypesRequests().subscribe({
      next: (data) => {
        this.listTypesRequest = data;
      },
    });
  }

  handleFilter() {
    const rangeDates = this.datesRange.value;
    let filters: any = {};

    if(this.datesRange.invalid || (rangeDates.start !== null && rangeDates.end === null) || (rangeDates.start === null && rangeDates.end !== null)) {
      this._AlertsService.openSnackBar('¡Por favor, ingrese un rango de fechas correcto!', 'error');
      return;
    }

    for (const key in this.formFilter.getRawValue()) {
      if (this.formFilter.get(key)?.value) {
        filters = {
          ...filters,
          [key]: this.formFilter.get(key)?.value,
        };

        if (key === 'rangeDates') {
          filters['fecha_solicitud__gte'] = rangeDates.start ? moment(rangeDates.start).format('YYYY-MM-DD') : '';
          filters['fecha_solicitud__lte'] = rangeDates.end ? moment(rangeDates.end).format('YYYY-MM-DD') : '';
      
        }
      }
    }

    if (rangeDates.start) {
      filters['fecha_solicitud__gte'] = moment(rangeDates.start).format('YYYY-MM-DD');
    }

    if (rangeDates.end) {
      filters['fecha_solicitud__lte'] = moment(rangeDates.end).format('YYYY-MM-DD');
    }

    this.showClean = Object.keys(filters).length > 1 ? true : false;

    this.onFilter.emit({filters, loadListFinish: false});
  }

  clearFilter() {
    this.formFilter.reset();
    this.formFilter.controls['consejero__id'].setValue(this.idUserLogin);
    this.handleFilter();
  }
}
