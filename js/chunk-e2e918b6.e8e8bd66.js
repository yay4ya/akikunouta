(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e2e918b6"],{"138d":function(t,e,a){},"5fa9":function(t,e,a){"use strict";a("138d")},"615b":function(t,e,a){},"85e1":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",[a("v-card",{staticClass:"mx-auto my-12",attrs:{loading:t.loading,width:"240",height:"210"},on:{click:function(e){return t.console.log(t.video)}}},[a("div",[a("v-img",{attrs:{src:t.video.getThumbnailURL("hqdefault"),height:"130"}})],1),a("div",{staticClass:"d-flex flex-no-wrap justify-space-between"},[a("div",[a("v-card-title",{staticClass:"video-info video-title",domProps:{textContent:t._s(t.video.getTitle())}}),a("v-card-subtitle",{staticClass:"video-info video-channel",domProps:{textContent:t._s(t.video.getChannel().name)}})],1)])])],1)},s=[],n=a("2b0e"),r=n["a"].extend({name:"Video",props:["video"]}),o=r,c=(a("5fa9"),a("2877")),d=a("6544"),l=a.n(d),u=a("b0af"),v=a("99d9"),h=a("a523"),f=a("adda"),g=Object(c["a"])(o,i,s,!1,null,"89fa3c56",null);e["default"]=g.exports;l()(g,{VCard:u["a"],VCardSubtitle:v["b"],VCardTitle:v["d"],VContainer:h["a"],VImg:f["a"]})},"99d9":function(t,e,a){"use strict";a.d(e,"a",(function(){return n})),a.d(e,"b",(function(){return r})),a.d(e,"c",(function(){return o})),a.d(e,"d",(function(){return c}));var i=a("b0af"),s=a("80d2"),n=Object(s["g"])("v-card__actions"),r=Object(s["g"])("v-card__subtitle"),o=Object(s["g"])("v-card__text"),c=Object(s["g"])("v-card__title");i["a"]},b0af:function(t,e,a){"use strict";a("0481"),a("4069"),a("a9e3");var i=a("5530"),s=(a("615b"),a("10d2")),n=a("297c"),r=a("1c87"),o=a("58df");e["a"]=Object(o["a"])(n["a"],r["a"],s["a"]).extend({name:"v-card",props:{flat:Boolean,hover:Boolean,img:String,link:Boolean,loaderHeight:{type:[Number,String],default:4},raised:Boolean},computed:{classes:function(){return Object(i["a"])(Object(i["a"])({"v-card":!0},r["a"].options.computed.classes.call(this)),{},{"v-card--flat":this.flat,"v-card--hover":this.hover,"v-card--link":this.isClickable,"v-card--loading":this.loading,"v-card--disabled":this.disabled,"v-card--raised":this.raised},s["a"].options.computed.classes.call(this))},styles:function(){var t=Object(i["a"])({},s["a"].options.computed.styles.call(this));return this.img&&(t.background='url("'.concat(this.img,'") center center / cover no-repeat')),t}},methods:{genProgress:function(){var t=n["a"].options.methods.genProgress.call(this);return t?this.$createElement("div",{staticClass:"v-card__progress",key:"progress"},[t]):null}},render:function(t){var e=this.generateRouteLink(),a=e.tag,i=e.data;return i.style=this.styles,this.isClickable&&(i.attrs=i.attrs||{},i.attrs.tabindex=0),t(a,this.setBackgroundColor(this.color,i),[this.genProgress(),this.$slots.default])}})}}]);
//# sourceMappingURL=chunk-e2e918b6.e8e8bd66.js.map