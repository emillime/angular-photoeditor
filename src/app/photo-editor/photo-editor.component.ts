import {
  Component,
  AfterViewInit,
  ViewChild,
  Input,
  ElementRef,
} from '@angular/core';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { PhotoEditorSDKUI, EditorApi } from 'photoeditorsdk/no-polyfills';

const license = '';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
})
export class PhotoEditorComponent implements AfterViewInit {
  @Input()
  public src: string | undefined;

  @ViewChild('psdkContainer')
  private container: ElementRef | undefined;

  public editor: EditorApi | undefined;

  ngAfterViewInit() {
    this.initEditor();
  }

  async initEditor() {
    try {
      if (this.editor) {
        this.editor.dispose();
      }

      this.editor = await PhotoEditorSDKUI.init({
        license,
        container: this.container?.nativeElement,
        image: this.src ?? '',
        assetBaseUrl: '/assets/photoeditorsdk',
      });
    } catch (error) {
      console.log(error);
    }
  }
}
