import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, MatIconModule],
  selector: 'app-upload',
  styleUrl: './upload.scss',
  templateUrl: './upload.html',
})
export class Upload {
  @Output() filesUploaded = new EventEmitter<FileList>();
  isDragging = false;

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    const files = event.dataTransfer?.files;
    if (files) {
      this.filesUploaded.emit(files);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.filesUploaded.emit(input.files);
    }
  }
}
