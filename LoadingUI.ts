class LoadingUI extends vincent.display.LoadingBase {
    private txt: egret.TextField;

    public constructor() {
        super();
    }

    protected init(): void {
    }

    public setProgress(current: number, total: number): void {
        let num = current / total;
        let percent = Math.floor(num * 100);
    }

    protected onRemoved() {
    }
}
