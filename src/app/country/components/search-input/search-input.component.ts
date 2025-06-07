import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  newValue = output<string>();

  placeholder = input<string>('Buscar');

  debounceTime = input<number>(500);

  initialValue = input<string>();

  inputValue = linkedSignal<string>(() => this.initialValue() ?? '');

  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();

    const timeout = setTimeout(() => {
      this.newValue.emit(this.inputValue());
    }, this.debounceTime());

    onCleanup(() => {
      clearTimeout(timeout);
    })

  });

}
