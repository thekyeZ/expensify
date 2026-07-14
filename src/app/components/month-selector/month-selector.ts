import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-month-selector',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './month-selector.html',
  host: { class: 'block' },
})
export class MonthSelector {
  readonly label = input.required<string>();

  readonly previous = output<void>();
  readonly next = output<void>();
}
