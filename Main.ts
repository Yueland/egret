class Main extends vincent.display.MainBase {
    public static currentItem: Main;

    public static get current() {
        return Main.currentItem;
    }

    public static set current(value: Main) {
        if (!Main.currentItem) {
            Main.currentItem = value;
        }
    }

    public constructor() {
        super();

        CTRL.chkLocal();

        this.cid = 0;
        if (CTRL.isLocal) {
            let cid = CTRL.getUrlArg("cid");
            if (!isNaN(cid)) {
                this.cid = Number(cid);
            }
        }
        Main.current = this;
        window["_hmt"].push(['_trackEvent', 'loading', 'start']);
    }

    protected onResourceLoadComplete(event: RES.ResourceEvent): void {
        switch (event.groupName) {
            case "loading":
                RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);

                this.loadingView = new LoadingUI();
                this.addChild(this.loadingView);

                RES.loadGroup("preload");
                break;
            case "preload":
                egret.log("preload complete");
                window["_hmt"].push(['_trackEvent', 'loading', 'complete']);
                this.endLoading();
                break;
        }
    }

    protected endLoading(delay = 500): void {
        this.showInitItems();
        if (!!this.loadingView) {
            this.loadingView.parent.removeChild(this.loadingView);
            this.loadingView = null;
        }
        this.init();
    }

    protected init(): void {
        this.main = new egret.Sprite();
        this.addChildAt(this.main, 0);
    }

    public toChannel(id: number): void {
        egret.log("toChannel:" + id);
        let n = R.getClass("v.C" + id);
        let mc = <vincent.display.CBase>new n();
        if (!!mc) {
            mc.id = id;
            this.main.addChild(mc);
        }
    }
}
