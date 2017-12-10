module vincent.display {
    export class MainBase extends egret.Sprite {
        protected w: number;
        protected h: number;

        protected cid = 0;
        protected main: egret.Sprite;

        protected loadingView: LoadingUI;

        public constructor() {
            super();
            this.once(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
        }

        private onAddToStage(event: egret.Event) {
            this.w = this.stage.stageWidth;
            this.h = this.stage.stageHeight;

            this.onAdded();

            RES.setMaxLoadingThread(5);
            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
            let path = window["resourcePath"] || "";
            RES.loadConfig(path + "resource/default.res.json?v=" + CONFIG.VERSION, path + "resource/");

        }

        protected onAdded(): void {
        }

        private onConfigComplete(event: RES.ResourceEvent): void {
            RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            RES.loadGroup("loading");
        }

        protected onResourceLoadComplete(event: RES.ResourceEvent): void {
            switch (event.groupName)
            {
                case "loading":
                    RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                    this.loadingView = new LoadingUI();
                    this.addChild(this.loadingView);

                    RES.loadGroup("preload");
                    break;
            }
        }

        private onItemLoadError(event: RES.ResourceEvent): void {
            console.warn("Url:" + event.resItem.url + " has failed to load");
        }

        private onResourceLoadError(event: RES.ResourceEvent): void {
            console.warn("Group:" + event.groupName + " has failed to load");
            this.onResourceLoadComplete(event);
        }

        protected onResourceProgress(event: RES.ResourceEvent): void {
            if (event.groupName == "preload") {
                if (!!this.loadingView) {
                    this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
                }
            }
        }

        protected showInitItems(): void {
        }

        protected endLoading(delay = 500): void {
            if (this.loadingView.alpha != 1) {
                egret.setTimeout(this.endLoading, this, 50);
                return;
            }
            this.showInitItems();

            egret.Tween.get(this.loadingView).to({ alpha: 0 }, delay).call(() => {
                this.loadingView.parent.removeChild(this.loadingView);
                this.loadingView = null;
                this.init();
            });
        }

        protected init(): void {
            this.main = new egret.Sprite();
            this.addChildAt(this.main, 0);

            this.toChannel(this.cid);
        }

        protected toChannel(id: number): void {
        }
    }
}
