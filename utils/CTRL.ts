class CTRL {
    public static isLocal = false;
    public static isMute = false;

    public static chkLocal(): void {
        let url = window.location.href;
        if (url.indexOf("localhost") > 0 || url.indexOf("192.168") > 0) {
            this.isLocal = true;
        }
    }

    public static chkMobile(value: string): boolean {
        return /^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/i.test(value);
    }

    public static play(value: string, times: number = 1): egret.SoundChannel
    {
        if (CTRL.isMute) {
            return;
        }
        let s: egret.Sound = RES.getRes(value);
        return s.play(0, times);
    }
}
