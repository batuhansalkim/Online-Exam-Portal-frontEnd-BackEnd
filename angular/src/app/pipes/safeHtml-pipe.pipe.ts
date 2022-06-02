import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml'
})
export class SafeHTMLPipe implements PipeTransform {
  constructor(public sainitized: DomSanitizer) { }
  transform(value: any): any {
    return this.sainitized.bypassSecurityTrustHtml(value);
  }

}
