class JSONP {
    private static _regID: number = 0;

    public static completeCall: any = {};

    public static process(url: string, callback: Function, callobj: any): void {
        this.completeCall["call_" + this._regID] = callback.bind(callobj);
        this.startLoader(url, this._regID++);
    }

    private static startLoader(url: string, id: number): void {
        let script = document.createElement('script');
        let str = "JSONP.completeCall.call_" + id;

        if (url.indexOf("?") < 0) {
            script.src = url + "?" + str;
        } else {
            script.src = url + "&" + str;
        }
        document.body.appendChild(script);
    }
}