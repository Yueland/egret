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
    }

    protected onResourceLoadComplete(event: RES.ResourceEvent): void {
        super.onResourceLoadComplete(event);
        switch (event.groupName) {
            case "preload":
                egret.log("preload complete");
                this.endLoading();
                break;
        }
    }

    protected endLoading(delay = 500): void {
        this.loadingView.parent.removeChild(this.loadingView);
        this.loadingView = null;
        this.init();
    }

    protected init(): void {
        super.init();
    }

    public toChannel(id: number): void {
        console.log("toChannel:" + id);
        let mc: vincent.display.CBase;
        switch (id) {
            case 0:
                break;
        }
    }
}
