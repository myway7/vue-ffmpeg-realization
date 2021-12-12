import{s as _,j as P,r as h,o as v,c as y,a as d,b as l,w as n,d as U,e as u,p as C,u as $,f as F,g as k,h as L,i as B,k as A}from"./vendor.ca7048dc.js";const I=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const t of r)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function i(r){const t={};return r.integrity&&(t.integrity=r.integrity),r.referrerpolicy&&(t.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?t.credentials="include":r.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(r){if(r.ep)return;r.ep=!0;const t=i(r);fetch(r.href,t)}};I();var R=(e,o)=>{const i=e.__vccOpts||e;for(const[a,r]of o)i[a]=r;return i};const x={name:"home",data(){return{ffmpeg:null,recorder:null,drawRecordId:null,drawPlayId:null,videoUrl:"",recoderUrl:"",playing:!1,isShowCanvas:!0,isDisableClick:!0,playingTitle:"\u89C6\u9891\u64AD\u653E"}},mounted(){this.videoUrl=this.$route.params.videoUrl,console.log(this.$route.params),console.log(this.$route.params.videoUrl),this.init()},methods:{async transcode(){this.ffmpeg.FS("writeFile","test.mp4",await _.fetchFile(this.videoUrl)),this.ffmpeg.FS("writeFile","my.wav",await _.fetchFile(this.recoderUrl)),await this.ffmpeg.run("-i","my.wav","my.mp3"),await this.ffmpeg.run("-i","test.mp4","-vcodec","copy","-an","no_audio_video.mp4"),await this.ffmpeg.run("-y","-i","no_audio_video.mp4","-i","my.mp3","-vcodec","copy","-acodec","copy","get.mp4");const e=this.ffmpeg.FS("readFile","get.mp4"),o=URL.createObjectURL(new Blob([e.buffer],{type:"video/mp4"}));this.videoUrl=o,console.log(this.videoUrl),this.$refs.videoPlayer.load(),this.isDisableClick=!1,console.log(o)},async removeAudio(){this.ffmpeg.FS("writeFile","test.mp4",await _.fetchFile(this.videoUrl)),await this.ffmpeg.run("-i","test.mp4","-vcodec","copy","-an","no_audio_video.mp4");const e=this.ffmpeg.FS("readFile","no_audio_video.mp4"),o=URL.createObjectURL(new Blob([e.buffer],{type:"video/mp4"}));this.videoUrl=o,console.log(this.videoUrl),this.$refs.videoPlayer.load(),console.log(o)},filechange(e){console.log(e);const o=e.target.files;console.log(o[0]);const i=new Blob([o[0]],{type:"video/mp4"});console.log(i),this.videoUrl=URL.createObjectURL(i),this.$refs.videoPlayer.load()},async init(){this.recorder=new P({sampleBits:16,sampleRate:48e3,numChannels:1,compiling:!1}),this.ffmpeg=_.createFFmpeg({log:!0}),await this.ffmpeg.load()},videoPlayOrStop(){this.playing?(this.$refs.videoPlayer.pause(),this.playingTitle="\u89C6\u9891\u64AD\u653E",this.playing=!1):(this.$refs.videoPlayer.play(),this.playingTitle="\u6682\u505C\u64AD\u653E",this.playing=!0)},startRecorder(){this.$refs.videoPlayer.load(),this.$refs.videoPlayer.muted=!0,this.recorder.start().then(()=>{this.$refs.videoPlayer.play(),this.drawRecord(),this.isShowCanvas=!0},e=>{console.log(`${e.name} : ${e.message}`)})},resumeRecorder(){this.$refs.videoPlayer.play(),this.recorder.resume(),this.drawRecord()},pauseRecorder(){this.recorder.pause(),this.$refs.videoPlayer.pause(),this.drawRecordId&&cancelAnimationFrame(this.drawRecordId),this.drawRecordId=null},stopRecorder(){this.recorder.stop(),this.$refs.videoPlayer.pause(),this.drawRecordId&&cancelAnimationFrame(this.drawRecordId),this.drawRecordId=null,this.getWAVData(),this.isShowCanvas=!1},playRecorder(){this.recorder.play(),this.drawPlay()},pausePlayRecorder(){this.recorder.pausePlay()},resumePlayRecorder(){this.recorder.resumePlay(),this.drawPlay()},stopPlayRecorder(){this.recorder.stopPlay()},transcodePlay(){this.$refs.videoPlayer.muted=!1,this.$refs.videoPlayer.play()},videoDownload(){},destroyRecorder(){this.recorder.destroy().then(function(){this.drawRecordId&&cancelAnimationFrame(this.drawRecordId),this.drawRecordId=null,this.drawPlayId&&cancelAnimationFrame(this.drawPlayId),this.drawPlayId=null,this.recorder=null})},getRecordata(){var e=this.recorder.getRecordAnalyseData();this.recoderUrl=URL.createObjectURL(new Blob([e],{type:"video/mp3"})),console.log(e)},getPCMData(){var e=this.recorder.getPCMBlob();console.log(e),this.recoderUrl=URL.createObjectURL(e),console.log(this.recoderUrl)},getWAVData(){var e=this.recorder.getWAVBlob();console.log(e),this.recoderUrl=URL.createObjectURL(e),console.log(this.recoderUrl)},downPCM(){this.recorder.downloadPCM("\u65B0\u6587\u4EF6")},downWAV(){this.recorder.downloadWAV("\u65B0\u6587\u4EF6")},drawRecord(){this.drawRecordId=requestAnimationFrame(this.drawRecord),this.drawWave({canvas:this.$refs.record,dataArray:this.recorder.getRecordAnalyseData(),bgcolor:"rgb(255, 255, 255)",lineWidth:1,lineColor:"rgb(0, 128, 255)"})},drawPlay(){this.drawPlayId=requestAnimationFrame(this.drawPlay),this.drawWave({canvas:this.$refs.play,dataArray:this.recorder.getPlayAnalyseData()})},drawWave({canvas:e,dataArray:o,bgcolor:i="rgb(255, 255, 255)",lineWidth:a=2,lineColor:r="rgb(0, 0, 0)"}){if(!e)return;const t=e.getContext("2d"),s=o.length,c=e.width/s;let f=0;t.fillStyle=i,t.fillRect(0,0,e.width,e.height),console.log(e),t.lineWidth=a,t.strokeStyle=r,t.beginPath();for(let p=0;p<s;p++){const m=o[p]/128*e.height/2;p===0?t.moveTo(f,m):t.lineTo(f,m),f+=c}t.lineTo(e.width,e.height/2),t.stroke()}}},O={class:"VideoChoose"},S={controls:"",ref:"videoPlayer",class:"video-dispaly"},D=["src"],W={class:"BaseRecorder"},j={class:"BaseRecorder-record"},V=u("\u5F00\u59CB\u914D\u97F3"),M=u("\u6682\u505C\u914D\u97F3"),N=u("\u7EE7\u7EED\u914D\u97F3"),T=u("\u7ED3\u675F\u914D\u97F3"),E={class:"BaseRecorder-play"},H=u("\u97F3\u89C6\u9891\u5408\u6210"),q=u("\u9884\u89C8"),K=u("\u4E0B\u8F7D"),z=d("div",{class:"BaseRecorder-download"},null,-1),G=d("div",{class:"BaseRecorder-destroy"},null,-1),J={class:"BaseRecorder-wave"},Q={key:0,ref:"record"};function X(e,o,i,a,r,t){const s=h("el-button");return v(),y("div",O,[d("video",S,[d("source",{src:r.videoUrl,type:"video/mp4"},null,8,D)],512),d("div",W,[d("div",j,[l(s,{onClick:o[0]||(o[0]=c=>t.startRecorder()),class:"operate-recorder"},{default:n(()=>[V]),_:1}),l(s,{onClick:o[1]||(o[1]=c=>t.pauseRecorder()),class:"operate-recorder"},{default:n(()=>[M]),_:1}),l(s,{onClick:o[2]||(o[2]=c=>t.resumeRecorder()),class:"operate-recorder"},{default:n(()=>[N]),_:1}),l(s,{onClick:o[3]||(o[3]=c=>t.stopRecorder()),class:"operate-recorder"},{default:n(()=>[T]),_:1})]),d("div",E,[l(s,{onClick:o[4]||(o[4]=c=>t.transcode())},{default:n(()=>[H]),_:1}),l(s,{disabled:r.isDisableClick,onClick:o[5]||(o[5]=c=>t.transcodePlay())},{default:n(()=>[q]),_:1},8,["disabled"]),l(s,{disabled:r.isDisableClick,onClick:t.videoDownload},{default:n(()=>[K]),_:1},8,["disabled","onClick"])]),z,G,d("div",J,[r.isShowCanvas?(v(),y("canvas",Q,null,512)):U("",!0)])])])}var Y=R(x,[["render",X]]);const Z={components:{Plus:C,Upload:$},methods:{clickLoad(){this.$refs.refFile.dispatchEvent(new MouseEvent("click"))},fileLoad(e){console.log(e);const o=e.target.files;console.log(o[0]);const i=new Blob([o[0]],{type:"video/mp4"});console.log(i);const a=URL.createObjectURL(i);this.$router.push({name:"home",params:{videoUrl:a}})}}},ee={class:"common-layout"},oe=d("p",{class:"header-title"},"audio-video",-1),te={class:"text item"},re=d("div",null,"\u70B9\u51FB\u9009\u62E9\u89C6\u9891",-1);function se(e,o,i,a,r,t){const s=h("el-header"),c=h("Plus"),f=h("el-icon"),p=h("el-card"),w=h("el-main"),m=h("el-container");return v(),y("div",ee,[l(m,null,{default:n(()=>[l(s,null,{default:n(()=>[oe]),_:1}),l(w,null,{default:n(()=>[l(p,{class:"box-card",onClick:t.clickLoad},{default:n(()=>[d("div",te,[l(f,{class:"avatar-uploader-icon"},{default:n(()=>[l(c)]),_:1}),d("input",{type:"file",id:"files",ref:"refFile",style:{display:"none"},onChange:o[0]||(o[0]=b=>t.fileLoad(b)),accept:"video/*"},null,544),re])]),_:1},8,["onClick"])]),_:1})]),_:1})])}var ie=R(Z,[["render",se]]);const le={setup(e){return(o,i)=>{const a=h("router-view");return v(),F(a)}}},ae=[{path:"/",component:ie},{path:"/home/:videoUrl",name:"home",component:Y}],de=k({history:L(),routes:ae}),g=B(le);g.use(A);g.use(de);g.mount("#app");
