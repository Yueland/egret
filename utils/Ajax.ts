class Ajax {
    public static get(url: string, fn): void {
        var obj = new XMLHttpRequest();
        obj.open('GET', url, true);
        obj.onreadystatechange = function () {
            if (obj.readyState == 4 && obj.status == 200 || obj.status == 304) {
                fn.call(this, obj.responseText);
            }
        };
        obj.send(null);
    }

    public static post(url: string, vars: string, fn): void {
        let request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open(url, egret.HttpMethod.POST);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.once(egret.Event.COMPLETE, event => {
            let request = <egret.HttpRequest>event.currentTarget;
            request.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onPostIOError, this);
            fn.call(this, request.response);
        }, this);
        request.once(egret.IOErrorEvent.IO_ERROR, this.onPostIOError, this);
        request.send(vars);
    }

    private static onPostIOError(event: egret.Event): void {
        let request = <egret.HttpRequest>event.currentTarget;
        egret.warn("onPostIOError");
    }
}
