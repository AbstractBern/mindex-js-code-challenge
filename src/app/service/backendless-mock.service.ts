import { Injectable } from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class BackendlessMockService implements InMemoryDbService {
  createDb() {
    const employees = [
      {
        id: 1,
        firstName: 'Brian',
        lastName: 'McGee',
        position: 'CEO',
        compensation: 120000,
        directReports: [2, 3]
      },
      {
        id: 2,
        firstName: 'Homer',
        lastName: 'Thompson',
        position: 'Dev Manager',
        compensation: 100000,
        directReports: [4]
      },
      {
        id: 3,
        firstName: 'Rock',
        lastName: 'Strongo',
        compensation: 90000,
        position: 'Lead Tester'
      },
      {
        id: 4,
        firstName: 'Max',
        lastName: 'Power',
        compensation: 70000,
        position: 'Junior Software Engineer'
      }
    ];
    return {employees};
  }
}
