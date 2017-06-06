class CTRL {
    public static isLocal = false;
    public static isMute = false;

    public static chkLocal(): void {
        let url = window.location.href;
        if (url.indexOf("localhost") > 0 || url.indexOf("192.168") > 0) {
            this.isLocal = true;
        }
    }

    public static chkMobileNumber(value: string): boolean {
        return /^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/i.test(value);
    }

    public static chkMobile(): boolean {
        let boo = true;
        let ua = navigator.userAgent;
        if (-1 == ua.indexOf("iPhone") && -1 == ua.indexOf("iPad") && -1 == ua.indexOf("iPod") && -1 == ua.indexOf("Android")) {
            return false;
        }
        return boo;
    }

    public static playBGM(value: string, autoplay = true, loop = true): void {
        let aud = <HTMLAudioElement>document.getElementById("aud");
        if (!!aud) {
            aud.src = value;
            aud.loop = loop;
            aud.autoplay = autoplay;
        }
    }

    public static play(value: string, times: number = 1): egret.SoundChannel
    {
        if (CTRL.isMute) {
            return;
        }
        let s: egret.Sound = RES.getRes(value);
        return s.play(0, times);
    }

    public static fadeIn(item: egret.DisplayObject, spd = 500, delay = 0): egret.Tween {
        item.alpha = 0;
        return egret.Tween.get(item).wait(delay).to({ alpha: 1 }, spd);
    }

    public static fadeOut(item: egret.DisplayObject, spd = 500, dispose = true): egret.Tween {
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
        arr.sort(function () { return Math.random() > 0.5 ? -1 : 1; });  
        return arr;
    }

    public static createVideo(src: string, loop: boolean = false): HTMLVideoElement {
        let vid = <HTMLVideoElement>document.createElement("video");
        vid.preload = "auto";
        vid.id = "vid";
        vid.src = src;
        vid.loop = loop;
        vid.setAttribute("playsinline", "");
        vid.setAttribute("webkit-playsinline", "");
        vid.setAttribute("x-webkit-airplay", "allow");
        vid.setAttribute("x5-video-player-type", "h5");

        document.body.appendChild(vid);

        return vid;
    }

    public static getUrlArg(value: string): any {
        let obj = CTRL.getUrlArgs();
        if (!!obj && !!obj[value]) {
            return obj[value];
        }
        return null;
    }

    public static getUrlArgs():any {
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
        if(nArc > 360) {
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

        if(bRadialLines) {
            g.moveTo(nX, nY);
            g.lineTo(nStartingX, nStartingY);
        } else {
            g.moveTo(nStartingX, nStartingY);
        }

        for (let i = 0; i< 8; i++) {

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
}
