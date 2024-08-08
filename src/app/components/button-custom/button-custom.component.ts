import { Component, Input } from '@angular/core';

export type ButtonType = 'navigation' | 'classic' | 'addition' | 'delete';

@Component({
  selector: 'app-button-custom',
  templateUrl: './button-custom.component.html',
  styleUrls: ['./button-custom.component.scss'],
})
export class ButtonCustomComponent {
  @Input() type: ButtonType = 'classic';
  @Input() isActive = false;
  @Input({ required: true }) label!: string;
  @Input() isDisabled = false;
}
