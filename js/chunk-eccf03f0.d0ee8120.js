(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-eccf03f0"],{"0678":function(t,e,i){},"0798":function(t,e,i){"use strict";i("caad");var s=i("5530"),l=i("ade3"),a=(i("0c18"),i("10d2")),n=i("afdd"),r=i("9d26"),o=i("f2e7"),c=i("7560"),d=i("2b0e"),u=d["a"].extend({name:"transitionable",props:{mode:String,origin:String,transition:String}}),h=i("58df"),f=i("d9bd");e["a"]=Object(h["a"])(a["a"],o["a"],u).extend({name:"v-alert",props:{border:{type:String,validator:function(t){return["top","right","bottom","left"].includes(t)}},closeLabel:{type:String,default:"$vuetify.close"},coloredBorder:Boolean,dense:Boolean,dismissible:Boolean,closeIcon:{type:String,default:"$cancel"},icon:{default:"",type:[Boolean,String],validator:function(t){return"string"===typeof t||!1===t}},outlined:Boolean,prominent:Boolean,text:Boolean,type:{type:String,validator:function(t){return["info","error","success","warning"].includes(t)}},value:{type:Boolean,default:!0}},computed:{__cachedBorder:function(){if(!this.border)return null;var t={staticClass:"v-alert__border",class:Object(l["a"])({},"v-alert__border--".concat(this.border),!0)};return this.coloredBorder&&(t=this.setBackgroundColor(this.computedColor,t),t.class["v-alert__border--has-color"]=!0),this.$createElement("div",t)},__cachedDismissible:function(){var t=this;if(!this.dismissible)return null;var e=this.iconColor;return this.$createElement(n["a"],{staticClass:"v-alert__dismissible",props:{color:e,icon:!0,small:!0},attrs:{"aria-label":this.$vuetify.lang.t(this.closeLabel)},on:{click:function(){return t.isActive=!1}}},[this.$createElement(r["a"],{props:{color:e}},this.closeIcon)])},__cachedIcon:function(){return this.computedIcon?this.$createElement(r["a"],{staticClass:"v-alert__icon",props:{color:this.iconColor}},this.computedIcon):null},classes:function(){var t=Object(s["a"])(Object(s["a"])({},a["a"].options.computed.classes.call(this)),{},{"v-alert--border":Boolean(this.border),"v-alert--dense":this.dense,"v-alert--outlined":this.outlined,"v-alert--prominent":this.prominent,"v-alert--text":this.text});return this.border&&(t["v-alert--border-".concat(this.border)]=!0),t},computedColor:function(){return this.color||this.type},computedIcon:function(){return!1!==this.icon&&("string"===typeof this.icon&&this.icon?this.icon:!!["error","info","success","warning"].includes(this.type)&&"$".concat(this.type))},hasColoredIcon:function(){return this.hasText||Boolean(this.border)&&this.coloredBorder},hasText:function(){return this.text||this.outlined},iconColor:function(){return this.hasColoredIcon?this.computedColor:void 0},isDark:function(){return!(!this.type||this.coloredBorder||this.outlined)||c["a"].options.computed.isDark.call(this)}},created:function(){this.$attrs.hasOwnProperty("outline")&&Object(f["a"])("outline","outlined",this)},methods:{genWrapper:function(){var t=[this.$slots.prepend||this.__cachedIcon,this.genContent(),this.__cachedBorder,this.$slots.append,this.$scopedSlots.close?this.$scopedSlots.close({toggle:this.toggle}):this.__cachedDismissible],e={staticClass:"v-alert__wrapper"};return this.$createElement("div",e,t)},genContent:function(){return this.$createElement("div",{staticClass:"v-alert__content"},this.$slots.default)},genAlert:function(){var t={staticClass:"v-alert",attrs:{role:"alert"},on:this.listeners$,class:this.classes,style:this.styles,directives:[{name:"show",value:this.isActive}]};if(!this.coloredBorder){var e=this.hasText?this.setTextColor:this.setBackgroundColor;t=e(this.computedColor,t)}return this.$createElement("div",t,[this.genWrapper()])},toggle:function(){this.isActive=!this.isActive}},render:function(t){var e=this.genAlert();return this.transition?t("transition",{props:{name:this.transition,origin:this.origin,mode:this.mode}},[e]):e}})},"0c18":function(t,e,i){},"69ff":function(t,e,i){"use strict";i("0678")},afdd:function(t,e,i){"use strict";var s=i("8336");e["a"]=s["a"]},ea2f:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-container",{staticClass:"d-flex"},[i("CardList",{staticClass:"playlist-list scroll-thin",attrs:{cards:t.playlistCards},on:{clicked:t.onClick}}),i("transition",{attrs:{name:"slide"}},[t.selectedPlaylist?i("div",{staticClass:"track-list-container"},[i("div",{staticClass:"playlist-info-container",on:{click:function(e){t.selectedPlaylist=null}}},[i("div",{staticClass:"playlist-info-background",style:{backgroundImage:"url("+t.selectedPlaylistThumbnail+")"}}),i("div",{staticClass:"playlist-info"},[i("h2",{staticClass:"playlist-info-title"},[t._v(" "+t._s(t.selectedPlaylist.name)+" "),i("v-dialog",{attrs:{"max-width":"400px"},scopedSlots:t._u([{key:"activator",fn:function(e){var s=e.on,l=e.attrs;return[i("v-btn",t._g(t._b({attrs:{icon:"",dark:""},on:{click:function(e){t.renamedPlaylistName=t.selectedPlaylist.name}}},"v-btn",l,!1),s),[i("v-icon",[t._v("mdi-pencil")])],1)]}}],null,!1,561082580),model:{value:t.renameDialog,callback:function(e){t.renameDialog=e},expression:"renameDialog"}},[i("v-card",[i("v-card-title",[t._v("プレイリスト名を変更")]),t.renamePlaylistErrorMessage?i("v-alert",{attrs:{type:t.renamePlaylistErrorMessage.type},on:{click:function(e){t.renamePlaylistErrorMessage=null}}},[t._v(" "+t._s(t.renamePlaylistErrorMessage.text)+" ")]):t._e(),i("v-card-text",[i("v-text-field",{staticClass:"text-field-rename",model:{value:t.renamedPlaylistName,callback:function(e){t.renamedPlaylistName=e},expression:"renamedPlaylistName"}})],1),i("v-card-actions",[i("v-btn",{attrs:{text:"",color:"blue"},on:{click:t.renameSelectedPlaylist}},[t._v("変更")]),i("v-btn",{attrs:{text:"",color:"red"},on:{click:function(e){t.renameDialog=!1}}},[t._v("キャンセル")])],1)],1)],1)],1),i("h4",{staticClass:"playlist-info-subtitle"},[t._v(" "+t._s(t.selectedPlaylist.tracks.length+" 曲")+" ")])]),i("div",{staticClass:"btn-close-track-list"},[i("v-btn",{attrs:{dark:"",icon:""}},[i("v-icon",{attrs:{size:"40"}},[t._v("mdi-chevron-down")])],1)],1),i("div",{staticClass:"playlist-actions"},[i("v-btn",{attrs:{icon:"",dark:""},on:{click:function(t){t.stopPropagation()}}},[i("v-icon",[t._v("mdi-plus")])],1),i("v-btn",{attrs:{icon:"",dark:""},on:{click:function(t){t.stopPropagation()}}},[i("v-icon",[t._v("mdi-shuffle-variant")])],1),i("v-dialog",{attrs:{"max-width":"300px"},scopedSlots:t._u([{key:"activator",fn:function(e){var s=e.on,l=e.attrs;return[i("v-btn",t._g(t._b({attrs:{icon:"",dark:""},on:{click:function(t){t.stopPropagation()}}},"v-btn",l,!1),s),[i("v-icon",[t._v("mdi-delete")])],1)]}}],null,!1,2040466812),model:{value:t.deleteDialog,callback:function(e){t.deleteDialog=e},expression:"deleteDialog"}},[i("v-card",[i("v-card-title",[t._v(" プレイリストを削除しますか？ ")]),i("v-card-actions",[i("v-btn",{attrs:{text:"",color:"blue"},on:{click:t.deleteSeledtedPlaylist}},[t._v("はい")]),i("v-btn",{attrs:{text:"",color:"red"},on:{click:function(e){t.deleteDialog=!1}}},[t._v("いいえ")])],1)],1)],1)],1)]),i("TrackList",{staticClass:"track-list scroll-thin",attrs:{tracks:t.selectedPlaylist.tracks,sort:!0,put:!0,pull:"clone",deletable:!0,queueing:!0},on:{deleted:t.deleteTrack,changed:t.updatePlaylistTracks}})],1):t._e()])],1)},l=[],a=(i("4de4"),i("7db0"),i("d81d"),i("b0c0"),i("d3b7"),i("5530")),n=i("2b0e"),r=i("2f62"),o=i("2d40"),c=n["a"].extend({name:"Playlists",components:{CardList:function(){return i.e("chunk-2fb2f9b0").then(i.bind(null,"c995"))},TrackList:function(){return i.e("chunk-7eae974c").then(i.bind(null,"a1a1"))}},data:function(){return{selectedPlaylist:null,renameDialog:!1,deleteDialog:!1,renamedPlaylistName:"",renamePlaylistErrorMessage:null}},computed:Object(a["a"])(Object(a["a"])({},Object(r["d"])(["playlists"])),{},{playlistCards:function(){return this.playlists.map((function(t){return{id:t.name,title:t.name,subtitle:t.tracks.length+" 曲",thumbnailUrl:t.tracks.length?t.tracks[0].video.getThumbnailURL("mqdefault"):""}}))},selectedPlaylistThumbnail:function(){var t=this.selectedPlaylist&&this.selectedPlaylist.tracks.length?this.selectedPlaylist.tracks[0]:null;return t?t.video.getThumbnailURL("mqdefault"):""}}),methods:Object(a["a"])(Object(a["a"])({},Object(r["c"])({addPlaylist:o["b"],removePlaylist:o["e"]})),{},{onClick:function(t){this.selectedPlaylist=this.playlists.find((function(e){return e.name==t.id}))||null},deleteTrack:function(t){if(!this.selectedPlaylist)throw Error("no playlist selected");this.selectedPlaylist.tracks=this.selectedPlaylist.tracks.filter((function(e){return e.uuid!==t.uuid})),this.updatePlaylist(this.selectedPlaylist)},updatePlaylistTracks:function(t){if(!this.selectedPlaylist)throw Error("no playlist selected");this.selectedPlaylist.tracks=t,this.updatePlaylist(this.selectedPlaylist)},renameSelectedPlaylist:function(){var t=this;if(!this.selectedPlaylist)throw Error("no playlist selected");this.playlists.find((function(e){return e.name==t.renamedPlaylistName}))?this.renamePlaylistErrorMessage={type:"error",text:"プレイリストが既に存在します"}:(this.removePlaylist(this.selectedPlaylist),this.selectedPlaylist.name=this.renamedPlaylistName,this.addPlaylist(this.selectedPlaylist),this.renameDialog=!1)},deleteSeledtedPlaylist:function(){if(!this.selectedPlaylist)throw Error("no playlist selected");this.removePlaylist(this.selectedPlaylist),this.selectedPlaylist=null,this.deleteDialog=!1},updatePlaylist:function(t){this.removePlaylist(t),this.addPlaylist(t)}})}),d=c,u=(i("69ff"),i("2877")),h=i("6544"),f=i.n(h),v=i("0798"),p=i("8336"),m=i("b0af"),y=i("99d9"),b=i("a523"),g=i("169a"),P=i("132d"),k=i("8654"),_=Object(u["a"])(d,s,l,!1,null,"e69f6a36",null);e["default"]=_.exports;f()(_,{VAlert:v["a"],VBtn:p["a"],VCard:m["a"],VCardActions:y["a"],VCardText:y["c"],VCardTitle:y["d"],VContainer:b["a"],VDialog:g["a"],VIcon:P["a"],VTextField:k["a"]})}}]);
//# sourceMappingURL=chunk-eccf03f0.d0ee8120.js.map