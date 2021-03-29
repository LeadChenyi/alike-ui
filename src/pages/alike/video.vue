<template>
    <div class="video-view">
        <br>
        <h2>视频页面 <i class="icon-notification-forbid-fill"></i></h2>
        <hr>
        <br>
        <div class="video-player" ref="queryVideoPlayer">
            <video id="videoID" class="video-player-screen" ref="videoDOM" src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-43c20c00-3790-42e0-9745-d92b13b8e402/1eed9978-4260-43dc-83c2-c093246d82db.mp4"></video>
            <div class="video-player-controls">
                <!-- 视频进度条 -->
                <div class="video-controls-b">
                    <div class="loading-bar" style="width:80%"></div>
                    <div class="progress-bar" style="width:50%"></div>
                    <div class="progress-ball-wrap yiku-flex-c">
                        <div class="progress-ball"></div>
                    </div>
                </div>
                <!-- 视频控制器 -->
                <div class="video-controls-f yiku-flex">
                    <div class="controls-handle-l yiku-flex">
                        <div v-if="initObj.isPlay" class="handle-item" title="暂停" @click="toggleVideo">
                            <i class="icon-stop c-white"></i>暂停
                        </div>
                        <div v-else class="handle-item" title="播放" @click="toggleVideo">
                            <i class="icon-play-fill c-white"></i>播放
                        </div>
                        <div class="handle-item" title="全屏播放" @click="openFullScreen" v-if="!isFullScreen">
                            <i class="icon-play-forward-fill c-white"></i>全屏播放
                        </div>                        
                        <div class="handle-item" title="退出全屏" @click="closeFullScreen" v-else>
                            <i class="icon-play-forward-fill c-white"></i>退出全屏
                        </div>
                        <div class="handle-item" title="播放下一个">
                            <i class="icon-play-forward-fill c-white"></i>
                        </div>
                    </div>
                    <div class="yiku-flex__item"></div>
                    <div class="controls-handle-r yiku-flex">
                        <div class="handle-item yiku-flex-c" title="调节倍速">
                            <div class="handle-btn">倍速</div>
                        </div>
                        <div class="handle-item" title="调节音量">
                            <i class="icon-notification-fill c-white"></i>
                        </div>
                        <div class="handle-item" title="全屏播放" @click="allScreen">
                            <i class="icon-full c-white"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br>
        <br>
        <div class="slider-view">
            <div class="slider-view-c"></div>
        </div>
        <!-- <el-select v-model="rateVal" placeholder="请选择播放速度" @change="setRate">
            <el-option
                    v-for="item in rateOpts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
        </el-select>
        <br>
        <br>
        <div class="block">
            <span class="demonstration">当前播放位置</span>
            <el-slider v-model="timeVal" :max="durationVal"></el-slider>
        </div> -->
    </div>
</template>

<script>
    export default {
        name: "Video",
        data(){
            return {
                initObj:{
                    isPlay:false
                },
                rateOpts: [
                    {
                        value: 1,
                        label: '正常'
                    }, {
                        value: 0.5,
                        label: '慢速0.5'
                    }, {
                        value: 1.5,
                        label: '快速1.5'
                    }, {
                        value: 2,
                        label: '快速2'
                    }, {
                        value: 2.5,
                        label: '快速2.5'
                    }
                ],
                rateVal:1,
                timeVal:0,
                durationVal:0,
                isFullScreen:false
            }
        },
        methods:{
            toggleVideo(){
                this.initObj.isPlay = !this.initObj.isPlay;
                if(this.initObj.isPlay){
                    this.$refs.videoDOM.play();
                }else{
                    this.$refs.videoDOM.pause();
                }
                if(this.durationVal == 0){
                    this.durationVal = this.$refs.videoDOM.duration;
                    let progressTimer = setInterval(()=>{
                        this.timeVal = this.$refs.videoDOM.currentTime;

                        //播放完毕
                        if(this.timeVal >= this.durationVal){
                            clearTimeout(progressTimer);
                        }
                    },1000)
                }
            },
            setRate(){
                this.$refs.videoDOM.playbackRate = this.rateVal;
            },
            allScreen(){
                this.$refs.videoDOM.webkitRequestFullScreen();
            },
            openFullScreen(){
                this.isFullScreen = true;
                this.open(this.$refs.queryVideoPlayer);
            },
            closeFullScreen(){
                this.isFullScreen = false;
                this.close();
            },
            open(ele){// 开启的时候需要指定元素
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
            close(){// 关闭的时候只需委托给文档（因为一个显示器只有一个浏览器窗口能全屏）
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
    .video-player{position:relative;margin:0 auto;min-width:415px;width:calc(60vw);line-height:0;vertical-align:bottom;}
    .video-player .video-player-screen{width:100%;}
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
    .video-controls-b .progress-ball-wrap{width:16px;height:16px;border-radius:50%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);background-color:rgba(110,170,230,.6)!important;}
    .video-controls-b .progress-ball-wrap .progress-ball{width:10px;height:10px;margin:0 auto;border-radius:50%;background-color:#8ec6ff!important;}
</style>