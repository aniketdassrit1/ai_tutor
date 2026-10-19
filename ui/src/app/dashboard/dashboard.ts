import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Upload } from '../library/upload/upload';

@Component({
  imports: [CommonModule, Upload],
  selector: 'app-dashboard',
  styleUrl: './dashboard.scss',
  templateUrl: './dashboard.html',
})
export class Dashboard {
  onFilesUploaded(files: FileList) {
    console.log('Files received in dashboard:', files);
    // Implementation for file upload logic goes here
  }
}
