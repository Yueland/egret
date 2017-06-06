class DeviceMotion {
    private static SHAKE_THRESHOLD = 3000;
    private static last_update = 0;
    private static x: number;
    private static y: number;
    private static z: number;
    private static last_x = 0;
    private static last_y = 0;
    private static last_z = 0;

    private static func: Function;

    public static addDeviceHandler(callback: Function = null): void {
        if (!!callback) {
            this.func = callback;
        }
        window.addEventListener('devicemotion', DeviceMotion.deviceMotionHandler, false);
    }

    public static removeDeviceHandler(): void {
        window.removeEventListener('devicemotion', DeviceMotion.deviceMotionHandler, false);
    }

    private static callback(): void {
        if (!!this.func) {
            this.func();
        }
    }

    private static deviceMotionHandler(eventData): void {
        let acceleration = eventData.accelerationIncludingGravity;
        let curTime = new Date().getTime();

        if ((curTime - DeviceMotion.last_update) > 10) {
            let diffTime = curTime - DeviceMotion.last_update;
            DeviceMotion.last_update = curTime;
            DeviceMotion.x = acceleration.x;
            DeviceMotion.y = acceleration.y;
            DeviceMotion.z = acceleration.z;
            let speed = Math.abs(DeviceMotion.x + DeviceMotion.y + DeviceMotion.z - DeviceMotion.last_x - DeviceMotion.last_y - DeviceMotion.last_z) / diffTime * 10000;
            if (speed > DeviceMotion.SHAKE_THRESHOLD) {
                DeviceMotion.callback();
            }
            DeviceMotion.last_x = DeviceMotion.x;
            DeviceMotion.last_y = DeviceMotion.y;
            DeviceMotion.last_z = DeviceMotion.z;
        }
    }
}
