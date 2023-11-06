import { Directive, ElementRef, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appColorStatus]'
})
export class ColorStatusDirective implements OnChanges {
  @Input('status') status!:string;
  @Input('conditions') conditionsList!:{value:string; color:string}[];


  constructor(private el: ElementRef) { }

  ngOnChanges(changes: SimpleChanges): void {
   if(this.status && this.conditionsList && this.conditionsList.length>0){
    const color = this.conditionsList.find((c)=>c.value==this.status)?.color;
    this.el.nativeElement.style.color = color;
    this.el.nativeElement.style['border-color'] = color;
    this.el.nativeElement.style['background-color'] = color;
   }
  }

}
