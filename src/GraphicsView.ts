import { Object3D } from 'three';
import { IView } from './IView';

export class GraphicsView implements IView {
  hash: any = {};

  born: Set<Object3D> = new Set();

  live: Set<Object3D> = new Set();

  dead: Set<Object3D> = new Set();

  has(object3D: Object3D) {
    return object3D.uuid in this.hash;
  }

  set(object3D: Object3D) {
    this.hash[object3D.uuid] = object3D;
  }

  get(uuid: string) {
    return this.hash[uuid];
  }

  del(object3D: Object3D) {
    delete this.hash[object3D.uuid];
  }

  // eslint-disable-next-line no-unused-vars
  map<U>(it: (value: string, index: number, array: string[]) => U): U[] {
    return Object.keys(this.hash).map((value: string, index: number, array: string[]) => it(value, index, array));
  }

  private dirty = false; // update view will make myself as dirty if necessary. You may want to clean yourself with my latest content if you higher level guys see me as dirty.

  isDirty() {
    return this.dirty;
  }

  update(graphicsNodes: Object3D[]) {
    const { born, live, dead } = this;

    live.clear(); // dynamic comparation
    graphicsNodes.forEach(node => {
      if (this.has(node)) {
        live.add(node);
      } else {
        born.add(node); // accumulated
      }
    });

    this.map(uuid => this.get(uuid)).forEach(node => {
      if (!live.has(node)) {
        dead.add(node); // accumulated
      }
    });

    dead.forEach(node => this.del(node));
    born.forEach(node => this.set(node));
    this.dirty = dead.size + born.size > 0;
  }

  // eslint-disable-next-line no-unused-vars
  onAdd(fnOnAdd: (obj3D: Object3D) => void) {
    const { born, dead } = this;
    born.forEach(object3D => fnOnAdd(object3D));
    born.clear();
    this.dirty = dead.size + born.size > 0;
  }

  // eslint-disable-next-line no-unused-vars
  onDel(fnOnDel: (obj3D: Object3D) => void) {
    const { born, dead } = this;
    dead.forEach(object3D => fnOnDel(object3D));
    dead.clear();
    this.dirty = dead.size + born.size > 0;
  }
}
