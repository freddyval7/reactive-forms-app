import { JsonPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interfaces';
import { filter, pipe, switchMap, tap } from 'rxjs';

@Component({
  selector: 'country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.html',
})
export class CountryPage {
  fb = inject(FormBuilder);
  CountryService = inject(CountryService);

  regions = signal(this.CountryService.regions);

  countriesByRegion = signal<Country[]>([]);
  borders = signal<Country[]>([]);

  myForm = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  });

  // Funcion utilizada para limpiar la suscripcion de los selects cuando cambia una seleccion
  onFormChanged = effect((onCleanup) => {
    const regionSubscription = this.onRegionChanged();
    const countrySubscription = this.onCountryChanged();

    onCleanup(() => {
      regionSubscription?.unsubscribe();
      countrySubscription?.unsubscribe();
    });
  });

  onRegionChanged() {
    return this.myForm
      .get('region')
      ?.valueChanges.pipe(
        tap(() => this.myForm.get('country')?.setValue('')),
        tap(() => this.myForm.get('border')?.setValue('')),
        tap(() => {
          this.countriesByRegion.set([]);
          this.borders.set([]);
        }),
        // Cuando cambia la región, llama al servicio para obtener los países
        // Si el usuario cambia de región rápidamente, ¡cancela la búsqueda anterior!
        switchMap((region) => this.CountryService.getCountriesByRegion(region ?? '')),
      )
      .subscribe((countries) => {
        this.countriesByRegion.set(countries);
      });
  }

  onCountryChanged() {
    return this.myForm
      .get('country')
      ?.valueChanges.pipe(
        tap(() => this.myForm.get('border')?.setValue('')),
        filter((value) => value!.length > 0),
        switchMap((alphaCode) => this.CountryService.getCountryByAlphaCode(alphaCode ?? '')),
        switchMap((country) => this.CountryService.getCountryNamesByCodes(country.borders)),
      )
      .subscribe((borders) => this.borders.set(borders));
  }
}
