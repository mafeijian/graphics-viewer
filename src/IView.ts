import { Object3D } from 'three';

export interface IView {
  isDirty(): boolean;
  // eslint-disable-next-line no-unused-vars
  update(graphicsNodes: Object3D[]): void;
  // eslint-disable-next-line no-unused-vars
  onAdd(fnOnAdd: (obj3D: Object3D) => void): void;
  // eslint-disable-next-line no-unused-vars
  onDel(fnOnDel: (obj3D: Object3D) => void): void;
}
