module vincent.display {
    export class TBase extends SpriteBase {
        protected arr = [];
        public id: number = 0;

        public constructor() {
            super();
        }

        protected init(): void {
        }

        protected onRemoved() {
            for (let i = 0; i < this.arr.length; i++) {
                egret.Tween.removeTweens(this.arr[i]);
            }
        }
    }
}
