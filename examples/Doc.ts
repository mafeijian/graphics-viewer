import { BoxGeometry, Mesh, MeshBasicMaterial, Object3D } from 'three';
import { IDoc } from '../src/IDoc';
import { GraphicsView } from '../src/GraphicsView';

export class Doc extends IDoc {
  lastTime: number = 0;

  addBox = true;

  views: GraphicsView[] = [];

  graphicsNodes: Object3D[] = [];

  addView(graphicsView: GraphicsView) {
    this.views.push(graphicsView);
  }

  getViews(): GraphicsView[] {
    return this.views;
  }

  getGraphicsNodes(): Object3D[] {
    const now = new Date().getTime();
    if (now - this.lastTime > 1000) {
      if (this.addBox) {
        if (this.graphicsNodes.length < 5) {
          const cube = new Mesh(new BoxGeometry(0.1, 0.1, 0.1), new MeshBasicMaterial({ color: 0x3344ff }));
          cube.position.setZ(-1);
          cube.position.setX(Math.sin(now) * 0.2);
          cube.position.setY(Math.cos(now) * 0.2);
          this.graphicsNodes.push(cube);
        } else {
          this.addBox = false;
        }
      } else if (this.graphicsNodes.length > 1) {
        this.graphicsNodes.pop();
      } else {
        this.addBox = true;
      }
      this.lastTime = now;
    }
    return this.graphicsNodes;
  }

  onDocChanged() {
    this.updateViews();
  }
}
