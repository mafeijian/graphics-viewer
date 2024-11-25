import { Object3D } from 'three';

export interface IView {
  isDirty();
  // eslint-disable-next-line no-unused-vars
  update(graphicsNodes: Object3D[]);
  // eslint-disable-next-line no-unused-vars
  onAdd(fnOnAdd: (obj3D: Object3D) => void);
  // eslint-disable-next-line no-unused-vars
  onDel(fnOnDel: (obj3D: Object3D) => void);
}
