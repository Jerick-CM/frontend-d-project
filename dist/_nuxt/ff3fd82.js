(window.webpackJsonp=window.webpackJsonp||[]).push([[71],{1135:function(e,t,o){"use strict";o.r(t);var c=o(710),r=o(712),n=o(713),l=o(429),d={components:{AchievementSummary:r.a,ReceivedMessages:n.a,ProfileSummary:c.a},mixins:[l.a],mounted:function(){this.$store.commit("nominations/CLEAR"),this.$store.commit("profile/CLEAR"),this.$store.dispatch("profile/fetchUserBadges"),this.$store.dispatch("profile/fetchProfile")}},m=(o(744),o(9)),component=Object(m.a)(d,(function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"page",attrs:{id:"profile"}},[t("div",{staticClass:"container no-padding"},[t("div",{staticClass:"profile-summary container--flex"},[t("div",{staticClass:"card flex-1"},[t("profile-summary")],1),this._v(" "),t("div",{staticClass:"card flex-4"},[t("achievement-summary")],1)]),this._v(" "),t("div",{staticClass:"m-md-vertical"},[t("received-messages")],1)])])}),[],!1,null,"49ec95bc",null);t.default=component.exports},571:function(e,t,o){var content=o(745);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,o(3).default)("003001de",content,!0,{sourceMap:!1})},744:function(e,t,o){"use strict";o(571)},745:function(e,t,o){(t=o(2)(!1)).push([e.i,"#profile .greeting[data-v-49ec95bc]{font-size:40px;font-weight:200;padding-bottom:15px}#profile .help[data-v-49ec95bc]{position:absolute;width:20px;right:90px}#profile .help img[data-v-49ec95bc]{max-width:100%;height:auto}@media only screen and (max-width:600px){#profile .profile-summary[data-v-49ec95bc]{display:block}}",""]),e.exports=t}}]);