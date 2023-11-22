import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Components
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { DynamicListComponent } from './components/dynamic-list/dynamic-list.component';
import { DynamicFilterComponent } from './components/dynamic-filter/dynamic-filter.component';
import { DynamicPageResultComponent } from './components/dynamic-page-result/dynamic-page-result.component';
import { DynamicTableComponent } from './components/dynamic-table/dynamic-table.component';

// DIRECTIVES
import { ColorStatusDirective } from './directives/color-status.directive';

// Interceptors
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { LoaderInterceptor } from './interceptors/loader.interceptor';

// Importaciones
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Services
import { ApiService } from './services/api.service';

//Modules Material
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import localeEs from '@angular/common/locales/es-CL';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatFormFieldModule } from '@angular/material/form-field';


registerLocaleData(localeEs)

@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent,
    CalendarioComponent,
    DynamicFilterComponent,
    DynamicPageResultComponent,
    DynamicTableComponent,
    DynamicListComponent,
    ColorStatusDirective
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatProgressBarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatBadgeModule,
    MatTabsModule,
    MatExpansionModule,
    MatListModule,
    MatFormFieldModule,
    FullCalendarModule
  ],
  exports: [
    HeaderComponent,
    MenuComponent,
    CalendarioComponent,
    DynamicFilterComponent,
    DynamicPageResultComponent,
    DynamicTableComponent,
    DynamicListComponent,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatStepperModule,
    MatDatepickerModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatBadgeModule,
    MatTabsModule,
    MatListModule,
    MatFormFieldModule,
    FullCalendarModule,
    ColorStatusDirective
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    {
      provide:LOCALE_ID, useValue:'es-CL'
    },
    ApiService
  ]
})
export class SharedModule { }

