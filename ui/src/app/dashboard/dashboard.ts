import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Upload } from '../library/upload/upload';
import {DashboardService} from './dashboard.service';
import {catchError, finalize} from 'rxjs';

@Component({
  imports: [CommonModule, Upload],
  selector: 'app-dashboard',
  styleUrl: './dashboard.scss',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  private dashboardService = inject(DashboardService);

  onFilesUploaded(files: FileList) {
    if (files.length > 0) {
      const formData = new FormData();
      formData.append('file', files[0]);
      formData.append('filename', files[0].name);

      this.dashboardService.uploadFile(formData)
        .pipe(
          catchError(() => {
            console.error('Error uploading file');
            return [];
          }),
          finalize(() => {
            console.log('File upload completed');
          })
        )
        .subscribe();
    }
  }
}
