import {inject, Service} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Service()
export class DashboardService {
  protected http = inject(HttpClient);

  uploadFile(file: FormData): Observable<any> {
    return this.http.post('/api/upload', file);
  }
}
