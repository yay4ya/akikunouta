(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5799a2dc"],{"00af":function(t,a,n){},"10f1":function(t,a,n){"use strict";n("00af")},c995:function(t,a,n){"use strict";n.r(a);var c=function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("v-container",{staticClass:"card-list-container"},[n("div",{staticClass:"card-list scroll-thin"},t._l(t.cards,(function(a){return n("div",{key:a.id,staticClass:"card-list-item",style:{display:t.matchQuery(a)?"block":"none"}},[n("Card",{staticClass:"card",attrs:{card:a},on:{clicked:t.onClick}})],1)})),0)])},e=[],i=(n("c975"),n("a15b"),n("d3b7"),n("ac1f"),n("1276"),n("b85c")),s=n("2b0e"),r=s["a"].extend({name:"CardList",props:["cards","query","cardWidth"],components:{Card:function(){return n.e("chunk-330c41c8").then(n.bind(null,"ae8d"))}},methods:{onClick:function(t){this.$emit("clicked",t)},matchQuery:function(t){var a,n=[t.title,t.subtitle,t.metadata].join("  ").toLowerCase(),c=!0,e=Object(i["a"])(this.query.toLowerCase().split(/\s/));try{for(e.s();!(a=e.n()).done;){var s=a.value;c=c&&n.indexOf(s)>=0}}catch(r){e.e(r)}finally{e.f()}return c}}}),o=r,l=(n("10f1"),n("2877")),d=n("6544"),u=n.n(d),f=n("a523"),h=Object(l["a"])(o,c,e,!1,null,"84da3776",null);a["default"]=h.exports;u()(h,{VContainer:f["a"]})}}]);
//# sourceMappingURL=chunk-5799a2dc.145744e4.js.map