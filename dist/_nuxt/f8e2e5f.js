(window.webpackJsonp=window.webpackJsonp||[]).push([[68],{1133:function(t,e,o){"use strict";o.r(e);o(34),o(123),o(14);var n=o(4),r={components:{},mixins:[o(429).a],watchQuery:["page"],mounted:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var path,o,i,n,data,r,c;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(console.log(t.$route),path=t.$route.path,o="",!path){e.next=15;break}path=path.split("/"),i=0;case 6:if(!(i<path.length)){e.next=14;break}if(console.log(path[i-1]),!(i-1>=0)||"page"!=path[i-1]&&"p"!=path[i-1]){e.next=11;break}return o=path[i],e.abrupt("break",14);case 11:i++,e.next=6;break;case 14:console.log(o);case 15:if(console.log(path),console.log("p full"),!o){e.next=25;break}return e.next=20,t.$axios.get("/api/get-menu-slug/"+o);case 20:n=e.sent,data=n.data,r=data.data,(c=r[0])&&c.content&&(t.content=c.content,t.title=c.title);case 25:case"end":return e.stop()}}),e)})))()},data:function(){return{content:"",title:""}}},c=(o(725),o(727),o(9)),component=Object(c.a)(r,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"page",attrs:{id:"custom-page"}},[e("div",{staticClass:"promo-container container container--grid pb-0 pt-0"},[e("div",{staticClass:"content"},[e("h1",{staticClass:"grey--text text--darken-2 capitalize mt-0"},[this._v(this._s(this.title))]),this._v(" "),e("div",{staticClass:"ck-content",domProps:{innerHTML:this._s(this.content)}})])])])}),[],!1,null,"b7a705a4",null);e.default=component.exports},429:function(t,e,o){"use strict";o(14);var n=o(4);e.a={middleware:"authenticated",layout:"default",mounted:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.$store.commit("ranking/SET_FIXTURE"),t.$store.commit("badges/SET_FIXTURE"),e.prev=2,e.next=5,t.$store.dispatch("session/fetchUserProfile");case 5:return e.next=7,t.$store.dispatch("organization/fetchUsers");case 7:return e.next=9,t.$store.dispatch("badges/fetchUserBadges");case 9:return e.next=11,t.$store.dispatch("cart/fetch");case 11:e.next=17;break;case 13:e.prev=13,e.t0=e.catch(2),e.t0({statusCode:404,message:"Page not found"}),t.$toast.error(e.t0);case 17:case"end":return e.stop()}}),e,null,[[2,13]])})))()}}},561:function(t,e,o){var content=o(726);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(3).default)("8412c50c",content,!0,{sourceMap:!1})},562:function(t,e,o){var content=o(728);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(3).default)("b06b4156",content,!0,{sourceMap:!1})},725:function(t,e,o){"use strict";o(561)},726:function(t,e,o){(e=o(2)(!1)).push([t.i,'[data-v-b7a705a4]:root{--ck-color-mention-background:rgba(153,0,48,0.1);--ck-color-mention-text:#990030;--ck-highlight-marker-blue:#72ccfd;--ck-highlight-marker-green:#62f962;--ck-highlight-marker-pink:#fc7899;--ck-highlight-marker-yellow:#fdfd77;--ck-highlight-pen-green:#128a00;--ck-highlight-pen-red:#e71313;--ck-image-style-spacing:1.5em;--ck-todo-list-checkmark-size:16px}.ck-content .marker-yellow[data-v-b7a705a4]{background-color:#fdfd77;background-color:var(--ck-highlight-marker-yellow)}.ck-content .marker-green[data-v-b7a705a4]{background-color:#62f962;background-color:var(--ck-highlight-marker-green)}.ck-content .marker-pink[data-v-b7a705a4]{background-color:#fc7899;background-color:var(--ck-highlight-marker-pink)}.ck-content .marker-blue[data-v-b7a705a4]{background-color:#72ccfd;background-color:var(--ck-highlight-marker-blue)}.ck-content .pen-red[data-v-b7a705a4]{color:#e71313;color:var(--ck-highlight-pen-red);background-color:transparent}.ck-content .pen-green[data-v-b7a705a4]{color:#128a00;color:var(--ck-highlight-pen-green);background-color:transparent}.ck-content .image-style-side[data-v-b7a705a4]{float:right;margin-left:1.5em;margin-left:var(--ck-image-style-spacing);max-width:50%}.ck-content .image-style-align-left[data-v-b7a705a4]{float:left;margin-right:1.5em;margin-right:var(--ck-image-style-spacing)}.ck-content .image-style-align-center[data-v-b7a705a4]{margin-left:auto;margin-right:auto}.ck-content .image-style-align-right[data-v-b7a705a4]{float:right;margin-left:1.5em;margin-left:var(--ck-image-style-spacing)}.ck-content .image[data-v-b7a705a4]{display:table;clear:both;text-align:center;margin:1em auto}.ck-content .image img[data-v-b7a705a4]{display:block;margin:0 auto;max-width:100%;min-width:50px}.ck-content .image.image_resized[data-v-b7a705a4]{max-width:100%;display:block;box-sizing:border-box}.ck-content .image.image_resized img[data-v-b7a705a4]{width:100%}.ck-content .image.image_resized>figcaption[data-v-b7a705a4]{display:block}.ck-content .image>figcaption[data-v-b7a705a4]{display:table-caption;caption-side:bottom;word-break:break-word;color:#333;background-color:#f7f7f7;padding:.6em;font-size:.75em;outline-offset:-1px}.ck-content code[data-v-b7a705a4]{background-color:hsla(0,0%,78%,.3);padding:.15em;border-radius:2px}.ck-content .text-tiny[data-v-b7a705a4]{font-size:.7em}.ck-content .text-small[data-v-b7a705a4]{font-size:.85em}.ck-content .text-big[data-v-b7a705a4]{font-size:1.4em}.ck-content .text-huge[data-v-b7a705a4]{font-size:1.8em}.ck-content blockquote[data-v-b7a705a4]{overflow:hidden;padding-right:1.5em;padding-left:1.5em;margin-left:0;margin-right:0;font-style:italic;border-left:5px solid #ccc}.ck-content[dir=rtl] blockquote[data-v-b7a705a4]{border-left:0;border-right:5px solid #ccc}.ck-content .table[data-v-b7a705a4]{margin:1em auto;display:table}.ck-content .table table[data-v-b7a705a4]{border-collapse:collapse;border-spacing:0;width:100%;height:100%;border:1px double #b3b3b3}.ck-content .table table td[data-v-b7a705a4],.ck-content .table table th[data-v-b7a705a4]{min-width:2em;padding:.4em;border:1px solid #bfbfbf}.ck-content .table table th[data-v-b7a705a4]{font-weight:700;background:hsla(0,0%,0%,5%)}.ck-content[dir=rtl] .table th[data-v-b7a705a4]{text-align:right}.ck-content[dir=ltr] .table th[data-v-b7a705a4]{text-align:left}.ck-content .page-break[data-v-b7a705a4]{position:relative;clear:both;padding:5px 0;display:flex;align-items:center;justify-content:center}.ck-content .page-break[data-v-b7a705a4]:after{content:"";position:absolute;border-bottom:2px dashed #c4c4c4;width:100%}.ck-content .page-break__label[data-v-b7a705a4]{position:relative;z-index:1;padding:.3em .6em;display:block;text-transform:uppercase;border:1px solid #c4c4c4;border-radius:2px;font-family:Helvetica,Arial,Tahoma,Verdana,Sans-Serif;font-size:.75em;font-weight:700;color:#333;background:#fff;box-shadow:2px 2px 1px rgba(0,0,0,.15);-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.ck-content .media[data-v-b7a705a4]{clear:both;margin:1em 0;display:block;min-width:15em}.ck-content .todo-list[data-v-b7a705a4]{list-style:none}.ck-content .todo-list li[data-v-b7a705a4]{margin-bottom:5px}.ck-content .todo-list li .todo-list[data-v-b7a705a4]{margin-top:5px}.ck-content .todo-list .todo-list__label>input[data-v-b7a705a4]{-webkit-appearance:none;display:inline-block;position:relative;width:16px;width:var(--ck-todo-list-checkmark-size);height:16px;height:var(--ck-todo-list-checkmark-size);vertical-align:middle;border:0;left:-25px;margin-right:-15px;right:0;margin-left:0}.ck-content .todo-list .todo-list__label>input[data-v-b7a705a4]:before{display:block;position:absolute;box-sizing:border-box;content:"";width:100%;height:100%;border:1px solid #333;border-radius:2px;transition:box-shadow .25s ease-in-out,background .25s ease-in-out,border .25s ease-in-out}.ck-content .todo-list .todo-list__label>input[data-v-b7a705a4]:after{display:block;position:absolute;box-sizing:content-box;pointer-events:none;content:"";left:5.33333px;left:calc(var(--ck-todo-list-checkmark-size)/3);top:3.01887px;top:calc(var(--ck-todo-list-checkmark-size)/5.3);width:3.01887px;width:calc(var(--ck-todo-list-checkmark-size)/5.3);height:6.15385px;height:calc(var(--ck-todo-list-checkmark-size)/2.6);border-width:0 2px 2px 0;border-left:0 solid transparent;border-bottom:calc(var(--ck-todo-list-checkmark-size)/8) solid transparent;border-right:calc(var(--ck-todo-list-checkmark-size)/8) solid transparent;border-top:0 solid transparent;transform:rotate(45deg)}.ck-content .todo-list .todo-list__label>input[checked][data-v-b7a705a4]:before{background:#26ab33;border-color:#26ab33}.ck-content .todo-list .todo-list__label>input[checked][data-v-b7a705a4]:after{border-color:#fff}.ck-content .todo-list .todo-list__label .todo-list__label__description[data-v-b7a705a4]{vertical-align:middle}.ck-content hr[data-v-b7a705a4]{margin:15px 0;height:4px;background:#dedede;border:0}.ck-content pre[data-v-b7a705a4]{padding:1em;color:#353535;background:hsla(0,0%,78%,.3);border:1px solid #c4c4c4;border-radius:2px;text-align:left;direction:ltr;-moz-tab-size:4;-o-tab-size:4;tab-size:4;white-space:pre-wrap;font-style:normal;min-width:200px}.ck-content pre code[data-v-b7a705a4]{background:unset;padding:0;border-radius:0}.ck-content .mention[data-v-b7a705a4]{background:rgba(153,0,48,.1);background:var(--ck-color-mention-background);color:#990030;color:var(--ck-color-mention-text)}@media print{.ck-content .page-break[data-v-b7a705a4]{padding:0}.ck-content .page-break[data-v-b7a705a4]:after{display:none}}',""]),t.exports=e},727:function(t,e,o){"use strict";o(562)},728:function(t,e,o){(e=o(2)(!1)).push([t.i,"#custom-page .content img{max-width:100%}",""]),t.exports=e}}]);