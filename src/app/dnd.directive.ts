import {
  Directive,
  Output,
  Input,
  EventEmitter,
  HostBinding,
  HostListener,
ElementRef
} from '@angular/core';

@Directive({
  selector: '[appDnd]'
})
export class DndDirective {
  @HostBinding('class.fileover') fileOver: boolean;
  @Output() fileDropped = new EventEmitter<any>();
  @Output() fileDragover = new EventEmitter<any>();
  @Output() fileDragleave = new EventEmitter<any>();
  constructor(public el: ElementRef) {

  }

  // Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = true;
    this.fileDragover.emit(this.fileOver);
  }

  // Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
   // console.log (this.el.nativeElement)
    //this.el.nativeElement.style.display = 'none';
    this.fileDragleave.emit(this.fileOver)
  }

  // Drop listener
  @HostListener('drop', ['$event']) public ondrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    let files = evt.dataTransfer.files;
    if (files.length > 0) {
      const obj = {
              files: files,
              fileOver: this.fileOver
      }
      this.fileDropped.emit(obj);
    }
  }
}
