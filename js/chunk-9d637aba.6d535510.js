(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-9d637aba"],{"2a36":function(e,t,n){},"890e":function(e,t,n){"use strict";n("2a36")},"8ced":function(e,t,n){"use strict";n.r(t);var u=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",[n("div",{staticClass:"queue-background"}),n("TrackList",{key:e.queueChange,staticClass:"queued-tracks scroll-thin",attrs:{tracks:e.tracks,deletable:!0,queueing:!1,sort:!0,sticky:!0,pull:"clone",nowPlayingId:"uuid"},on:{changed:e.onChange,deleted:e.onDeleted}})],1)},a=[],c=(n("4de4"),n("d81d"),n("d3b7"),n("3ca3"),n("ddb0"),n("96cf"),n("1da1")),r=n("5530"),i=n("2b0e"),s=n("2f62"),o=n("2d40"),d=i["a"].extend({name:"Queue",components:{TrackList:function(){return Promise.all([n.e("chunk-2f68534c"),n.e("chunk-2d0d6726")]).then(n.bind(null,"a1a1"))}},data:function(){return{watchQueue:!0,queueChange:!0,tracks:[]}},computed:Object(r["a"])({},Object(s["d"])(["playingTrack","queuedTracks"])),created:function(){var e=this;return Object(c["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Promise.all(e.queuedTracks.map((function(e){return e.fetchVideoInfo()}))).then((function(){e.tracks=e.queuedTracks.map((function(e){return e}))}));case 2:case"end":return t.stop()}}),t)})))()},methods:Object(r["a"])(Object(r["a"])({},Object(s["c"])({setPlayingTrack:o["a"],setQueue:o["b"]})),{},{cloneTrack:function(e){return e.clone()},onChange:function(e){this.watchQueue=!1,this.setQueue(e.map((function(e){return e})))},onDeleted:function(e){this.watchQueue=!1,this.setQueue(this.queuedTracks.filter((function(t){return t.uuid!==e.uuid})))}}),watch:{queuedTracks:function(){this.watchQueue&&(this.tracks=this.queuedTracks.map((function(e){return e})),this.queueChange=!this.queueChange),this.watchQueue=!0}}}),h=d,l=(n("890e"),n("2877")),f=n("6544"),k=n.n(f),b=n("a523"),p=Object(l["a"])(h,u,a,!1,null,"3ea0d25c",null);t["default"]=p.exports;k()(p,{VContainer:b["a"]})}}]);
//# sourceMappingURL=chunk-9d637aba.6d535510.js.map