<template>
    <div class="video-view">
        <div ref="queryVideoPlayer" class="video-player">
            <video ref="queryVideo" class="video-player-area" :controls="false" :autoplay="true" :muted="init.isMuted" @canplay="canplayVideo" @timeupdate="timeupdateVideo" @playing="playingVideo" @waiting="waitingVideo" @ended="endedVideo" @error="errorVideo" @progress="progressVideo">
                <source :src="video.url" type="video/mp4">
                <source :src="video.url" type="video/webm">
                <source :src="video.url" type="video/ogg">
                 您的浏览器不支持 HTML5 视频.
            </video>
            <div class="video-player-controls">
                <!-- 视频进度条 -->
                <div class="video-controls-b">
                    <!-- <div class="loading-bar" style="width:80%"></div> -->
                    <div class="progress-bar" :style="{width:init.currentStyleVal}"></div>
                    <div class="progress-ball-wrap yiku-flex-c" :style="{left:init.currentStyleVal}">
                        <div class="progress-ball"></div>
                    </div>
                </div>
                <!-- 视频控制器 -->
                <div class="video-controls-f yiku-flex">
                    <div class="controls-handle-l yiku-flex">
                        <div class="handle-item" @click="toggleVideo">
                            <alike-icon type="stop" color="#ffffff" size="30px" v-if="init.isPlay"></alike-icon>
                            <alike-icon type="play-fill" color="#ffffff" size="30px" v-else></alike-icon>
                        </div>                           
                        <div class="handle-item">
                            <span style="color:#ffffff">{{init.currentTimeText}}/{{init.durationText}}</span>
                        </div>    
                    </div>
                    <div class="yiku-flex__item"></div>
                    <div class="controls-handle-r yiku-flex">
                        <div class="handle-item yiku-flex-c" title="倍速调节">
                            <select ref="queryBackRate" @change="setBackRate">
                                <option :value="item.value" v-for="(item,index) in backRates" :key="index" :selected="index == 2">
                                    <span>{{item.label}}</span>
                                </option>
                            </select>
                        </div>
                        <input ref="queryRange" type="range" v-model="init.volume" :step="0.01" :min="0" :max="1" @change="setVolume" />
                        <div class="handle-item" title="音量调节" @click="toggleMuted">
                            <alike-icon type="voice" color="#ffffff" size="30px" v-if="!init.isMuted"></alike-icon>
                            <alike-icon type="voice-fill" color="#ffffff" size="30px" v-else></alike-icon>
                        </div>
                        <div class="handle-item" title="全屏调节">
                            <alike-icon type="fullscreen" color="#ffffff" size="26px" @click="openFullScreen" v-if="!init.isFullScreen"></alike-icon>
                            <alike-icon type="scan" color="#ffffff" size="30px" @click="closeFullScreen" v-else></alike-icon>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 
            <div class="slider-view">
                <div class="slider-view-c"></div>
            </div>
        -->
    </div>
</template>

<script>
    export default {
        name: "Video",
        data(){
            return {
                video:{
                    url:"https://f.video.weibocdn.com/qGSDqipzlx07J2TZB99m01041200g5XI0E010.mp4?label=mp4_ld&template=640x360.25.0&trans_finger=6006a648d0db83b7d9951b3cee381a9c&ori=0&ps=1BVp4ysnknHVZu&Expires=1617120489&ssig=7M6ndumMlf&KID=unistore,video",
                    url2:"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-43c20c00-3790-42e0-9745-d92b13b8e402/1eed9978-4260-43dc-83c2-c093246d82db.mp4",
                    title:"小爷"
                },
                init:{
                    isPlay:true,        // 默认自动静态播放
                    isMuted:true,
                    isFullScreen:false,
                    volume:0.5,      // 当前音量
                    duration:0,       // 当前视频长度
                    currentTime:0,       // 当前播放长度                    
                    durationText:0,       // 当前视频长度
                    currentTimeText:0,       // 当前播放长度
                    buffered:0,              // 缓存进度（分为多段暂不处理）
                    currentStyleVal:0
                },
                backRates: [
                    {
                        value: 0.25,
                        label: '慢速0.25'
                    },                  
                    {
                        value: 0.5,
                        label: '慢速0.5'
                    },
                    {
                        value: 1,
                        label: '正常'
                    },  
                    {
                        value: 1.5,
                        label: '快速1.5'
                    }, 
                    {
                        value: 2,
                        label: '快速2'
                    }, 
                    {
                        value: 3,
                        label: '快速3'
                    }, 
                    {
                        value: 5,
                        label: '快速5'
                    }
                ]
            }
        },
        methods:{
            toggleVideo(){
                this.init.isPlay = !this.init.isPlay;
                if(this.init.isPlay){
                    this.$refs.queryVideo.play();
                }else{
                    this.$refs.queryVideo.pause();
                }
            },
            canplayVideo(){
                // console.log(this.$refs.queryVideo.duration);
                this.init.duration = this.$refs.queryVideo.duration;
                this.init.durationText = this.formatTime(this.init.duration);
            },
            timeupdateVideo(){
                // console.log(this.$refs.queryVideo.currentTime);
                this.init.currentTime = this.$refs.queryVideo.currentTime;
                this.init.currentTimeText = this.formatTime(this.init.currentTime);
                this.init.currentStyleVal = this.formatProgress(this.init.currentTime,this.init.duration);
            },
            playingVideo(){// 在视频/音频（audio/video）暂停或者在缓冲后准备重新开始播放时触发。
                console.log('playingVideo',this.$refs.queryVideo.buffered);
            },
            waitingVideo(){// 视频由于要播放下一帧而需要缓冲时触发。
                console.log('waitingVideo',this.$refs.queryVideo.buffered);
            },
            endedVideo(){
                 this.init.isPlay = false;
            },
            errorVideo(){
                console.log('errorVideo');
            },
            progressVideo(){// 浏览器下载指定的视频/音频（audio/video）时触发
                console.log('progressVideo');
            },
            formatProgress(c,t){
                return (c / t * 100) + '%';
            },
            formatTime(t){
                var h = parseInt(t/3600)
                h = h<10?'0'+h:h 
                var m = parseInt(t%3600/60)
                m = m<10?'0'+m:m
                var s = parseInt(t%60)
                s = s<10?'0'+s:s
                return h+':'+m+':'+s
            },
            setCurrentTime(value){
                // this.$refs.queryVideo.currentTime = value;
            },
            setBackRate(e){
                // console.log('setBackRate',e,this.$refs.queryBackRate.value);
                this.$refs.queryVideo.playbackRate = this.$refs.queryBackRate.value;
            },
            setVolume(e){
                // console.log('setVolume',e,this.$refs.queryRange.value);
                this.$refs.queryVideo.volume = this.init.volume;

                if(this.init.volume == 0){
                    this.init.isMuted = true;
                }else{
                    this.init.isMuted = false;
                }
            },
            toggleMuted(){
                this.init.isMuted = !this.init.isMuted;
            },            
            openFullScreen(){
                this.init.isFullScreen = true;
                this.openFS(this.$refs.queryVideoPlayer);
            },
            closeFullScreen(){
                this.init.isFullScreen = false;
                this.closeFS();
            },
            openFS(ele){// 开启的时候需要指定元素
                if (ele.requestFullscreen) {
                    ele.requestFullscreen();
                } else if (ele.mozRequestFullScreen) { /* Firefox */
                    ele.mozRequestFullScreen();
                } else if (ele.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                    ele.webkitRequestFullscreen();
                } else if (ele.msRequestFullscreen) { /* IE/Edge */
                    ele.msRequestFullscreen();
                }
            },
            closeFS(){// 关闭的时候只需委托给文档（因为一个显示器只有一个浏览器窗口能全屏）
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) { /* Firefox */
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) { /* IE/Edge */
                    document.msExitFullscreen();
                }
            }
        }
    }
