import{s as _,j as U,r as h,o as v,c as w,a,b as d,w as n,d as f,p as b,u as $,e as F,f as L,g as B,h as A,i as C}from"./vendor.1af2c1ec.js";const I=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))l(r);new MutationObserver(r=>{for(const t of r)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function s(r){const t={};return r.integrity&&(t.integrity=r.integrity),r.referrerpolicy&&(t.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?t.credentials="include":r.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(r){if(r.ep)return;r.ep=!0;const t=s(r);fetch(r.href,t)}};I();var R=(e,o)=>{const s=e.__vccOpts||e;for(const[l,r]of o)s[l]=r;return s};const k={name:"home",data(){return{ffmpeg:null,recorder:null,drawRecordId:null,drawPlayId:null,videoUrl:"",recoderUrl:"",playing:!1,playingTitle:"\u89C6\u9891\u64AD\u653E"}},mounted(){this.videoUrl=this.$route.params.videoUrl,console.log(this.$route.params),console.log(this.$route.params.videoUrl),this.init()},methods:{async transcode(){this.ffmpeg.FS("writeFile","test.mp4",await _.fetchFile(this.videoUrl)),this.ffmpeg.FS("writeFile","my.wav",await _.fetchFile(this.recoderUrl)),await this.ffmpeg.run("-i","my.wav","my.mp3"),await this.ffmpeg.run("-i","test.mp4","-vcodec","copy","-an","no_audio_video.mp4"),await this.ffmpeg.run("-y","-i","no_audio_video.mp4","-i","my.mp3","-vcodec","copy","-acodec","copy","get.mp4");const e=this.ffmpeg.FS("readFile","get.mp4"),o=URL.createObjectURL(new Blob([e.buffer],{type:"video/mp4"}));this.videoUrl=o,console.log(this.videoUrl),this.$refs.videoPlayer.load(),console.log(o)},async removeAudio(){this.ffmpeg.FS("writeFile","test.mp4",await _.fetchFile(this.videoUrl)),await this.ffmpeg.run("-i","test.mp4","-vcodec","copy","-an","no_audio_video.mp4");const e=this.ffmpeg.FS("readFile","no_audio_video.mp4"),o=URL.createObjectURL(new Blob([e.buffer],{type:"video/mp4"}));this.videoUrl=o,console.log(this.videoUrl),this.$refs.videoPlayer.load(),console.log(o)},filechange(e){console.log(e);const o=e.target.files;console.log(o[0]);const s=new Blob([o[0]],{type:"video/mp4"});console.log(s),this.videoUrl=URL.createObjectURL(s),this.$refs.videoPlayer.load()},async init(){this.recorder=new U({sampleBits:16,sampleRate:48e3,numChannels:1,compiling:!1}),this.ffmpeg=_.createFFmpeg({log:!0}),await this.ffmpeg.load()},videoPlayOrStop(){this.playing?(this.$refs.videoPlayer.pause(),this.playingTitle="\u89C6\u9891\u64AD\u653E",this.playing=!1):(this.$refs.videoPlayer.play(),this.playingTitle="\u6682\u505C\u64AD\u653E",this.playing=!0)},startRecorder(){this.$refs.videoPlayer.load(),this.$refs.videoPlayer.muted=!0,this.recorder.start().then(()=>{this.$refs.videoPlayer.play(),this.drawRecord()},e=>{console.log(`${e.name} : ${e.message}`)})},resumeRecorder(){this.$refs.videoPlayer.play(),this.recorder.resume(),this.drawRecord()},pauseRecorder(){this.recorder.pause(),this.$refs.videoPlayer.pause(),this.drawRecordId&&cancelAnimationFrame(this.drawRecordId),this.drawRecordId=null},stopRecorder(){this.recorder.stop(),this.$refs.videoPlayer.pause(),this.drawRecordId&&cancelAnimationFrame(this.drawRecordId),this.drawRecordId=null,this.getWAVData()},playRecorder(){this.recorder.play(),this.drawPlay()},pausePlayRecorder(){this.recorder.pausePlay()},resumePlayRecorder(){this.recorder.resumePlay(),this.drawPlay()},stopPlayRecorder(){this.recorder.stopPlay()},destroyRecorder(){this.recorder.destroy().then(function(){this.drawRecordId&&cancelAnimationFrame(this.drawRecordId),this.drawRecordId=null,this.drawPlayId&&cancelAnimationFrame(this.drawPlayId),this.drawPlayId=null,this.recorder=null})},getRecordata(){var e=this.recorder.getRecordAnalyseData();this.recoderUrl=URL.createObjectURL(new Blob([e],{type:"video/mp3"})),console.log(e)},getPCMData(){var e=this.recorder.getPCMBlob();console.log(e),this.recoderUrl=URL.createObjectURL(e),console.log(this.recoderUrl)},getWAVData(){var e=this.recorder.getWAVBlob();console.log(e),this.recoderUrl=URL.createObjectURL(e),console.log(this.recoderUrl)},downPCM(){this.recorder.downloadPCM("\u65B0\u6587\u4EF6")},downWAV(){this.recorder.downloadWAV("\u65B0\u6587\u4EF6")},drawRecord(){this.drawRecordId=requestAnimationFrame(this.drawRecord),this.drawWave({canvas:this.$refs.record,dataArray:this.recorder.getRecordAnalyseData(),bgcolor:"rgb(255, 255, 255)",lineWidth:1,lineColor:"rgb(0, 128, 255)"})},drawPlay(){this.drawPlayId=requestAnimationFrame(this.drawPlay),this.drawWave({canvas:this.$refs.play,dataArray:this.recorder.getPlayAnalyseData()})},drawWave({canvas:e,dataArray:o,bgcolor:s="rgb(200, 200, 200)",lineWidth:l=2,lineColor:r="rgb(0, 0, 0)"}){if(!e)return;const t=e.getContext("2d"),i=o.length,c=e.width/i;let u=0;t.fillStyle=s,t.fillRect(0,0,540,80),t.lineWidth=l,t.strokeStyle=r,t.beginPath();for(let p=0;p<i;p++){const m=o[p]/128*e.height/2;p===0?t.moveTo(u,m):t.lineTo(u,m),u+=c}t.lineTo(e.width,e.height/2),t.stroke()}}},x={class:"VideoChoose"},O={controls:"",ref:"videoPlayer",class:"video-dispaly"},W=["src"],j={class:"BaseRecorder"},S={class:"BaseRecorder-record"},V=f("\u5F00\u59CB\u914D\u97F3"),M=f("\u6682\u505C\u914D\u97F3"),T=f("\u7EE7\u7EED\u914D\u97F3"),D=f("\u7ED3\u675F\u914D\u97F3"),N={class:"BaseRecorder-play"},E=f("\u97F3\u89C6\u9891\u5408\u6210"),H=a("div",{class:"BaseRecorder-download"},null,-1),q=a("div",{class:"BaseRecorder-destroy"},null,-1),K={class:"BaseRecorder-wave"},z={ref:"record"};function G(e,o,s,l,r,t){const i=h("el-button");return v(),w("div",x,[a("video",O,[a("source",{src:r.videoUrl,type:"video/mp4"},null,8,W)],512),a("div",j,[a("div",S,[d(i,{onClick:o[0]||(o[0]=c=>t.startRecorder()),class:"operate-recorder"},{default:n(()=>[V]),_:1}),d(i,{onClick:o[1]||(o[1]=c=>t.pauseRecorder()),class:"operate-recorder"},{default:n(()=>[M]),_:1}),d(i,{onClick:o[2]||(o[2]=c=>t.resumeRecorder()),class:"operate-recorder"},{default:n(()=>[T]),_:1}),d(i,{onClick:o[3]||(o[3]=c=>t.stopRecorder()),class:"operate-recorder"},{default:n(()=>[D]),_:1})]),a("div",N,[d(i,{onClick:o[4]||(o[4]=c=>t.transcode())},{default:n(()=>[E]),_:1})]),H,q,a("div",K,[a("canvas",z,null,512)])])])}var J=R(k,[["render",G]]);const Q={components:{Plus:b,Upload:$},methods:{clickLoad(){this.$refs.refFile.dispatchEvent(new MouseEvent("click"))},fileLoad(e){console.log(e);const o=e.target.files;console.log(o[0]);const s=new Blob([o[0]],{type:"video/mp4"});console.log(s);const l=URL.createObjectURL(s);this.$router.push({name:"home",params:{videoUrl:l}})}}},X={class:"common-layout"},Y=a("p",{class:"header-title"},"audio-video",-1),Z={class:"text item"},ee=a("div",null,"\u70B9\u51FB\u9009\u62E9\u89C6\u9891",-1);function oe(e,o,s,l,r,t){const i=h("el-header"),c=h("Plus"),u=h("el-icon"),p=h("el-card"),g=h("el-main"),m=h("el-container");return v(),w("div",X,[d(m,null,{default:n(()=>[d(i,null,{default:n(()=>[Y]),_:1}),d(g,null,{default:n(()=>[d(p,{class:"box-card",onClick:t.clickLoad},{default:n(()=>[a("div",Z,[d(u,{class:"avatar-uploader-icon"},{default:n(()=>[d(c)]),_:1}),a("input",{type:"file",id:"files",ref:"refFile",style:{display:"none"},onChange:o[0]||(o[0]=P=>t.fileLoad(P)),accept:"video/*"},null,544),ee])]),_:1},8,["onClick"])]),_:1})]),_:1})])}var te=R(Q,[["render",oe]]);const re={setup(e){return(o,s)=>{const l=h("router-view");return v(),F(l)}}},se=[{path:"/",component:te},{path:"/home/:videoUrl",name:"home",component:J}],ie=L({history:B(),routes:se}),y=A(re);y.use(C);y.use(ie);y.mount("#app");
