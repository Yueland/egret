class CTRL {
    public static isLocal = false;
    public static isMute = false;

    public static chkLocal(): void {
        let url = window.location.host;
        if (url.indexOf("localhost") == 0 || url.indexOf("192.168") == 0 || url.indexOf("h5.qq.com") == 0) {
            CTRL.isLocal = true;
        }
    }

    public static TopDebugger(): void {
        let div = document.getElementsByTagName("div");
        for (let i = 0; i < div.length; i++) {
            if (div[i].style.background == "rgba(0, 0, 0, 0.9)") {
                div[i].style.zIndex = "99";
            }
        }
    }

    public static hideDebugger(): void {
        let div = document.getElementsByTagName("div");
        for (let i = 0; i < div.length; i++) {
            if (div[i].style.background == "rgba(0, 0, 0, 0.9)") {
                div[i].style.display = "none";
            }
        }
    }

    public static getVideo(value: string): string {
        if (window["resourcePath"]) {
            return window["resourcePath"] + value;
        }
        if (CTRL.isLocal) {
            value = "http://192.168.1.110/2018/bone/" + value;
        }
        return value;
    }

    public static chkMobileNumber(value: string): boolean {
        return /^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/i.test(value);
    }

    public static chkX5(): boolean {
        let ua = navigator.userAgent;
        if (-1 == ua.indexOf("MQQBrowser")) {
            return false;
        }
        return true;
    }

    public static chkUC(): boolean {
        let ua = navigator.userAgent;
        if (-1 == ua.indexOf("UCBrowser")) {
            return false;
        }
        return true;
    }

    public static chkAndroid(): boolean {
        let ua = navigator.userAgent;
        if (-1 == ua.indexOf("Android")) {
            return false;
        }
        return true;
    }

    public static chkIOSX(): boolean {
        let ua = navigator.userAgent;
        if (-1 == ua.indexOf("iPhone")) {
            return false;
        }
        if (screen.height == 812 && screen.width == 375) {
            return true;
        }
        return false;
    }

    public static chkIOS(): boolean {
        let ua = navigator.userAgent;
        if (-1 == ua.indexOf("iPhone")) {
            return false;
        }
        return true;
    }

    public static chkWeibo(): boolean {
        let ua = navigator.userAgent;
        if (-1 == ua.indexOf("Weibo")) {
            return false;
        }
        return true;
    }

    public static chkWX(): boolean {
        let ua = navigator.userAgent;
        if (-1 == ua.indexOf("MicroMessenger")) {
            return false;
        }
        return true;
    }

    public static chkOPPOBrowser(): boolean {
        let ua = navigator.userAgent;
        if (-1 == ua.indexOf("OppoBrowser")) {
            return false;
        }
        return true;
    }

    public static chkMobile(): boolean {
        let ua = navigator.userAgent;
        if (-1 == ua.indexOf("iPhone") && -1 == ua.indexOf("iPad") && -1 == ua.indexOf("iPod") && -1 == ua.indexOf("Android")) {
            return false;
        }
        return true;
    }

    public static playBGM(value: string, autoplay = true, loop = true): void {
        let aud = <HTMLAudioElement>document.getElementById("aud");
        if (!!aud) {
            aud.src = value;
            aud.loop = loop;
            aud.autoplay = autoplay;
        }
    }

    public static playSound(value: string, times: number = 1): HTMLAudioElement {
        if (CTRL.isMute) {
            return;
        }
        let aud = <HTMLAudioElement>document.getElementById(value);
        if (!!aud) {
            aud.play();
        }
        return aud;
    }

    public static play(value: string, times: number = 1): egret.SoundChannel {
        if (CTRL.isMute) {
            return;
        }
        let s: egret.Sound = RES.getRes(value);
        return s.play(0, times);
    }

    public static getLoop(item: egret.DisplayObject): egret.Tween {
        return egret.Tween.get(item, { loop: true });
    }

    public static fadeIn(item: egret.DisplayObject, spd = 250, delay = 0): egret.Tween {
        item.alpha = 0;
        return egret.Tween.get(item).wait(delay).to({ alpha: 1 }, spd);
    }

    public static fadeOut(item: egret.DisplayObject, spd = 250, dispose = true): egret.Tween {
        return egret.Tween.get(item).to({ alpha: 0 }, spd).call(() => {
            if (dispose) {
                item.parent.removeChild(item);
            }
        });
    }

    public static getRandomNumber(max: number): number {
        return (Math.random() * max) >> 0;
    }

    public static randomArray(arr: Array<any>): Array<any> {
        let tmp = arr.slice();
        tmp.sort(function () { return Math.random() > 0.5 ? -1 : 1; });
        return tmp;
    }

    public static createVideo(src: string = "", loop: boolean = false): HTMLVideoElement {
        let vid = <HTMLVideoElement>document.createElement("video");
        vid.preload = "auto";
        vid.id = "vid";
        vid.src = src;
        vid.loop = loop;
        vid.setAttribute("playsinline", "");
        vid.setAttribute("webkit-playsinline", "");
        vid.setAttribute("x-webkit-airplay", "allow");
        return vid;
    }

    public static createX5Video(src: string = "", loop: boolean = false): HTMLVideoElement {
        let vid = CTRL.createVideo(src, loop);
        vid.setAttribute("x5-video-player-type", "h5");
        vid.setAttribute("x5-video-player-fullscreen", "true");
        return vid;
    }

    public static getUrlArg(value: string): any {
        let obj = CTRL.getUrlArgs();
        if (!!obj && !!obj[value]) {
            return obj[value];
        }
        return null;
    }

    public static getUrlArgs(): any {
        let url = location.href;
        let reMatch;
        if (reMatch = url.match(/\?([^#]+)#?/)) {
            let querystring = reMatch[1];
            let args = querystring.split(/&|=/);
            let arg = {};
            for (let i = 0; i < args.length; i += 2) {
                arg[args[i]] = args[i + 1];
            }
            return arg;
        }
    }

    public static drawArc(g: egret.Graphics, nX: number, nY: number, nRadius: number, nArc: number, nStartingAngle = 0, bRadialLines = false, color = 0xFF0000): void {
        g.clear();
        g.beginFill(color);
        if (nArc > 360) {
            nArc = 360;
        }
        nArc = Math.PI / 180 * nArc;
        let nAngleDelta: number = nArc / 8;

        let nCtrlDist: number = nRadius / Math.cos(nAngleDelta / 2);

        nStartingAngle *= Math.PI / 180;

        let nAngle: number = nStartingAngle;
        let nCtrlX: number;
        let nCtrlY: number;
        let nAnchorX: number;
        let nAnchorY: number;

        let nStartingX: number = nX + Math.cos(nStartingAngle) * nRadius;
        let nStartingY: number = nY + Math.sin(nStartingAngle) * nRadius;

        if (bRadialLines) {
            g.moveTo(nX, nY);
            g.lineTo(nStartingX, nStartingY);
        } else {
            g.moveTo(nStartingX, nStartingY);
        }

        for (let i = 0; i < 8; i++) {

            nAngle += nAngleDelta;

            nCtrlX = nX + Math.cos(nAngle - (nAngleDelta / 2)) * (nCtrlDist);
            nCtrlY = nY + Math.sin(nAngle - (nAngleDelta / 2)) * (nCtrlDist);

            nAnchorX = nX + Math.cos(nAngle) * nRadius;
            nAnchorY = nY + Math.sin(nAngle) * nRadius;

            g.curveTo(nCtrlX, nCtrlY, nAnchorX, nAnchorY);
        }
        if (bRadialLines) {
            g.lineTo(nX, nY);
        }
        g.endFill();
    }

    public static compressImage(img: HTMLImageElement, num = 1048576): string {
        let width = img.width;
        let height = img.height;

        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");

        let ratio = width * height / num;
        if (ratio > 1) {
            ratio = Math.sqrt(ratio);
            width /= ratio;
            height /= ratio;
        } else {
            ratio = 1;
        }

        canvas.width = width;
        canvas.height = height;

        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(img, 0, 0, width, height);

        let ndata = canvas.toDataURL('image/jpeg');
        canvas = null;
        ctx = null;
        return ndata;
    }
}
