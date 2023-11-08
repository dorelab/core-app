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
        tipo: this._fb.control([], { validators: []}),
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

    if(this.datesRange.invalid || (rangeDates.start !== null && rangeDates.end === null) || (rangeDates.start === null && rangeDates.end !== null)) {
      this._AlertsService.openSnackBar('¡Por favor, ingrese un rango de fechas correcto!', 'error');
      return;
    }

    const filters = this.formFilter.value;
    filters.fecha_solicitud__gte = rangeDates.start ? moment(rangeDates.start).format('YYYY-MM-DD') : '';
    filters.fecha_solicitud__lte = rangeDates.end ? moment(rangeDates.end).format('YYYY-MM-DD') : '';

    this.onFilter.emit({filters, loadListFinish: false});
  }
}
