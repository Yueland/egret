class R {
    public static getBMP(value: string, obj?: any): egret.Bitmap {
        let bmp = new egret.Bitmap(RES.getRes(value));
        if (!bmp) {
            egret.warn("Underfined Bitmap: " + value);
            return null;
        }
        if (obj) {
            if (obj instanceof Array) {
                bmp.x = obj[0];
                bmp.y = obj[1];
            } else {
                for (var i in obj) {
                    bmp[i] = obj[i];
                }
            }
        }
        return bmp;
    }

    public static getCBMP(value: string, obj?: any, isRound = false): egret.Bitmap {
        let bmp = this.getBMP(value);
        bmp.anchorOffsetX = isRound ? Math.round(bmp.width / 2) : bmp.width / 2;
        bmp.anchorOffsetY = isRound ? Math.round(bmp.height / 2) : bmp.height / 2;
        if (obj) {
            if (obj instanceof Array) {
                if (!!obj[0] && !isNaN(obj[0])) {
                    bmp.x = Number(obj[0]);
                }
                if (!!obj[1] && !isNaN(obj[1])) {
                    bmp.y = Number(obj[1]);
                }
            } else {
                for (var i in obj) {
                    bmp[i] = obj[i];
                }
            }
        }
        return bmp;
    }

    public static getTexture(value: string): egret.Texture
    {
        return RES.getRes(value);
    }

    public static getClass(value: string): any {
        let n = egret.getDefinitionByName(value);
        if (!!n) {
            return n;
        }
        egret.warn("Underfined Class: " + value);
        return null;
    }

    public static Base64ToTexture(value:string): egret.Texture
    {
        let img: HTMLImageElement = new Image();
        img.src = value;

        let texture = new egret.Texture();
        texture._setBitmapData(new egret.BitmapData(img));

        return texture;
    }

    public static getLoopSheet(n: string, num: number): egret.Texture[]
    {
        let arr = [];
        for (let i = 1; i <= num; i++) {
            let mat = R.getTexture(n + i);
            arr.push(mat);
        }
        for (let i = num - 1; i > 1; i--) {
            let mat = R.getTexture(n + i);
            arr.push(mat);
        }
        return arr;
    }

    public static getBackSheet(n: string, num: number): egret.Texture[] {
        let arr = [];
        for (let i = num - 1; i > 1; i--) {
            let mat = R.getTexture(n + i);
            arr.push(mat);
        }
        return arr;
    }

    public static getSheet(n: string, num: number): egret.Texture[] {
        let arr = [];
        for (let i = 1; i <= num; i++) {
            let mat = R.getTexture(n + i);
            arr.push(mat);
        }
        return arr;
    }

    public static getBitmapText(font = "font", obj?: any): egret.BitmapText {
        let txt = new egret.BitmapText();
        txt.font = RES.getRes(font);
        if (obj) {
            for (var i in obj) {
                txt[i] = obj[i];
            }
        }

        return txt;
    }

    public static getTextField(obj?: any, cAlign?: boolean): egret.TextField {
        let txt = new egret.TextField();
        if (obj) {
            for (var i in obj) {
                txt[i] = obj[i];
            }
        }
        if (cAlign)
        {
            txt.textAlign = egret.HorizontalAlign.CENTER;
        }

        return txt;
    }

    public static getLightMatrix(value: number): number[] {
        let m = [
            1, 0, 0, 0, value,
            0, 1, 0, 0, value,
            0, 0, 1, 0, value,
            0, 0, 0, 1, 0
        ]
        return m;
    }

    public static getGreyMatrix(): number[] {
        let m = [
            0.3086, 0.6094, 0.0820, 0, 0,
            0.3086, 0.6094, 0.0820, 0, 0,
            0.3086, 0.6094, 0.0820, 0, 0,
            0, 0, 0, 1, 0
        ]
        return m;
    }

    public static getDarkMatrix(value: number): number[] {
        let m = [
            value, 0, 0, 0, 0,
            0, value, 0, 0, 0,
            0, 0, value, 0, 0,
            0, 0, 0, 1, 0
        ]
        return m;
    }

    public static getTimeFormat(value: number): string {
        let h = Math.floor(value / 3600000) + "";
        let m = Math.floor(value / 60000) % 60 + "";
        let s = Math.floor(value / 1000) % 60 + "";
        if (h.length < 2) {
            h = "0" + h;
        }
        if (m.length < 2) {
            m = "0" + m;
        }
        if (s.length < 2) {
            s = "0" + s;
        }
        return `${h}:${m}:${s}`;
    }

    public static createBitmapFromIMG(im: any): egret.Bitmap {
        let bmp = new egret.Bitmap(R.createTextureFromIMG(im));
        return bmp;
    }

    public static createTextureFromIMG(im:any): egret.Texture {
        let bmd = new egret.BitmapData(im);
        let texture = new egret.Texture();
        texture._setBitmapData(bmd);
        return texture;
    }

    public static UploadAccept = {
        IMAGE:"image/png, image/gif, image/jpeg"
    }

    public static Upload(accept: string = "", callback?: Function): HTMLInputElement {
        let input = <HTMLInputElement>document.getElementById("upload");
        if (input != null) {
            input.click();
            return;
        }
        input = <HTMLInputElement>document.createElement("input");
        input.id = "upload";
        input.type = "file";
        input.style.display = "none";
        if (!window["isWX"]) {
            input.accept = "image/*";
        }
        input.onchange = e => {
            let img = new Image();
            img.onload = e => {
                let obj = {
                    img: img,
                    bitmapdata: new egret.BitmapData(img)
                };
                if (callback != null) {
                    callback(obj);
                }
                input.parentNode.removeChild(input);
                input = null;
            }

            img.src = window.URL.createObjectURL(input.files[0]);
        }
        document.body.appendChild(input);
        input.click();

        return input;
    }
}
