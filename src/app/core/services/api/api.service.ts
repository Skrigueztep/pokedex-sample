import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private API_URL: string;

  constructor() {
    this.API_URL = environment.apiURL;
  }
}
