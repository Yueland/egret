module vincent.display
{
    export class SpriteBase extends egret.Sprite
	{
        protected w: number;
        protected h: number;

        private _delay = 0;
		
        public constructor() {
            super();

            this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.once(egret.Event.REMOVED_FROM_STAGE, this.removeHandler, this);
        }

        private onAddToStage(event:egret.Event) {
            this.w = this.stage.stageWidth;
            this.h = this.stage.stageHeight;
            this.init();
        }

        protected setDelay(value: number): number {
            let tmp = this._delay;
            this._delay += value;
            return this._delay;
        }

        protected get delay() {
            return this._delay;
        }

        protected set delay(value) {
            this._delay = value;
        }
		
        protected init(): void {
        }
		
		private removeHandler(event:egret.Event):void
		{
			this.onRemoved();
		}
		
        protected onRemoved() {
        }
		
        protected DP(value: string): void
        {
            this.stage.dispatchEvent(new egret.Event(value));
        }

        protected DPW(value: string, data?:any): void {
            this.stage.dispatchEventWith(value, false, data);
        }
    }
}
