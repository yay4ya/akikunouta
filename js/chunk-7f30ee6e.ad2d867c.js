(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7f30ee6e"],{"0fe3":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a=i("3041"),r=c(a),s=i("308c"),o=c(s),u=i("dc91"),l=c(u);function c(e){return e&&e.__esModule?e:{default:e}}var d=void 0;t.default=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=arguments.length>2&&void 0!==arguments[2]&&arguments[2],a=(0,r.default)();if(d||(d=(0,o.default)(a)),t.events)throw new Error("Event handlers cannot be overwritten.");if("string"===typeof e&&!document.getElementById(e))throw new Error('Element "'+e+'" does not exist.');t.events=l.default.proxyEvents(a);var s=new Promise((function(i){if("object"===("undefined"===typeof e?"undefined":n(e))&&e.playVideo instanceof Function){var r=e;i(r)}else d.then((function(n){var r=new n.Player(e,t);return a.on("ready",(function(){i(r)})),null}))})),u=l.default.promisifyPlayer(s,i);return u.on=a.on,u.off=a.off,u},e.exports=t["default"]},1468:function(e,t){var i=1e3,n=60*i,a=60*n,r=24*a,s=365.25*r;function o(e){if(e=String(e),!(e.length>100)){var t=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);if(t){var o=parseFloat(t[1]),u=(t[2]||"ms").toLowerCase();switch(u){case"years":case"year":case"yrs":case"yr":case"y":return o*s;case"days":case"day":case"d":return o*r;case"hours":case"hour":case"hrs":case"hr":case"h":return o*a;case"minutes":case"minute":case"mins":case"min":case"m":return o*n;case"seconds":case"second":case"secs":case"sec":case"s":return o*i;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return o;default:return}}}}function u(e){return e>=r?Math.round(e/r)+"d":e>=a?Math.round(e/a)+"h":e>=n?Math.round(e/n)+"m":e>=i?Math.round(e/i)+"s":e+"ms"}function l(e){return c(e,r,"day")||c(e,a,"hour")||c(e,n,"minute")||c(e,i,"second")||e+" ms"}function c(e,t,i){if(!(e<t))return e<1.5*t?Math.floor(e/t)+" "+i:Math.ceil(e/t)+" "+i+"s"}e.exports=function(e,t){t=t||{};var i=typeof e;if("string"===i&&e.length>0)return o(e);if("number"===i&&!1===isNaN(e))return t.long?l(e):u(e);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))}},3041:function(e,t,i){"use strict";var n;
/**
* @link https://github.com/gajus/sister for the canonical source repository
* @license https://github.com/gajus/sister/blob/master/LICENSE BSD 3-Clause
*/n=function(){var e={},t={};return e.on=function(e,i){var n={name:e,handler:i};return t[e]=t[e]||[],t[e].unshift(n),n},e.off=function(e){var i=t[e.name].indexOf(e);-1!==i&&t[e.name].splice(i,1)},e.trigger=function(e,i){var n,a=t[e];if(a){n=a.length;while(n--)a[n].handler(i)}},e},e.exports=n},"308c":function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i("32e6"),a=r(n);function r(e){return e&&e.__esModule?e:{default:e}}t.default=function(e){var t=new Promise((function(t){if(window.YT&&window.YT.Player&&window.YT.Player instanceof Function)t(window.YT);else{var i="http:"===window.location.protocol?"http:":"https:";(0,a.default)(i+"//www.youtube.com/iframe_api",(function(t){t&&e.trigger("error",t)}));var n=window.onYouTubeIframeAPIReady;window.onYouTubeIframeAPIReady=function(){n&&n(),t(window.YT)}}}));return t},e.exports=t["default"]},"32e6":function(e,t){function i(e,t){for(var i in t)e.setAttribute(i,t[i])}function n(e,t){e.onload=function(){this.onerror=this.onload=null,t(null,e)},e.onerror=function(){this.onerror=this.onload=null,t(new Error("Failed to load "+this.src),e)}}function a(e,t){e.onreadystatechange=function(){"complete"!=this.readyState&&"loaded"!=this.readyState||(this.onreadystatechange=null,t(null,e))}}e.exports=function(e,t,r){var s=document.head||document.getElementsByTagName("head")[0],o=document.createElement("script");"function"===typeof t&&(r=t,t={}),t=t||{},r=r||function(){},o.type=t.type||"text/javascript",o.charset=t.charset||"utf8",o.async=!("async"in t)||!!t.async,o.src=e,t.attrs&&i(o,t.attrs),t.text&&(o.text=""+t.text);var u="onload"in o?n:a;u(o,r),o.onload||n(o,r),s.appendChild(o)}},"34eb":function(e,t,i){(function(n){function a(){return!("undefined"===typeof window||!window.process||"renderer"!==window.process.type)||("undefined"!==typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!==typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||"undefined"!==typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||"undefined"!==typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))}function r(e){var i=this.useColors;if(e[0]=(i?"%c":"")+this.namespace+(i?" %c":" ")+e[0]+(i?"%c ":" ")+"+"+t.humanize(this.diff),i){var n="color: "+this.color;e.splice(1,0,n,"color: inherit");var a=0,r=0;e[0].replace(/%[a-zA-Z%]/g,(function(e){"%%"!==e&&(a++,"%c"===e&&(r=a))})),e.splice(r,0,n)}}function s(){return"object"===typeof console&&console.log&&Function.prototype.apply.call(console.log,console,arguments)}function o(e){try{null==e?t.storage.removeItem("debug"):t.storage.debug=e}catch(i){}}function u(){var e;try{e=t.storage.debug}catch(i){}return!e&&"undefined"!==typeof n&&"env"in n&&(e=Object({NODE_ENV:"production",BASE_URL:"/akikunouta/"}).DEBUG),e}function l(){try{return window.localStorage}catch(e){}}t=e.exports=i("96fe"),t.log=s,t.formatArgs=r,t.save=o,t.load=u,t.useColors=a,t.storage="undefined"!=typeof chrome&&"undefined"!=typeof chrome.storage?chrome.storage.local:l(),t.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"],t.formatters.j=function(e){try{return JSON.stringify(e)}catch(t){return"[UnexpectedJSONParseError]: "+t.message}},t.enable(u())}).call(this,i("4362"))},"74c9":function(e,t,i){"use strict";i("9fd8")},"96fe":function(e,t,i){var n;function a(e){var i,n=0;for(i in e)n=(n<<5)-n+e.charCodeAt(i),n|=0;return t.colors[Math.abs(n)%t.colors.length]}function r(e){function i(){if(i.enabled){var e=i,a=+new Date,r=a-(n||a);e.diff=r,e.prev=n,e.curr=a,n=a;for(var s=new Array(arguments.length),o=0;o<s.length;o++)s[o]=arguments[o];s[0]=t.coerce(s[0]),"string"!==typeof s[0]&&s.unshift("%O");var u=0;s[0]=s[0].replace(/%([a-zA-Z%])/g,(function(i,n){if("%%"===i)return i;u++;var a=t.formatters[n];if("function"===typeof a){var r=s[u];i=a.call(e,r),s.splice(u,1),u--}return i})),t.formatArgs.call(e,s);var l=i.log||t.log||console.log.bind(console);l.apply(e,s)}}return i.namespace=e,i.enabled=t.enabled(e),i.useColors=t.useColors(),i.color=a(e),"function"===typeof t.init&&t.init(i),i}function s(e){t.save(e),t.names=[],t.skips=[];for(var i=("string"===typeof e?e:"").split(/[\s,]+/),n=i.length,a=0;a<n;a++)i[a]&&(e=i[a].replace(/\*/g,".*?"),"-"===e[0]?t.skips.push(new RegExp("^"+e.substr(1)+"$")):t.names.push(new RegExp("^"+e+"$")))}function o(){t.enable("")}function u(e){var i,n;for(i=0,n=t.skips.length;i<n;i++)if(t.skips[i].test(e))return!1;for(i=0,n=t.names.length;i<n;i++)if(t.names[i].test(e))return!0;return!1}function l(e){return e instanceof Error?e.stack||e.message:e}t=e.exports=r.debug=r["default"]=r,t.coerce=l,t.disable=o,t.enable=s,t.enabled=u,t.humanize=i("1468"),t.names=[],t.skips=[],t.formatters={}},"9e29":function(e,t,i){},"9fd8":function(e,t,i){},b3fa:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=["ready","stateChange","playbackQualityChange","playbackRateChange","error","apiChange","volumeChange"],e.exports=t["default"]},b74c:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=["cueVideoById","loadVideoById","cueVideoByUrl","loadVideoByUrl","playVideo","pauseVideo","stopVideo","getVideoLoadedFraction","cuePlaylist","loadPlaylist","nextVideo","previousVideo","playVideoAt","setShuffle","setLoop","getPlaylist","getPlaylistIndex","setOption","mute","unMute","isMuted","setVolume","getVolume","seekTo","getPlayerState","getPlaybackRate","setPlaybackRate","getAvailablePlaybackRates","getPlaybackQuality","setPlaybackQuality","getAvailableQualityLevels","getCurrentTime","getDuration","removeEventListener","getVideoUrl","getVideoEmbedCode","getOptions","getOption","addEventListener","destroy","setSize","getIframe"],e.exports=t["default"]},b84f:function(e,t,i){"use strict";i("c87c")},bbab:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={BUFFERING:3,ENDED:0,PAUSED:2,PLAYING:1,UNSTARTED:-1,VIDEO_CUED:5},e.exports=t["default"]},c87c:function(e,t,i){},cccf:function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-container",[i("div",{staticClass:"video-screen"},[i("youtube",{ref:"youtube",staticClass:"youtube-player",attrs:{"video-id":"","player-vars":e.playerVars,fitParent:!0,resize:!0},on:{playing:e.playing,paused:e.paused,ended:e.ended}})],1),i("div",{staticClass:"playing-track-info"},[i("v-btn",{staticClass:"btn-favorite",attrs:{icon:"",small:"",color:e.playingTrack&&e.playingTrack.isFavorite?"red":""},on:{click:e.toggleFavorite}},[i("v-icon",{attrs:{size:"20"}},[e._v(e._s(e.playingTrack&&e.playingTrack.isFavorite?"mdi-heart":"mdi-heart-outline"))])],1),i("div",{staticClass:"playing-track-details"},[i("div",{staticClass:"playing-track-title"},[e._v(" "+e._s(e.playingTrack?e.playingTrack.title+" / "+e.playingTrack.artist:"")+" ")]),i("div",{staticClass:"playing-track-singer",attrs:{target:"_blank"}},[e._v(" "+e._s(e.playingTrack?e.playingTrack.singer:"")+" ")])]),i("div",{staticClass:"volume-control"},[i("div",{staticClass:"volume-slider"},[i("v-slider",{attrs:{max:"100",min:"0",dark:""},model:{value:e.volume,callback:function(t){e.volume=t},expression:"volume"}})],1),i("v-btn",{staticClass:"btn-volume",attrs:{icon:"",small:""},on:{click:e.toggleMute}},[i("v-icon",{attrs:{size:"20"}},[e._v(e._s(e.volumeIcon))])],1)],1)],1),i("div",{staticClass:"video-controller"},[i("div",{staticClass:"seekbar-container"},[i("div",{staticClass:"track-elapsed-time"},[e._v(" "+e._s(e.secondsToTime(e.seekbarValue/e.seekbarMax*e.trackDuration))+" ")]),i("v-slider",{staticClass:"seekbar",attrs:{min:"0",max:e.seekbarMax,color:"accent","track-color":"accent lighten-1"},on:{start:e.seekStart,end:e.seekEnd,click:e.seekEnd},model:{value:e.seekbarValue,callback:function(t){e.seekbarValue=t},expression:"seekbarValue"}}),i("div",{staticClass:"track-duration"},[e._v(" "+e._s(e.secondsToTime(e.trackDuration-e.seekbarValue/e.seekbarMax*e.trackDuration))+" ")])],1),i("div",{staticClass:"player-control-buttons"},[i("div",{staticClass:"btn-skip-previous"},[i("v-btn",{attrs:{icon:""},on:{click:e.playPrev}},[i("v-icon",{attrs:{size:"30"}},[e._v("mdi-skip-previous")])],1)],1),i("div",{staticClass:"btn-play-pause"},[1!==e.playerState?i("v-btn",{attrs:{icon:"",large:""},on:{click:e.playVideo}},[i("v-icon",{attrs:{size:"50"}},[e._v("mdi-play")])],1):i("v-btn",{attrs:{icon:"",large:""},on:{click:e.pauseVideo}},[i("v-icon",{attrs:{size:"50"}},[e._v("mdi-pause")])],1)],1),i("div",{staticClass:"btn-skip-next"},[i("v-btn",{attrs:{icon:"",rounded:""},on:{click:function(t){return e.playNext()}}},[i("v-icon",{attrs:{size:"30"}},[e._v("mdi-skip-next")])],1)],1)])])])},a=[],r=(i("96cf"),i("1da1")),s=i("5530"),o=i("2b0e"),u=i("2f62"),l=i("8141"),c=i("2d40"),d=i("e0ec"),h=i.n(d),p=i("18df");o["a"].use(h.a);var f=o["a"].extend({name:"Player",data:function(){return{playerVars:{autoplay:0,controls:0,fs:0,rel:0,enablejsapi:1,origin:window.location.origin},videoDuration:0,videoCurrentTime:0,trackProgress:0,playerState:-1,seekbarValue:0,seekbarMax:1e3,nowSeeking:!1,processId:null,videoPlayed:!1}},computed:Object(s["a"])(Object(s["a"])({},Object(u["d"])(["playingTrack","queuedTracks","playerVolume","playerMute"])),{},{player:function(){var e=this.$refs.youtube;return e.player},trackDuration:function(){return this.playingTrack?this.playingTrack.end-this.playingTrack.start:0},videoTimeOnSeekbar:function(){if(!this.playingTrack)return 0;var e=this.seekbarValue/this.seekbarMax,t=e*this.trackDuration,i=this.playingTrack.start+t;return i},volumeIcon:function(){return this.playerMute||0===this.playerVolume?"mdi-volume-mute":this.playerVolume<20?"mdi-volume-low":this.playerVolume<80?"mdi-volume-medium":"mdi-volume-high"},volume:{get:function(){return this.playerVolume},set:function(e){this.setPlayerVolume(e)}}}),mounted:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.playingTrack){t.next=12;break}return t.next=3,e.loadTrack(e.playingTrack);case 3:return t.next=5,e.player.setVolume(e.playerVolume);case 5:if(!e.playerMute){t.next=10;break}return t.next=8,e.player.mute();case 8:t.next=12;break;case 10:return t.next=12,e.player.unMute();case 12:e.player.addEventListener("onStateChange",(function(t){e.playerState=t.data}));case 13:case"end":return t.stop()}}),t)})))()},methods:Object(s["a"])(Object(s["a"])(Object(s["a"])({},Object(u["c"])({addFavoriteTrack:c["a"],removeFavoriteTrack:c["h"],setPlayerVolume:c["n"],setPlayerMute:c["l"]})),Object(u["b"])({setNextTrack:l["a"],setPrevTrack:l["b"]})),{},{playing:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.playingTrack){t.next=2;break}return t.abrupt("return");case 2:return e.videoPlayed=!0,t.next=5,e.player.getDuration();case 5:e.videoDuration=t.sent,e.processId=setInterval((function(){e.playingTrack&&e.player.getCurrentTime().then((function(t){e.videoCurrentTime=t;var i=t-e.playingTrack.start,n=i/e.trackDuration;e.trackProgress=n<1?n:1,e.nowSeeking||(e.seekbarValue=e.seekbarMax*e.trackProgress)}))}),100);case 7:case"end":return t.stop()}}),t)})))()},paused:function(){null!==this.processId&&clearInterval(this.processId)},ended:function(){this.videoPlayed&&(this.videoPlayed=!1,this.setNextTrack())},playNext:function(){this.setNextTrack()},playPrev:function(){this.setPrevTrack()},loadTrack:function(e){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function i(){return regeneratorRuntime.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return i.next=2,t.player.loadVideoById({videoId:e.video.id,startSeconds:e.start,endSeconds:e.end});case 2:case"end":return i.stop()}}),i)})))()},playVideo:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.playingTrack){t.next=3;break}return e.playNext(),t.abrupt("return");case 3:if(-1!==e.playerState){t.next=6;break}return t.next=6,e.loadTrack(e.playingTrack);case 6:return t.next=8,e.player.playVideo();case 8:case"end":return t.stop()}}),t)})))()},pauseVideo:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.player.pauseVideo();case 2:case"end":return t.stop()}}),t)})))()},seekStart:function(){this.nowSeeking=!0},seekEnd:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.nowSeeking=!1,t.next=3,e.player.seekTo(e.videoTimeOnSeekbar,!0);case 3:case"end":return t.stop()}}),t)})))()},secondsToTime:function(e){return Object(p["b"])(e)},toggleFavorite:function(){this.playingTrack&&(this.playingTrack.isFavorite?(this.removeFavoriteTrack(this.playingTrack),this.playingTrack.isFavorite=!1):(this.addFavoriteTrack(this.playingTrack),this.playingTrack.isFavorite=!0))},toggleMute:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.setPlayerMute(!e.playerMute);case 1:case"end":return t.stop()}}),t)})))()}}),watch:{playingTrack:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.playingTrack){t.next=7;break}return null!==e.processId&&clearInterval(e.processId),t.next=4,e.player.stopVideo();case 4:return t.next=6,e.player.loadVideoById("");case 6:return t.abrupt("return");case 7:return t.next=9,e.loadTrack(e.playingTrack);case 9:return t.next=11,e.player.setVolume(e.playerVolume);case 11:if(!e.playerMute){t.next=16;break}return t.next=14,e.player.mute();case 14:t.next=18;break;case 16:return t.next=18,e.player.unMute();case 18:return t.next=20,e.player.playVideo();case 20:case"end":return t.stop()}}),t)})))()},playerVolume:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.player.setVolume(e.playerVolume);case 2:case"end":return t.stop()}}),t)})))()},playerMute:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.playerMute){t.next=5;break}return t.next=3,e.player.mute();case 3:t.next=7;break;case 5:return t.next=7,e.player.unMute();case 7:case"end":return t.stop()}}),t)})))()}}}),v=f,m=(i("74c9"),i("b84f"),i("2877")),y=i("6544"),b=i.n(y),g=i("8336"),k=i("a523"),w=i("132d"),x=(i("99af"),i("caad"),i("c975"),i("d81d"),i("a9e3"),i("b680"),i("d3b7"),i("25f0"),i("2532"),i("498a"),i("ade3")),T=(i("9e29"),i("c37a")),V=i("0789"),C=i("58df"),S=i("297c"),_=i("a293"),E=i("80d2"),M=i("d9bd"),P=Object(C["a"])(T["a"],S["a"]).extend({name:"v-slider",directives:{ClickOutside:_["a"]},mixins:[S["a"]],props:{disabled:Boolean,inverseLabel:Boolean,max:{type:[Number,String],default:100},min:{type:[Number,String],default:0},step:{type:[Number,String],default:1},thumbColor:String,thumbLabel:{type:[Boolean,String],default:void 0,validator:function(e){return"boolean"===typeof e||"always"===e}},thumbSize:{type:[Number,String],default:32},tickLabels:{type:Array,default:function(){return[]}},ticks:{type:[Boolean,String],default:!1,validator:function(e){return"boolean"===typeof e||"always"===e}},tickSize:{type:[Number,String],default:2},trackColor:String,trackFillColor:String,value:[Number,String],vertical:Boolean},data:function(){return{app:null,oldValue:null,keyPressed:0,isFocused:!1,isActive:!1,noClick:!1}},computed:{classes:function(){return Object(s["a"])(Object(s["a"])({},T["a"].options.computed.classes.call(this)),{},{"v-input__slider":!0,"v-input__slider--vertical":this.vertical,"v-input__slider--inverse-label":this.inverseLabel})},internalValue:{get:function(){return this.lazyValue},set:function(e){e=isNaN(e)?this.minValue:e;var t=this.roundValue(Math.min(Math.max(e,this.minValue),this.maxValue));t!==this.lazyValue&&(this.lazyValue=t,this.$emit("input",t))}},trackTransition:function(){return this.keyPressed>=2?"none":""},minValue:function(){return parseFloat(this.min)},maxValue:function(){return parseFloat(this.max)},stepNumeric:function(){return this.step>0?parseFloat(this.step):0},inputWidth:function(){return(this.roundValue(this.internalValue)-this.minValue)/(this.maxValue-this.minValue)*100},trackFillStyles:function(){var e,t=this.vertical?"bottom":"left",i=this.vertical?"top":"right",n=this.vertical?"height":"width",a=this.$vuetify.rtl?"auto":"0",r=this.$vuetify.rtl?"0":"auto",s=this.isDisabled?"calc(".concat(this.inputWidth,"% - 10px)"):"".concat(this.inputWidth,"%");return e={transition:this.trackTransition},Object(x["a"])(e,t,a),Object(x["a"])(e,i,r),Object(x["a"])(e,n,s),e},trackStyles:function(){var e,t=this.vertical?this.$vuetify.rtl?"bottom":"top":this.$vuetify.rtl?"left":"right",i=this.vertical?"height":"width",n="0px",a=this.isDisabled?"calc(".concat(100-this.inputWidth,"% - 10px)"):"calc(".concat(100-this.inputWidth,"%)");return e={transition:this.trackTransition},Object(x["a"])(e,t,n),Object(x["a"])(e,i,a),e},showTicks:function(){return this.tickLabels.length>0||!(this.isDisabled||!this.stepNumeric||!this.ticks)},numTicks:function(){return Math.ceil((this.maxValue-this.minValue)/this.stepNumeric)},showThumbLabel:function(){return!this.isDisabled&&!(!this.thumbLabel&&!this.$scopedSlots["thumb-label"])},computedTrackColor:function(){if(!this.isDisabled)return this.trackColor?this.trackColor:this.isDark?this.validationState:this.validationState||"primary lighten-3"},computedTrackFillColor:function(){if(!this.isDisabled)return this.trackFillColor?this.trackFillColor:this.validationState||this.computedColor},computedThumbColor:function(){return this.thumbColor?this.thumbColor:this.validationState||this.computedColor}},watch:{min:function(e){var t=parseFloat(e);t>this.internalValue&&this.$emit("input",t)},max:function(e){var t=parseFloat(e);t<this.internalValue&&this.$emit("input",t)},value:{handler:function(e){this.internalValue=e}}},beforeMount:function(){this.internalValue=this.value},mounted:function(){this.app=document.querySelector("[data-app]")||Object(M["c"])("Missing v-app or a non-body wrapping element with the [data-app] attribute",this)},methods:{genDefaultSlot:function(){var e=[this.genLabel()],t=this.genSlider();return this.inverseLabel?e.unshift(t):e.push(t),e.push(this.genProgress()),e},genSlider:function(){return this.$createElement("div",{class:Object(s["a"])({"v-slider":!0,"v-slider--horizontal":!this.vertical,"v-slider--vertical":this.vertical,"v-slider--focused":this.isFocused,"v-slider--active":this.isActive,"v-slider--disabled":this.isDisabled,"v-slider--readonly":this.isReadonly},this.themeClasses),directives:[{name:"click-outside",value:this.onBlur}],on:{click:this.onSliderClick}},this.genChildren())},genChildren:function(){return[this.genInput(),this.genTrackContainer(),this.genSteps(),this.genThumbContainer(this.internalValue,this.inputWidth,this.isActive,this.isFocused,this.onThumbMouseDown,this.onFocus,this.onBlur)]},genInput:function(){return this.$createElement("input",{attrs:Object(s["a"])({value:this.internalValue,id:this.computedId,disabled:!0,readonly:!0,tabindex:-1},this.$attrs)})},genTrackContainer:function(){var e=[this.$createElement("div",this.setBackgroundColor(this.computedTrackColor,{staticClass:"v-slider__track-background",style:this.trackStyles})),this.$createElement("div",this.setBackgroundColor(this.computedTrackFillColor,{staticClass:"v-slider__track-fill",style:this.trackFillStyles}))];return this.$createElement("div",{staticClass:"v-slider__track-container",ref:"track"},e)},genSteps:function(){var e=this;if(!this.step||!this.showTicks)return null;var t=parseFloat(this.tickSize),i=Object(E["g"])(this.numTicks+1),n=this.vertical?"bottom":this.$vuetify.rtl?"right":"left",a=this.vertical?this.$vuetify.rtl?"left":"right":"top";this.vertical&&i.reverse();var r=i.map((function(i){var r,s=[];e.tickLabels[i]&&s.push(e.$createElement("div",{staticClass:"v-slider__tick-label"},e.tickLabels[i]));var o=i*(100/e.numTicks),u=e.$vuetify.rtl?100-e.inputWidth<o:o<e.inputWidth;return e.$createElement("span",{key:i,staticClass:"v-slider__tick",class:{"v-slider__tick--filled":u},style:(r={width:"".concat(t,"px"),height:"".concat(t,"px")},Object(x["a"])(r,n,"calc(".concat(o,"% - ").concat(t/2,"px)")),Object(x["a"])(r,a,"calc(50% - ".concat(t/2,"px)")),r)},s)}));return this.$createElement("div",{staticClass:"v-slider__ticks-container",class:{"v-slider__ticks-container--always-show":"always"===this.ticks||this.tickLabels.length>0}},r)},genThumbContainer:function(e,t,i,n,a,r,o){var u=arguments.length>7&&void 0!==arguments[7]?arguments[7]:"thumb",l=[this.genThumb()],c=this.genThumbLabelContent(e);return this.showThumbLabel&&l.push(this.genThumbLabel(c)),this.$createElement("div",this.setTextColor(this.computedThumbColor,{ref:u,key:u,staticClass:"v-slider__thumb-container",class:{"v-slider__thumb-container--active":i,"v-slider__thumb-container--focused":n,"v-slider__thumb-container--show-label":this.showThumbLabel},style:this.getThumbContainerStyles(t),attrs:Object(s["a"])({role:"slider",tabindex:this.isDisabled?-1:this.$attrs.tabindex?this.$attrs.tabindex:0,"aria-label":this.label,"aria-valuemin":this.min,"aria-valuemax":this.max,"aria-valuenow":this.internalValue,"aria-readonly":String(this.isReadonly),"aria-orientation":this.vertical?"vertical":"horizontal"},this.$attrs),on:{focus:r,blur:o,keydown:this.onKeyDown,keyup:this.onKeyUp,touchstart:a,mousedown:a}}),l)},genThumbLabelContent:function(e){return this.$scopedSlots["thumb-label"]?this.$scopedSlots["thumb-label"]({value:e}):[this.$createElement("span",[String(e)])]},genThumbLabel:function(e){var t=Object(E["f"])(this.thumbSize),i=this.vertical?"translateY(20%) translateY(".concat(Number(this.thumbSize)/3-1,"px) translateX(55%) rotate(135deg)"):"translateY(-20%) translateY(-12px) translateX(-50%) rotate(45deg)";return this.$createElement(V["c"],{props:{origin:"bottom center"}},[this.$createElement("div",{staticClass:"v-slider__thumb-label-container",directives:[{name:"show",value:this.isFocused||this.isActive||"always"===this.thumbLabel}]},[this.$createElement("div",this.setBackgroundColor(this.computedThumbColor,{staticClass:"v-slider__thumb-label",style:{height:t,width:t,transform:i}}),[this.$createElement("div",e)])])])},genThumb:function(){return this.$createElement("div",this.setBackgroundColor(this.computedThumbColor,{staticClass:"v-slider__thumb"}))},getThumbContainerStyles:function(e){var t=this.vertical?"top":"left",i=this.$vuetify.rtl?100-e:e;return i=this.vertical?100-i:i,Object(x["a"])({transition:this.trackTransition},t,"".concat(i,"%"))},onThumbMouseDown:function(e){e.preventDefault(),this.oldValue=this.internalValue,this.keyPressed=2,this.isActive=!0;var t=!E["u"]||{passive:!0,capture:!0},i=!!E["u"]&&{passive:!0};"touches"in e?(this.app.addEventListener("touchmove",this.onMouseMove,i),Object(E["a"])(this.app,"touchend",this.onSliderMouseUp,t)):(this.app.addEventListener("mousemove",this.onMouseMove,i),Object(E["a"])(this.app,"mouseup",this.onSliderMouseUp,t)),this.$emit("start",this.internalValue)},onSliderMouseUp:function(e){e.stopPropagation(),this.keyPressed=0;var t=!!E["u"]&&{passive:!0};this.app.removeEventListener("touchmove",this.onMouseMove,t),this.app.removeEventListener("mousemove",this.onMouseMove,t),this.$emit("mouseup",e),this.$emit("end",this.internalValue),Object(E["i"])(this.oldValue,this.internalValue)||(this.$emit("change",this.internalValue),this.noClick=!0),this.isActive=!1},onMouseMove:function(e){var t=this.parseMouseMove(e),i=t.value;this.internalValue=i},onKeyDown:function(e){if(this.isInteractive){var t=this.parseKeyDown(e,this.internalValue);null==t||t<this.minValue||t>this.maxValue||(this.internalValue=t,this.$emit("change",t))}},onKeyUp:function(){this.keyPressed=0},onSliderClick:function(e){if(this.noClick)this.noClick=!1;else{var t=this.$refs.thumb;t.focus(),this.onMouseMove(e),this.$emit("change",this.internalValue)}},onBlur:function(e){this.isFocused=!1,this.$emit("blur",e)},onFocus:function(e){this.isFocused=!0,this.$emit("focus",e)},parseMouseMove:function(e){var t=this.vertical?"top":"left",i=this.vertical?"height":"width",n=this.vertical?"clientY":"clientX",a=this.$refs.track.getBoundingClientRect(),r=a[t],s=a[i],o="touches"in e?e.touches[0][n]:e[n],u=Math.min(Math.max((o-r)/s,0),1)||0;this.vertical&&(u=1-u),this.$vuetify.rtl&&(u=1-u);var l=o>=r&&o<=r+s,c=parseFloat(this.min)+u*(this.maxValue-this.minValue);return{value:c,isInsideTrack:l}},parseKeyDown:function(e,t){if(this.isInteractive){var i=E["q"].pageup,n=E["q"].pagedown,a=E["q"].end,r=E["q"].home,s=E["q"].left,o=E["q"].right,u=E["q"].down,l=E["q"].up;if([i,n,a,r,s,o,u,l].includes(e.keyCode)){e.preventDefault();var c=this.stepNumeric||1,d=(this.maxValue-this.minValue)/c;if([s,o,u,l].includes(e.keyCode)){this.keyPressed+=1;var h=this.$vuetify.rtl?[s,l]:[o,l],p=h.includes(e.keyCode)?1:-1,f=e.shiftKey?3:e.ctrlKey?2:1;t+=p*c*f}else if(e.keyCode===r)t=this.minValue;else if(e.keyCode===a)t=this.maxValue;else{var v=e.keyCode===n?1:-1;t-=v*c*(d>100?d/10:10)}return t}}},roundValue:function(e){if(!this.stepNumeric)return e;var t=this.step.toString().trim(),i=t.indexOf(".")>-1?t.length-t.indexOf(".")-1:0,n=this.minValue%this.stepNumeric,a=Math.round((e-n)/this.stepNumeric)*this.stepNumeric+n;return parseFloat(Math.min(a,this.maxValue).toFixed(i))}}}),O=Object(m["a"])(v,n,a,!1,null,"571e6242",null);t["default"]=O.exports;b()(O,{VBtn:g["a"],VContainer:k["a"],VIcon:w["a"],VSlider:P})},dc91:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i("34eb"),a=d(n),r=i("b74c"),s=d(r),o=i("b3fa"),u=d(o),l=i("e18f"),c=d(l);function d(e){return e&&e.__esModule?e:{default:e}}var h=(0,a.default)("youtube-player"),p={proxyEvents:function(e){var t={},i=function(i){var n="on"+i.slice(0,1).toUpperCase()+i.slice(1);t[n]=function(t){h('event "%s"',n,t),e.trigger(i,t)}},n=!0,a=!1,r=void 0;try{for(var s,o=u.default[Symbol.iterator]();!(n=(s=o.next()).done);n=!0){var l=s.value;i(l)}}catch(c){a=!0,r=c}finally{try{!n&&o.return&&o.return()}finally{if(a)throw r}}return t},promisifyPlayer:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],i={},n=function(n){t&&c.default[n]?i[n]=function(){for(var t=arguments.length,i=Array(t),a=0;a<t;a++)i[a]=arguments[a];return e.then((function(e){var t=c.default[n],a=e.getPlayerState(),r=e[n].apply(e,i);return t.stateChangeRequired||Array.isArray(t.acceptableStates)&&-1===t.acceptableStates.indexOf(a)?new Promise((function(i){var n=function n(){var a=e.getPlayerState(),r=void 0;"number"===typeof t.timeout&&(r=setTimeout((function(){e.removeEventListener("onStateChange",n),i()}),t.timeout)),Array.isArray(t.acceptableStates)&&-1!==t.acceptableStates.indexOf(a)&&(e.removeEventListener("onStateChange",n),clearTimeout(r),i())};e.addEventListener("onStateChange",n)})).then((function(){return r})):r}))}:i[n]=function(){for(var t=arguments.length,i=Array(t),a=0;a<t;a++)i[a]=arguments[a];return e.then((function(e){return e[n].apply(e,i)}))}},a=!0,r=!1,o=void 0;try{for(var u,l=s.default[Symbol.iterator]();!(a=(u=l.next()).done);a=!0){var d=u.value;n(d)}}catch(h){r=!0,o=h}finally{try{!a&&l.return&&l.return()}finally{if(r)throw o}}return i}};t.default=p,e.exports=t["default"]},e0ec:function(e,t,i){(function(e){
/*!
 * vue-youtube v1.4.0
 * (c) 2019 Antério Vieira
 * Released under the MIT License.
 */
(function(e,i){i(t)})(0,(function(t){"use strict";"undefined"!==typeof window?window:"undefined"!==typeof e||"undefined"!==typeof self&&self;function n(e,t){return t={exports:{}},e(t,t.exports),t.exports}var a=n((function(e,t){(function(t,i){e.exports=i()})(0,(function(e){return function(e,t){if(void 0==t&&(t={fuzzy:!0}),/youtu\.?be/.test(e)){var i,n=[/youtu\.be\/([^#\&\?]{11})/,/\?v=([^#\&\?]{11})/,/\&v=([^#\&\?]{11})/,/embed\/([^#\&\?]{11})/,/\/v\/([^#\&\?]{11})/];for(i=0;i<n.length;++i)if(n[i].test(e))return n[i].exec(e)[1];if(t.fuzzy){var a=e.split(/[\/\&\?=#\.\s]/g);for(i=0;i<a.length;++i)if(/^[^#\&\?]{11}$/.test(a[i]))return a[i]}}return null}}))})),r=i("0fe3"),s=-1,o=0,u=1,l=2,c=3,d=5,h={name:"Youtube",props:{videoId:String,playerVars:{type:Object,default:function(){return{}}},height:{type:[Number,String],default:360},width:{type:[Number,String],default:640},resize:{type:Boolean,default:!1},resizeDelay:{type:Number,default:100},nocookie:{type:Boolean,default:!1},fitParent:{type:Boolean,default:!1}},data:function(){return{player:{},events:(e={},e[s]="unstarted",e[u]="playing",e[l]="paused",e[o]="ended",e[c]="buffering",e[d]="cued",e),resizeTimeout:null};var e},computed:{aspectRatio:function(){return this.width/this.height}},methods:{playerReady:function(e){this.$emit("ready",e.target)},playerStateChange:function(e){null!==e.data&&e.data!==s&&this.$emit(this.events[e.data],e.target)},playerError:function(e){this.$emit("error",e.target)},updatePlayer:function(e){e?1!==this.playerVars.autoplay?this.player.cueVideoById({videoId:e}):this.player.loadVideoById({videoId:e}):this.player.stopVideo()},resizeProportionally:function(){var e=this;this.player.getIframe().then((function(t){var i=e.fitParent?t.parentElement.offsetWidth:t.offsetWidth,n=i/e.aspectRatio;e.player.setSize(i,n)}))},onResize:function(){clearTimeout(this.resizeTimeout),this.resizeTimeout=setTimeout(this.resizeProportionally,this.resizeDelay)}},watch:{videoId:"updatePlayer",resize:function(e){e?(window.addEventListener("resize",this.onResize),this.resizeProportionally()):(window.removeEventListener("resize",this.onResize),this.player.setSize(this.width,this.height))},width:function(e){this.player.setSize(e,this.height)},height:function(e){this.player.setSize(this.width,e)}},beforeDestroy:function(){null!==this.player&&this.player.destroy&&(this.player.destroy(),delete this.player),this.resize&&window.removeEventListener("resize",this.onResize)},mounted:function(){window.YTConfig={host:"https://www.youtube.com/iframe_api"};var e=this.nocookie?"https://www.youtube-nocookie.com":"https://www.youtube.com";this.player=r(this.$el,{host:e,width:this.width,height:this.height,videoId:this.videoId,playerVars:this.playerVars}),this.player.on("ready",this.playerReady),this.player.on("stateChange",this.playerStateChange),this.player.on("error",this.playerError),this.resize&&window.addEventListener("resize",this.onResize),this.fitParent&&this.resizeProportionally()},render:function(e){return e("div")}};function p(e){e.prototype.$youtube={getIdFromUrl:a},e.component("youtube",h)}"undefined"!==typeof window&&window.Vue&&window.Vue.use(p);var f="1.4.0";t["default"]=p,t.Youtube=h,t.getIdFromUrl=a,t.version=f,Object.defineProperty(t,"__esModule",{value:!0})}))}).call(this,i("c8ba"))},e18f:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i("bbab"),a=r(n);function r(e){return e&&e.__esModule?e:{default:e}}t.default={pauseVideo:{acceptableStates:[a.default.ENDED,a.default.PAUSED],stateChangeRequired:!1},playVideo:{acceptableStates:[a.default.ENDED,a.default.PLAYING],stateChangeRequired:!1},seekTo:{acceptableStates:[a.default.ENDED,a.default.PLAYING,a.default.PAUSED],stateChangeRequired:!0,timeout:3e3}},e.exports=t["default"]}}]);
//# sourceMappingURL=chunk-7f30ee6e.ad2d867c.js.map