import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxPanZoomModule } from 'ngx-panzoom';

import { WorkspaceComponent } from './workspace/workspace.component';

@NgModule({
  declarations: [WorkspaceComponent],
  imports: [CommonModule, DragDropModule, NgxPanZoomModule],
  providers: [],
  exports: [WorkspaceComponent],
})
export class ComponentModule {}
