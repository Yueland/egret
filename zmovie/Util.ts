/**
 * Created by zringhost on 15-2-10.
 */
module zmovie{
    export class Util{
        public static clearDisposeDisplay(d:egret.DisplayObjectContainer):void{
            try{
                let tmpD:egret.DisplayObject;
                for(let i:number = d.numChildren-1;i>=0;i--){
                    tmpD = d.getChildAt(i);
                    d.removeChild(tmpD);
                }
            }catch(err){}
        }

        public static getTextureArrByName(imgArr:any,libObj:any,libName:string):any[]{
            let ret:any[] = [];
            let t:egret.Texture = Util.getTextureByName(imgArr,libName);
            if(null == t){
                let arr:any[] = libObj.clipping[libName];
                if(null != arr){
                    for (let i:number = arr.length-1;i>=0;i--){
                        t = Util.getTextureByName(imgArr,arr[i].name);
                        if(null != t){
                            ret.push({t:t,x:arr[i].x,y:arr[i].y});
                        }else{
                            return ret;
                        }
                    }
                }
                return ret;
            }
            ret.push({t:t,x:0,y:0});
            return ret;
        }

        public static getTextureByName(imgArr:any,libName:string):egret.Texture{
            let t:egret.Texture = null;
            try{
              t  = RES.getRes(imgArr+"."+libName);
            }catch(err){}
            try{
                if(null == t){
                    let arr:string[] = imgArr;
                    for (let i:number = arr.length-1;i>=0;i--){
                        let t:egret.Texture = RES.getRes(arr[i]+"."+libName);
                        if(null != t){
                            return t;
                        }
                    }
                }
            }catch(err){}
            return t;
        }
    }
}