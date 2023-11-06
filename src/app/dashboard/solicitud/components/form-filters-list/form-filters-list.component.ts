import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { RequestService, ITypeRequestModel, RequestFilters, RequestFiltersForm} from '../../../../shared';
import { FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'form-filters-list',
  templateUrl: './form-filters-list.component.html',
  styleUrls: ['./form-filters-list.component.scss']
})

export class FormFiltersListComponent implements OnInit {
  private _RequestService: RequestService = inject(RequestService);
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
        consejero: this._fb.control(this.idUserLogin, {validators: [Validators.required]}),
        tipo: this._fb.control([], { validators: []}),
        search: this._fb.control('', { validators: []}),
        fecha_inicio: this._fb.control('', { validators: []}),
        fecha_termino: this._fb.control('', { validators: []})
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

  onChangeDate(result: Date[]): void {
    console.log('onChange: ', result);
    this.formControls.fecha_inicio.setValue('');
    this.formControls.fecha_termino.setValue('');

    if(result[0]) {
      const fechaInicio = moment(result[0]).format('YYYY-MM-DD');
      this.formControls.fecha_inicio.setValue(fechaInicio);
    }

    if(result[1]) {
      const fechaFin = moment(result[1]).format('YYYY-MM-DD');
      this.formControls.fecha_termino.setValue(fechaFin);
    }
  }

  handleFilter() {
    const filters = this.formFilter.value;
    this.onFilter.emit({filters, loadListFinish: false});
  }
}
