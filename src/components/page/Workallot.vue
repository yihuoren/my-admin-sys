<template>
    <div class="webApi">
       <div>
           <p class="rotate">屏幕旋转角度:{{ angle }} 度</p>
           <p class="rotate">{{ batteryInfo }}</p>
           <p class="rotate" @click="vibrateFun()">{{ vibrateInfo }}</p>
           <p class="rotate">当前网络状况 : {{ onLineInfo }}</p>
           <p class="rotate" @click="fullScreenFun()">{{ fullScreenInfo }}</p>
       </div>
   </div>
</template>
<script>
export default {
    name: 'workallot',
    data() {
        return {
            angle: 0,
            batteryInfo: 0,
            vibrateInfo: '点击震动',
            onLineInfo: 'online',
            fullScreenInfo: "打开全屏",
            infoNum: 1,
            timer: null
        }
    },
    mounted(){
        let self = this;
        self.screenOrientation();
        self.getBatteryInfo();
        window.addEventListener('online',  self.updateOnlineStatus, true);
        window.addEventListener('offline', self.updateOnlineStatus, true);
        window.addEventListener('blur',  self.doFlashTitle, true);
        window.addEventListener('focus', function () {
            clearInterval(self.timer);
            document.title = '微信网页版';
        }, true);
    },
    methods:{
        screenOrientation: function(){
            let self = this;
            let orientation = screen.orientation || screen.mozOrientation || screen.msOrientation;
            window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
                self.angle = orientation.angle;
            });
        },
        getBatteryInfo: function(){
            let self = this;
            if(navigator.getBattery){
                navigator.getBattery().then(function(battery) {
                    // 判断是否在充电
                    self.batteryInfo = battery.charging ? `在充电 : 剩余 ${battery.level * 100}%` : `没充电 : 剩余 ${battery.level * 100}%`;
                    // 电池充电状态改变事件
                    battery.addEventListener('chargingchange', function(){
                        self.batteryInfo = battery.charging ? `在充电 : 剩余 ${battery.level * 100}%` : `没充电 : 剩余 ${battery.level * 100}%`;
                    });
                });
            }else{
                self.batteryInfo = '不支持电池状态接口';
            }
        },
        vibrateFun: function(){
            let self = this;
            if( navigator.vibrate ){
                navigator.vibrate([500, 500, 500, 500, 500, 500, 500, 500, 500, 500]);
            }else{
                self.vibrateInfo = "您的设备不支持震动";
            }
        },
        updateOnlineStatus: function(){
            var self = this;
            self.onLineInfo = navigator.onLine ? "online" : "offline";
        },
        fullScreenFun: function(){
            let self = this;
            var fullscreenEnabled = document.fullscreenEnabled       ||
                                    document.mozFullScreenEnabled    ||
                                    document.webkitFullscreenEnabled ||
                                    document.msFullscreenEnabled;
            if (fullscreenEnabled) {
                let de = document.documentElement;
                if(self.fullScreenInfo === '打开全屏'){
                    if( de.requestFullscreen ){
                        de.requestFullscreen();
                    }else if( de.mozRequestFullScreen ){
                        de.mozRequestFullScreen();
                    }else if( de.webkitRequestFullScreen ){
                        de.webkitRequestFullScreen();
                    }
                    self.fullScreenInfo = '退出全屏'
                } else {
                    if( document.exitFullscreen ){
                        document.exitFullscreen();
                    }else if( document.mozCancelFullScreen ){
                        document.mozCancelFullScreen();
                    }else if( document.webkitCancelFullScreen ){
                        document.webkitCancelFullScreen();
                    }
                    self.fullScreenInfo = '打开全屏'
                }
            } else {
                self.fullScreenInfo = '浏览器当前不能全屏';
            }
        },
        doFlashTitle: function(){
            var self = this;
            self.timer = setInterval( () => {
                if (!self.flashFlag) {
                    document.title = "微信网页版";
                } else {
                    document.title = `微信（${self.infoNum}）`;
                }
                self.flashFlag = ! self.flashFlag
            }, 500)
        },
    }
}
</script>
<style scoped>
:fullscreen {
    background: pink;
}
.webApi {
    position: absolute;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
.rotate {
    width: 10em;
    padding: 0 1em;
    height: 2.75em;
    border-radius: .25em;
    background: #ffe019;
    text-align: center;
    line-height: 2.75em;
    font-size: 16px;
    color: #ff0000;
    margin: 1em auto;
}
</style>
