import { Object3D } from 'three';
import { IView } from './IView';

export interface IDoc {
  /**
   * what is wanted for views
   */
  getGraphicsNodes(): Object3D[];

  // eslint-disable-next-line no-unused-vars
  addView(graphicsView: IView): void;

  getViews(): IView[];

  updateViews(): void;
}
