(window.webpackJsonp=window.webpackJsonp||[]).push([[70],{1117:function(t,e,o){"use strict";o(707)},1118:function(t,e,o){(e=o(2)(!1)).push([t.i,"#profile .greeting[data-v-69fa458f]{font-size:40px;font-weight:200;padding-bottom:15px}#profile .help[data-v-69fa458f]{position:absolute;width:20px;right:90px}#profile .help img[data-v-69fa458f]{max-width:100%;height:auto}@media only screen and (max-width:600px){#profile .profile-summary[data-v-69fa458f]{display:block}}",""]),t.exports=e},1186:function(t,e,o){"use strict";o.r(e);var r=o(710),n=o(712),c=o(713),d=o(429),l={validate:function(t){var e=t.params;return/^\d+$/.test(e.id)},components:{AchievementSummary:n.a,ReceivedMessages:c.a,ProfileSummary:r.a},mixins:[d.a],mounted:function(){this.$store.commit("nominations/CLEAR"),this.$store.commit("profile/CLEAR"),this.$store.dispatch("profile/fetchUserBadges",this.$route.params.id),this.$store.dispatch("profile/fetchProfile",this.$route.params.id)}},f=(o(1117),o(9)),component=Object(f.a)(l,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"page",attrs:{id:"profile"}},[this._v("\n  "+this._s(this.id)+"\n  "),e("div",{staticClass:"container no-padding"},[e("div",{staticClass:"container--flex"},[e("div",{staticClass:"card flex-1"},[e("profile-summary")],1),this._v(" "),e("div",{staticClass:"card flex-4"},[e("achievement-summary")],1)]),this._v(" "),e("div",{staticClass:"m-md-vertical"},[e("received-messages")],1)])])}),[],!1,null,"69fa458f",null);e.default=component.exports},707:function(t,e,o){var content=o(1118);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(3).default)("d08dc73e",content,!0,{sourceMap:!1})}}]);