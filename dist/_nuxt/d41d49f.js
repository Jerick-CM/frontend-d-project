(window.webpackJsonp=window.webpackJsonp||[]).push([[54],{1105:function(t,e,r){"use strict";r(701)},1106:function(t,e,r){(e=r(2)(!1)).push([t.i,".white-font[data-v-5adbee16]{color:#fff}",""]),t.exports=e},1179:function(t,e,r){"use strict";r.r(e);r(447),r(450),r(20),r(187),r(13);var n=r(10),o=r(31),c=(r(14),r(4)),f=r(424),l=r(12);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}r(44);var v={mixins:[f.a],data:function(){return{progressBar:!1,progressBarvalue:0,table:{headers:[{text:"Id",value:"career_level",sortable:!0},{text:"Description",value:"Desciption",sortable:!1},{text:"My Rewards Token",value:"token",sortable:!0},{text:"Action"}],page:1,totalItems:0,isLoading:!1},positions:[],positionsCopy:[],updateSelection:[],searchTimeOut:null,searchFilter:"",search:null,dialog:!1,isSaving:!1,badgerewardtoken:[],pagination:{rowsPerPage:10}}},created:function(){var t=this;return Object(c.a)(regeneratorRuntime.mark((function e(){var r,data,n,c,f,l;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t.progressBar=!0,e.next=4,t.$axios.get("/api/fetch-myrewards",{});case 4:for(r=e.sent,console.log(r),data=[],console.log(r),n=0,c=Object.entries(r.data.data.badge_rewards_token);n<c.length;n++)f=Object(o.a)(c[n],2),f[0],l=f[1],data.push({id:l.id,description:l.description,rewardstoken:l.rewardstoken,created_at:l.created_at,updated_at:l.updated_at});t.progressBarvalue=100,t.progressBar=!1,t.badgerewardtoken=data,e.next=17;break;case 14:e.prev=14,e.t0=e.catch(0),t.progressBar=!1;case 17:case"end":return e.stop()}}),e,null,[[0,14]])})))()},methods:{fireUpdate:function(t,e,r){var n=this;if(confirm("Are you sure you want to update this row?")){var o=this.profile.id,c=this.profile.name,f=new FormData;f.append("id",t),f.append("description",e),f.append("rewardstoken",r),f.append("profile_id",o),f.append("profile_name",c),this.$axios.post("/api/update-badge-level-rewardtoken",f).then((function(t){t.data.error&&(console.log(t.data),n.$toast.error(t.data.error.message)),t.data.success&&(n.$toast.success("Update item is successful"),n.submitted=!1)})).catch((function(t){t.message&&n.$toast.error(t.message)})).finally((function(){}))}}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(l.b)({profile:"session/GET_PROFILE"})),mounted:function(){},watch:{}},m=(r(1105),r(9)),component=Object(m.a)(v,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"user-levels-page"}},[r("div",{staticClass:"container no-padding"},[r("v-toolbar",{attrs:{flat:"",color:"white"}},[r("v-toolbar-title",[t._v("Badge Promotion Level Rewards Token")]),t._v(" "),r("v-divider",{staticClass:"mx-2",attrs:{inset:"",vertical:""}}),t._v(" "),r("v-spacer")],1),t._v(" "),r("v-progress-linear",{directives:[{name:"show",rawName:"v-show",value:t.progressBar,expression:"progressBar"}],attrs:{slot:"progress",height:"1",color:"blue",indeterminate:""},slot:"progress"}),t._v(" "),r("v-data-table",{directives:[{name:"show",rawName:"v-show",value:!t.progressBar,expression:"!progressBar"}],staticClass:"elevation-1",attrs:{headers:t.table.headers,items:t.badgerewardtoken,"items-per-page":10,"item-key":"id",pagination:t.pagination},on:{"update:pagination":function(e){t.pagination=e}},scopedSlots:t._u([{key:"items",fn:function(e){return[r("tr",[r("td",[r("h3",[t._v(t._s(e.item.id))])]),t._v(" "),r("td",[r("h3",[t._v(t._s(e.item.description))])]),t._v(" "),r("td",[r("v-text-field",{attrs:{color:"light-green lighten-1",type:"number",min:"0"},model:{value:e.item.rewardstoken,callback:function(r){t.$set(e.item,"rewardstoken",r)},expression:"props.item.rewardstoken"}})],1),t._v(" "),r("td",[r("v-btn",{attrs:{color:"success"},on:{click:function(r){return t.fireUpdate(e.item.id,e.item.description,e.item.rewardstoken)}}},[r("label",{staticClass:"white-font"},[t._v("Update")])])],1)])]}}])})],1)])}),[],!1,null,"5adbee16",null);e.default=component.exports},424:function(t,e,r){"use strict";r(14);var n=r(4);e.a={middleware:"authenticated",layout:"admin",asyncData:function(t){return Object(n.a)(regeneratorRuntime.mark((function e(){var r,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.store,n=t.error,e.next=3,r.dispatch("session/fetchUserProfile");case 3:return e.next=5,r.getters["session/IS_ADMIN"];case 5:e.sent||n({statusCode:404,message:"Page not found"});case 7:case"end":return e.stop()}}),e)})))()}}},437:function(t,e,r){var n=r(7);e.f=n},447:function(t,e,r){"use strict";var n=r(5),o=r(6),c=r(39),f=r(38),l=r(19),d=r(122),v=r(192),m=r(8),h=r(21),y=r(82),w=r(16),O=r(11),S=r(26),j=r(30),k=r(74),_=r(59),x=r(115),P=r(60),B=r(114),D=r(448),E=r(121),$=r(58),N=r(23),C=r(79),R=r(25),I=r(24),T=r(119),F=r(80),U=r(81),J=r(120),A=r(7),L=r(437),M=r(449),G=r(77),Q=r(50),W=r(32).forEach,z=F("hidden"),H=A("toPrimitive"),K=Q.set,V=Q.getterFor("Symbol"),X=Object.prototype,Y=o.Symbol,Z=c("JSON","stringify"),tt=$.f,et=N.f,nt=D.f,ot=C.f,it=T("symbols"),at=T("op-symbols"),st=T("string-to-symbol-registry"),ct=T("symbol-to-string-registry"),ut=T("wks"),pt=o.QObject,ft=!pt||!pt.prototype||!pt.prototype.findChild,lt=l&&m((function(){return 7!=x(et({},"a",{get:function(){return et(this,"a",{value:7}).a}})).a}))?function(t,e,r){var n=tt(X,e);n&&delete X[e],et(t,e,r),n&&t!==X&&et(X,e,n)}:et,vt=function(t,e){var symbol=it[t]=x(Y.prototype);return K(symbol,{type:"Symbol",tag:t,description:e}),l||(symbol.description=e),symbol},gt=v?function(t){return"symbol"==typeof t}:function(t){return Object(t)instanceof Y},bt=function(t,e,r){t===X&&bt(at,e,r),O(t);var n=k(e,!0);return O(r),h(it,n)?(r.enumerable?(h(t,z)&&t[z][n]&&(t[z][n]=!1),r=x(r,{enumerable:_(0,!1)})):(h(t,z)||et(t,z,_(1,{})),t[z][n]=!0),lt(t,n,r)):et(t,n,r)},mt=function(t,e){O(t);var r=j(e),n=P(r).concat(Ot(r));return W(n,(function(e){l&&!ht.call(r,e)||bt(t,e,r[e])})),t},ht=function(t){var e=k(t,!0),r=ot.call(this,e);return!(this===X&&h(it,e)&&!h(at,e))&&(!(r||!h(this,e)||!h(it,e)||h(this,z)&&this[z][e])||r)},yt=function(t,e){var r=j(t),n=k(e,!0);if(r!==X||!h(it,n)||h(at,n)){var o=tt(r,n);return!o||!h(it,n)||h(r,z)&&r[z][n]||(o.enumerable=!0),o}},wt=function(t){var e=nt(j(t)),r=[];return W(e,(function(t){h(it,t)||h(U,t)||r.push(t)})),r},Ot=function(t){var e=t===X,r=nt(e?at:j(t)),n=[];return W(r,(function(t){!h(it,t)||e&&!h(X,t)||n.push(it[t])})),n};(d||(I((Y=function(){if(this instanceof Y)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,e=J(t),r=function(t){this===X&&r.call(at,t),h(this,z)&&h(this[z],e)&&(this[z][e]=!1),lt(this,e,_(1,t))};return l&&ft&&lt(X,e,{configurable:!0,set:r}),vt(e,t)}).prototype,"toString",(function(){return V(this).tag})),I(Y,"withoutSetter",(function(t){return vt(J(t),t)})),C.f=ht,N.f=bt,$.f=yt,B.f=D.f=wt,E.f=Ot,L.f=function(t){return vt(A(t),t)},l&&(et(Y.prototype,"description",{configurable:!0,get:function(){return V(this).description}}),f||I(X,"propertyIsEnumerable",ht,{unsafe:!0}))),n({global:!0,wrap:!0,forced:!d,sham:!d},{Symbol:Y}),W(P(ut),(function(t){M(t)})),n({target:"Symbol",stat:!0,forced:!d},{for:function(t){var e=String(t);if(h(st,e))return st[e];var symbol=Y(e);return st[e]=symbol,ct[symbol]=e,symbol},keyFor:function(t){if(!gt(t))throw TypeError(t+" is not a symbol");if(h(ct,t))return ct[t]},useSetter:function(){ft=!0},useSimple:function(){ft=!1}}),n({target:"Object",stat:!0,forced:!d,sham:!l},{create:function(t,e){return void 0===e?x(t):mt(x(t),e)},defineProperty:bt,defineProperties:mt,getOwnPropertyDescriptor:yt}),n({target:"Object",stat:!0,forced:!d},{getOwnPropertyNames:wt,getOwnPropertySymbols:Ot}),n({target:"Object",stat:!0,forced:m((function(){E.f(1)}))},{getOwnPropertySymbols:function(t){return E.f(S(t))}}),Z)&&n({target:"JSON",stat:!0,forced:!d||m((function(){var symbol=Y();return"[null]"!=Z([symbol])||"{}"!=Z({a:symbol})||"{}"!=Z(Object(symbol))}))},{stringify:function(t,e,r){for(var n,o=[t],c=1;arguments.length>c;)o.push(arguments[c++]);if(n=e,(w(e)||void 0!==t)&&!gt(t))return y(e)||(e=function(t,e){if("function"==typeof n&&(e=n.call(this,t,e)),!gt(e))return e}),o[1]=e,Z.apply(null,o)}});Y.prototype[H]||R(Y.prototype,H,Y.prototype.valueOf),G(Y,"Symbol"),U[z]=!0},448:function(t,e,r){var n=r(30),o=r(114).f,c={}.toString,f="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];t.exports.f=function(t){return f&&"[object Window]"==c.call(t)?function(t){try{return o(t)}catch(t){return f.slice()}}(t):o(n(t))}},449:function(t,e,r){var path=r(191),n=r(21),o=r(437),c=r(23).f;t.exports=function(t){var e=path.Symbol||(path.Symbol={});n(e,t)||c(e,t,{value:o.f(t)})}},450:function(t,e,r){"use strict";var n=r(5),o=r(19),c=r(6),f=r(21),l=r(16),d=r(23).f,v=r(190),m=c.Symbol;if(o&&"function"==typeof m&&(!("description"in m.prototype)||void 0!==m().description)){var h={},y=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),e=this instanceof y?new m(t):void 0===t?m():m(t);return""===t&&(h[e]=!0),e};v(y,m);var w=y.prototype=m.prototype;w.constructor=y;var O=w.toString,S="Symbol(test)"==String(m("test")),j=/^Symbol\((.*)\)[^)]+$/;d(w,"description",{configurable:!0,get:function(){var symbol=l(this)?this.valueOf():this,t=O.call(symbol);if(f(h,symbol))return"";var desc=S?t.slice(7,-1):t.replace(j,"$1");return""===desc?void 0:desc}}),n({global:!0,forced:!0},{Symbol:y})}},701:function(t,e,r){var content=r(1106);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(3).default)("4741f73a",content,!0,{sourceMap:!1})}}]);