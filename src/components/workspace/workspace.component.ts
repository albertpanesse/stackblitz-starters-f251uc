import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import {
  PanZoomAPI,
  PanZoomConfig,
  PanZoomConfigOptions,
  PanZoomModel,
} from 'ngx-panzoom';
import { cloneDeep } from '../../helpers';

const _cmdItems: {
  [key: string]: { initialPosition: { x: number; y: number } };
} = {
  NODE_1: {
    initialPosition: { x: 10, y: 10 },
  },
  NODE_2: {
    initialPosition: { x: 120, y: 10 },
  },
  NODE_3: {
    initialPosition: { x: 230, y: 10 },
  },
  NODE_4: {
    initialPosition: { x: 340, y: 10 },
  },
};

@Component({
  selector: 'workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
})
export class WorkspaceComponent implements OnInit {
  @ViewChildren('cmdItem') cmdItemRefs!: QueryList<ElementRef>;

  private panZoomConfigOptions: PanZoomConfigOptions = {
    acceleratePan: false,
    zoomLevels: 3.5,
    initialZoomLevel: 2,
    scalePerZoomLevel: 2,
    initialPanX: 0,
    initialPanY: 0,
    zoomStepDuration: 0.2,
    freeMouseWheelFactor: 0.08,
    zoomToFitZoomLevelFactor: 0.95,
    dragMouseButton: 'left',
    zoomOnDoubleClick: false,
    zoomOnMouseWheel: false,
    zoomButtonIncrement: 1,
    freeMouseWheel: false,
    noDragFromElementClass: 'pan-zoom-frame',
  };
  private panzoomModel!: PanZoomModel;

  public cmdItems: { [key: string]: any } = cloneDeep(_cmdItems);
  public panZoomAPI!: PanZoomAPI;
  public panZoomConfig: PanZoomConfig = new PanZoomConfig(
    this.panZoomConfigOptions
  );
  public scaleValue: number = 1;

  ngOnInit() {
    this.panZoomConfig.modelChanged.subscribe((model: PanZoomModel) =>
      this.onPanzoomModelChanged(model)
    );

    this.panZoomConfig.api.subscribe(
      (api: PanZoomAPI) => (this.panZoomAPI = api)
    );
  }

  onPanzoomModelChanged(model: PanZoomModel): void {
    this.panzoomModel = cloneDeep(model);
  }

  onWorkspaceDblClick(event: any) {
    this.cmdItemRefs.forEach((_cmdItemRef) => {
      const id = _cmdItemRef.nativeElement.getAttribute('id');
      _cmdItemRef.nativeElement.style.transform = `translate3d(${_cmdItems[id].initialPosition.x}px, ${_cmdItems[id].initialPosition.y}px, 0px)`;
    });
  }

  onDragStarted(event: any, id: string) {
    const cmdItemRef = this.cmdItemRefs.find(
      (_cmdItemRef) => _cmdItemRef.nativeElement.getAttribute('id') === id
    );
    if (cmdItemRef) {
      const regex = /translate3d\(([^,]+),([^)]+)\)/;
      const match = cmdItemRef.nativeElement.style.transform.match(regex);
      console.log('match', match);
      if (match) {
        const prevX = parseFloat(match[1]);
        const prevY = parseFloat(match[2]);

        this.cmdItems[id].initialPosition = {
          x: prevX,
          y: prevY,
        };

        cmdItemRef.nativeElement.style.transform = `translate3d(${prevX}px, ${prevY}px, 0px)`;
      }
    }
  }

  onDragMoved(event: any, id: string) {}

  onDragEnded(event: any, id: string) {}
}
