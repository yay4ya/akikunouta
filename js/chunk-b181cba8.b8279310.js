(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b181cba8","chunk-2d0e4545"],{"199c":function(e,t,i){},3801:function(e,t,i){"use strict";i("199c")},6062:function(e,t,i){"use strict";var n=i("6d61"),a=i("6566");e.exports=n("Set",(function(e){return function(){return e(this,arguments.length?arguments[0]:void 0)}}),a)},9080:function(e,t,i){"use strict";i.d(t,"a",(function(){return s}));var n=i("d4ec"),a=i("18df"),s=function e(t,i){var s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:a["a"]();Object(n["a"])(this,e),this.type=t,this.text=i,this.uuid=s}},a3fd:function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-container",{staticClass:"videos-container"},[i("div",{staticClass:"card-list-container"},[i("CardList",{staticClass:"video-list",attrs:{cards:e.videoCards,query:e.searchQuery},on:{clicked:e.onClick}})],1),i("transition",{attrs:{name:"slide"}},[e.selectedVideo?i("div",{staticClass:"track-list-container"},[i("div",{staticClass:"video-info-container",on:{click:function(t){e.selectedVideo=null}}},[i("div",{staticClass:"video-info-background",style:{backgroundImage:"url("+e.selectedVideo.getThumbnailURL("hqdefault")+")"}}),i("div",{staticClass:"video-info-content"},[i("div",{staticClass:"video-info"},[i("h2",{staticClass:"video-info-title"},[e._v(" "+e._s(e.selectedVideo.title)+" ")]),i("h4",{staticClass:"video-info-channel"},[e._v(" "+e._s(e.selectedVideo.channel.name)+" ")])]),i("div",{staticClass:"btn-close-track-list"},[i("v-btn",{attrs:{dark:"",icon:""}},[i("v-icon",{attrs:{size:"40"}},[e._v("mdi-chevron-down")])],1)],1),i("div",{staticClass:"video-actions"},[i("v-btn",{attrs:{icon:"",dark:""},on:{click:function(t){return t.stopPropagation(),e.addTracksToQueue(t)}}},[i("v-icon",[e._v("mdi-plus")])],1),i("v-btn",{attrs:{icon:"",dark:""},on:{click:function(t){return t.stopPropagation(),e.shuffleAndQueue(t)}}},[i("v-icon",[e._v("mdi-shuffle-variant")])],1),i("v-btn",{attrs:{icon:"",dark:""},on:{click:function(t){return t.stopPropagation(),e.queueAndRepeat(t)}}},[i("v-icon",[e._v("mdi-repeat")])],1)],1)])]),i("TrackList",{staticClass:"track-list scroll-thin",attrs:{tracks:e.getTracksByVideoId(e.selectedVideo.id),sort:!1,put:!1,pull:"clone",queueing:!0}})],1):e._e()])],1)},a=[],s=(i("4de4"),i("7db0"),i("a15b"),i("d81d"),i("b0c0"),i("4ec9"),i("d3b7"),i("6062"),i("3ca3"),i("ddb0"),i("5530")),d=i("2909"),c=(i("96cf"),i("1da1")),r=i("2b0e"),o=i("2f62"),u=i("2d40"),l=i("18df"),f=i("a735"),v=i("9080"),h=r["a"].extend({name:"Videos",components:{CardList:function(){return i.e("chunk-0431ba52").then(i.bind(null,"c995e"))},TrackList:function(){return i.e("chunk-2e44794e").then(i.bind(null,"a1a1"))}},data:function(){return{library:f["a"],videos:[],videoCards:[],videoToTracks:new Map,selectedVideo:null}},created:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){var i,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return i=new Map(f["a"].tracks.map((function(e){return[e.video.id,e.video]}))),n=Object(d["a"])(i.values()),e.videoToTracks=new Map(n.map((function(e){return[e.id,f["a"].tracks.filter((function(t){return t.video.id===e.id}))]}))),t.next=5,Promise.all(n.map((function(e){return e.fetchVideoInfo()})));case 5:e.videos=n,e.videoCards=l["d"](e.videos,(function(e){return e.publishedAt})).reverse().map((function(e){var t=new Set;return f["a"].tracks.filter((function(t){return t.video.id===e.id})).map((function(e){t.add(e.title),t.add(e.artist),t.add(e.singer),e.tags.map((function(e){return t.add(e)}))})),{id:e.id,title:e.getTitle()||"",subtitle:(e.getChannel()||{}).name||"",thumbnailUrl:e.getThumbnailURL("hqdefault"),metadata:Object(d["a"])(t).join("  ")}}));case 7:case"end":return t.stop()}}),t)})))()},computed:Object(s["a"])({},Object(o["d"])(["searchQuery"])),methods:Object(s["a"])(Object(s["a"])({},Object(o["c"])({addToQueue:u["d"],setQueue:u["p"],setPlayingTrack:u["o"],setPlayerRepeat:u["m"],addMessage:u["b"]})),{},{onClick:function(e){this.selectedVideo=this.videos.find((function(t){return t.id==e.id}))||null},getTracksByVideoId:function(e){return f["a"].tracks.filter((function(t){return t.video.id===e}))},addTracksToQueue:function(){var e=this;if(!this.selectedVideo)throw Error("no video selected");var t=this.getTracksByVideoId(this.selectedVideo.id);t.map((function(t){return e.addToQueue(t.clone())})),this.addMessage(new v["a"]("info",t.length+"曲をキューに追加しました"))},shuffleAndQueue:function(){if(!this.selectedVideo)throw Error("no video selected");var e=l["c"](this.getTracksByVideoId(this.selectedVideo.id));e.length>0&&(this.setPlayingTrack(e[0]),this.setQueue(e),this.addMessage(new v["a"]("info",e.length+"曲をキューにセットしました")))},queueAndRepeat:function(){if(!this.selectedVideo)throw Error("no video selected");var e=this.getTracksByVideoId(this.selectedVideo.id);e.length>0&&(this.setPlayingTrack(e[0]),this.setQueue(e),this.setPlayerRepeat("repeat"),this.addMessage(new v["a"]("info",e.length+"曲をキューにセットしました")))}})}),k=h,p=(i("3801"),i("2877")),b=i("6544"),g=i.n(b),m=i("8336"),V=i("a523"),T=i("132d"),C=Object(p["a"])(k,n,a,!1,null,"d7e14c24",null);t["default"]=C.exports;g()(C,{VBtn:m["a"],VContainer:V["a"],VIcon:T["a"]})}}]);
//# sourceMappingURL=chunk-b181cba8.b8279310.js.map