</script>

<style scoped>
    .slider-view{
        position: relative;
        width: 20px;
        margin: 0 auto;
        height: 74px;
        overflow: hidden;
        top: 15px;
        cursor: pointer;
    }
    .slider-view-c{    
        width: 20px;
        height: 20px;
        position: absolute;
        background: #fff;
        border: 1px solid #cfcfcf;
        box-sizing: border-box;
        border-radius: 50%;
        transform: translate3d(0px, 0px, 0px);
        display: block;
        /* inset: 0px auto auto 0px; */
        top:0px
    }
    .slider-view-c:before,.slider-view-c:after{
        content: "";
        position: absolute;
        display: block;
        height: 80px;
        width: 6px;
        left: 6px;
    }
    .slider-view-c:before{
        background-color: #f80;
        top: 19px;
    }
    .slider-view-c:after{
        background-color: #e7e7e7;
        top: -81px;
    }
    .yiku-flex{display:flex;}
    .yiku-flex-c{display:flex;align-items:center;}
    .yiku-flex__item{flex:1;}
    .video-player{position:relative;margin:0 auto;width:640px;line-height:0;vertical-align:bottom;}
    .video-player .video-player-area{width:100%;}
    .video-player .video-player-controls{position:absolute;left:0;bottom:0;right:0;width:100%;line-height: 1.6;}
    .video-controls-f{height:50px;padding:0 15px;background:rgba(0,0,0,.3);}
    .video-controls-f .controls-handle-l,.video-controls-f .controls-handle-r{position:relative;overflow:hidden;}
    .video-controls-f .handle-item{height:100%;margin-right:10px;}
    .video-controls-f .handle-item:last-child{margin-right:0!important;}
    .video-controls-f .handle-item>i{font-size:30px;cursor:pointer;}
    .video-controls-f .handle-item>i:hover,.video-controls-f .handle-item>i:active{color:#409EFF!important;}
    .handle-btn{color:#fff;font-size:14px;padding:2px 10px;border-radius:15px;cursor:pointer;background-color:rgba(0,0,0,.6);}
    .handle-btn:hover,.handle-btn:active{background-color:rgba(20,125,255,.6)!important;}

    /* 播放进度条 */
    .video-controls-b{position:relative;height:6px;background:rgba(255,255,255,.3);cursor:pointer;}
    .video-controls-b .loading-bar{width:0%;height:100%;background-color:rgba(200,200,200,.6)!important;}
    .video-controls-b .progress-bar{position:absolute;top:0;left:0;width:0%;height:100%;background-color:rgba(64,158,255,.6)!important;}
    .video-controls-b .progress-ball-wrap{width:16px;height:16px;border-radius:50%;position:absolute;top:50%;left:0%;transform:translate(-50%,-50%);background-color:rgba(110,170,230,.6)!important;}
    .video-controls-b .progress-ball-wrap .progress-ball{width:10px;height:10px;margin:0 auto;border-radius:50%;background-color:#8ec6ff!important;}
</style>