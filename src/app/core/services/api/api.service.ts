import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // TODO: Perf | Implement types for better DE (Developer Experience), not added types to save time
  // TODO: All types added isn´t a complete model, only have a base required attributes
  private API_URL: string;

  constructor(
    private readonly http: HttpClient
  ) {
    this.API_URL = environment.apiURL;
  }

  public getPokemons(offset: number, limit: number = 20): Observable<{
    count: number; next: string; previous: string; results: { name: string; url: string; }[];
  }> {
    const params: HttpParams = new HttpParams().set('offset', String(offset * limit)).set('limit', String(limit));
    return this.http.get<{
      count: number; next: string; previous: string; results: { name: string; url: string; }[];
    }>(this.API_URL.concat('pokemon'), {params});
  }

  public getPokemon(id: number): Observable<any> {
    return this.http.get<any>(this.API_URL.concat(`pokemon/${id}`));
  }

  public getPokemonEvolution(id: number): Observable<any> {
    return this.http.get<any>(this.API_URL.concat(`evolution-chain/${id}`));
  }

  public getGenders(gender: 'male' | 'female'): Observable<any> {
    return this.http.get<any>(this.API_URL.concat(`gender/${gender}`));
  }

}
