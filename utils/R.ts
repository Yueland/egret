class R {
    public static getBMP(value: string, obj?: any): egret.Bitmap {
        let bmp = new egret.Bitmap(RES.getRes(value));
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

    public static Base64ToTexture(value:string): egret.Texture
    {
        let img: HTMLImageElement = new Image();
        img.src = value;

        let texture = new egret.Texture();
        texture._setBitmapData(new egret.BitmapData(img));

        return texture;
    }

    public static getBackSheet(n: string, num: number): egret.Texture[]
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

    public static getDarkMatrix(value: number): number[] {
        let m = [
            value, 0, 0, 0, 0,
            0, value, 0, 0, 0,
            0, 0, value, 0, 0,
            0, 0, 0, 1, 0
        ]
        return m;
    }

    public static UploadAccept = {
        IMAGE:"image/png, image/gif, image/jpeg"
    }

    public static Upload(accept: string = "", callback?: Function): void {
        let input = <HTMLInputElement>document.getElementById("upload");
        if (input != null) {
            input.click();
            return;
        }
        input = <HTMLInputElement>document.createElement("input");
        input.id = "upload";
        input.type = "file";
        if (!window["isWX"]) {
            input.accept = "image/*";
        }
        input.onchange = e => {
            egret.log(e);
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
    }
}
