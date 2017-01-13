module vincent.display {
    export class SheetMC extends vincent.display.SpriteBase
    {
        private mat: egret.Texture[];
        private bmp: egret.Bitmap;
        private cid: number = 0;
        private fps: number = 30;

        private pt: number = 0;

        private playing: boolean = false;

        public loop: boolean = true;
        public autoPlay: boolean = true;
        public wait: number = 0;

        public constructor(mat:egret.Texture[], fps:number = 30) {
            super();
            this.mat = mat;
            this.fps = fps;
        }

        protected init(): void {
            if (this.mat.length > 0)
            {
                this.bmp = new egret.Bitmap(this.mat[0]);
                this.addChild(this.bmp);

                if (this.autoPlay)
                {
                    this.play();
                }
            }
        }

        public gotoAndPlay(value: number): void
        {
            this.cid = value;
        }

        public setScale(value: number): void
        {
            this.bmp.scaleX = this.bmp.scaleY = value;
        }

        public stop():void
        {
            this.removeTicker();
        }

        public play(): void
        {
            if (this.mat.length == 0)
            {
                return;
            }
            this.removeTicker();
            this.playing = true;

            egret.Ticker.getInstance().register(this.onTick, this);
            this.dispatchEvent(new egret.Event("START"));
        }

        private onTick(dt: number): void {
            this.pt += dt;
            let t = Math.floor(1000 / this.fps);
            if (this.pt > t)
            {
                this.pt %= t;
                this.cid++;
                let len: number = this.mat.length;
                if (this.cid >= len) {
                    if (this.cid - len < this.wait) {
                        return;
                    }
                    this.dispatchEvent(new egret.Event("END"));
                    if (!this.loop) {
                        this.removeTicker();
                        return;
                    }
                    this.cid = 0;
                    this.dispatchEvent(new egret.Event("LOOP"));
                }
                this.bmp.texture = this.mat[this.cid];
                this.dispatchEventWith("FRAME", false, this.cid);
            }
        }

        private removeTicker(): void
        {
            egret.Ticker.getInstance().unregister(this.onTick, this);
        }

        protected onRemoved() {
            this.removeTicker();
        }
    }
}
