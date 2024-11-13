import { Object3D } from 'three';
import { GraphicsView } from './GraphicsView';

export abstract class IDoc {
  /**
   * what is wanted for views
   */
  abstract getGraphicsNodes(): Object3D[];

  // eslint-disable-next-line no-unused-vars
  abstract addView(graphicsView: GraphicsView);

  abstract getViews(): GraphicsView[];

  updateViews() {
    this.getViews().forEach(view => view.update(this.getGraphicsNodes()));
  }
}
