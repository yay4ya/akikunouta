(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ba190e8c"],{6515:function(e,t,a){},"8ced":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",[a("div",{staticClass:"queue-actions"},[a("div",{staticClass:"queue-actions-left"},[a("v-btn",{staticClass:"btn-shuffle",attrs:{icon:"",small:""},on:{click:e.shuffle}},[a("v-icon",{attrs:{size:"20"}},[e._v("mdi-shuffle-variant")])],1),a("v-btn",{staticClass:"btn-loop",attrs:{icon:"",small:""},on:{click:e.togglePlayerRepeat}},[a("v-icon",{attrs:{size:"20"}},[e._v(" "+e._s(e.repeatIcon)+" ")])],1)],1),a("div",{staticClass:"queue-actions-center"},[a("span",{staticClass:"num-queued-tracks",on:{click:e.scrollPlayingTrackIntoView}},[e._v(" "+e._s(e.playingTrackIndex)+" / "+e._s(e.queuedTracks.length)+" ")])]),a("div",{staticClass:"queue-actions-right"},[a("v-btn",{staticClass:"btn-delete",attrs:{icon:"",small:""},on:{click:e.clean}},[a("v-icon",{attrs:{size:"20"}},[e._v("mdi-delete")])],1)],1)]),a("div",{staticClass:"queue-list"},[a("div",{staticClass:"queue-background"},[a("v-icon",{attrs:{dark:"",color:"rgba(255, 255, 255, 0.6)",size:"100"}},[e._v("mdi-tray-plus")])],1),a("TrackList",{staticClass:"queued-tracks scroll-thin",attrs:{tracks:e.queuedTracks,deletable:!0,queueing:!1,sort:!0,pull:"clone",nowPlayingId:"uuid"},on:{changed:e.onChange,deleted:e.onDeleted}})],1)])},i=[],s=(a("4de4"),a("c975"),a("d81d"),a("d3b7"),a("5530")),r=a("2b0e"),c=a("2f62"),u=a("2d40"),l=a("18df"),o=r["a"].extend({name:"Queue",components:{TrackList:function(){return Promise.all([a.e("chunk-04291098"),a.e("chunk-2d0e4545")]).then(a.bind(null,"a1a1"))}},computed:Object(s["a"])(Object(s["a"])({},Object(c["d"])(["playingTrack","queuedTracks","playerRepeat"])),{},{playingTrackIndex:function(){return this.playingTrack?this.queuedTracks.map((function(e){return e.uuid})).indexOf(this.playingTrack.uuid)+1:0},repeatIcon:function(){if("repeat-off"===this.playerRepeat)return"mdi-repeat-off";if("repeat"===this.playerRepeat)return"mdi-repeat";if("repeat-once"===this.playerRepeat)return"mdi-repeat-once";throw new Error("invalid repeat option")}}),methods:Object(s["a"])(Object(s["a"])({},Object(c["c"])({setQueue:u["m"],setPlayingTrack:u["l"],setPlayerRepeat:u["j"]})),{},{cloneTrack:function(e){return e.clone()},onChange:function(e){this.setQueue(e.map((function(e){return e})))},onDeleted:function(e){this.setQueue(this.queuedTracks.filter((function(t){return t.uuid!==e.uuid})))},clean:function(){this.setQueue([])},scrollPlayingTrackIntoView:function(){var e=document.getElementById("queue"),t=e.getElementsByClassName("nowPlayingTrack")[0];t&&t.scrollIntoView({behavior:"smooth"})},shuffle:function(){var e=this,t=l["c"](this.queuedTracks);this.playingTrack&&t.map((function(e){return e.uuid})).indexOf(this.playingTrack.uuid)>=0&&(t=t.filter((function(t){return t.uuid!==e.playingTrack.uuid})),t.unshift(this.playingTrack)),this.setQueue(t);var a=document.getElementById("queue"),n=a.getElementsByClassName("track")[0];n&&n.scrollIntoView({behavior:"smooth"})},togglePlayerRepeat:function(){if("repeat-off"===this.playerRepeat)this.setPlayerRepeat("repeat");else if("repeat"===this.playerRepeat)this.setPlayerRepeat("repeat-once");else{if("repeat-once"!==this.playerRepeat)throw new Error("invalid repeat option");this.setPlayerRepeat("repeat-off")}}})}),d=o,p=(a("dade"),a("2877")),f=a("6544"),h=a.n(f),k=a("8336"),y=a("a523"),g=a("132d"),m=Object(p["a"])(d,n,i,!1,null,"579c3852",null);t["default"]=m.exports;h()(m,{VBtn:k["a"],VContainer:y["a"],VIcon:g["a"]})},dade:function(e,t,a){"use strict";a("6515")}}]);
//# sourceMappingURL=chunk-ba190e8c.7a508c2d.js.map