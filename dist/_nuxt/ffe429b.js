(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{429:function(t,e,n){"use strict";n(14);var r=n(4);e.a={middleware:"authenticated",layout:"default",mounted:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.$store.commit("ranking/SET_FIXTURE"),t.$store.commit("badges/SET_FIXTURE"),e.prev=2,e.next=5,t.$store.dispatch("session/fetchUserProfile");case 5:return e.next=7,t.$store.dispatch("organization/fetchUsers");case 7:return e.next=9,t.$store.dispatch("badges/fetchUserBadges");case 9:return e.next=11,t.$store.dispatch("cart/fetch");case 11:e.next=17;break;case 13:e.prev=13,e.t0=e.catch(2),e.t0({statusCode:404,message:"Page not found"}),t.$toast.error(e.t0);case 17:case"end":return e.stop()}}),e,null,[[2,13]])})))()}}},456:function(t,e,n){t.exports=n.p+"img/close.b503dd1.png"},460:function(t,e,n){var content=n(507);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(3).default)("aa754216",content,!0,{sourceMap:!1})},461:function(t,e,n){var content=n(509);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(3).default)("250f0fe6",content,!0,{sourceMap:!1})},479:function(t,e,n){t.exports=n.p+"img/question-mark.c1a18f6.png"},506:function(t,e,n){"use strict";n(460)},507:function(t,e,n){(e=n(2)(!1)).push([t.i,"#nomination-item[data-v-b82a9766]{background-color:#fff;padding:15px 15px 5px}#nomination-item header[data-v-b82a9766]{display:flex;flex-direction:row;align-items:center;border-bottom:1px solid #bdbdbd;margin-bottom:20px;padding-bottom:15px}#nomination-item footer[data-v-b82a9766]{border-top:1px solid #bdbdbd;margin-top:10px;padding-top:10px}#nomination-item .content[data-v-b82a9766]{font-size:14px;min-height:331px}#nomination-item .content .date[data-v-b82a9766],#nomination-item .content .name[data-v-b82a9766]{color:#a9a9a9}#nomination-item .content .name[data-v-b82a9766]{text-transform:capitalize}#nomination-item .detail[data-v-b82a9766]{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;width:230px;padding-left:10px}#nomination-item .detail .name[data-v-b82a9766]{font-size:20px;text-transform:capitalize}#nomination-item .comment[data-v-b82a9766]{overflow:hidden}#nomination-item .like-btn[data-v-b82a9766]{color:#000;font-size:13px;font-weight:700}#nomination-item .like-btn.active .thumbs-up-icon[data-v-b82a9766],#nomination-item .like-btn:hover .thumbs-up-icon[data-v-b82a9766]{background-image:url(/img/icons/thumbs-up-alt.svg);background-repeat:no-repeat}#nomination-item .like-btn .thumbs-up-icon[data-v-b82a9766]{background-image:url(/img/icons/thumbs-up.svg);background-repeat:no-repeat;width:30px;height:37px;display:inline-block;vertical-align:middle}",""]),t.exports=e},508:function(t,e,n){"use strict";n(461)},509:function(t,e,n){(e=n(2)(!1)).push([t.i,"#nomination-list[data-v-2aa80182]{padding:0 5px}@media only screen and (max-width:600px){#nomination-list .filter-1[data-v-2aa80182],#nomination-list .filters-control[data-v-2aa80182]{display:inherit}}#nomination-list .grid-item[data-v-2aa80182]{width:calc(25% - 8px);margin-top:8px;margin-bottom:2px}@media only screen and (min-width:601px) and (max-width:992px){#nomination-list .grid-item[data-v-2aa80182]{width:99%}}@media only screen and (max-width:600px){#nomination-list .grid-item[data-v-2aa80182]{width:calc(100% - 8px)}}",""]),t.exports=e},553:function(t,e,n){"use strict";n(49),n(45),n(20),n(13),n(34),n(116),n(46),n(47),n(14);var r=n(4),o=n(10),c=n(446),l=n.n(c),d=n(569),m=n(12),v=n(194);n(35);function f(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function h(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var _={props:{isUserNominations:{type:Boolean,default:!1},nomination:{type:Object,required:!0}},methods:{toggleLike:function(){this.nomination&&this.$store.dispatch("nominations/like",this.nomination.id)}},computed:h(h({},Object(m.b)({isFilterTypeReceived:"nominations/IS_FILTER_TYPE_RECEIVED",user:"session/GET_PROFILE",isAdmin:"session/IS_ADMIN",badges:"badges/GET"})),{},{showHeader:function(){return!this.isUserNominations||!this.isFilterTypeReceived},badgeTitle:function(){var t=this;if(this.nomination){var e=this.badges.findIndex((function(b){return b.id===t.nomination.badge.id}));if(e>=0)return this.badges[e].title_html}return""},badgeImage:function(){var t=this;if(this.nomination){var e=this.badges.findIndex((function(b){return b.id===t.nomination.badge.id}));if(e>=0)return this.badges[e].img}return""},editNomination:function(t){console.log(t)}})},x=(n(506),n(9)),y=Object(x.a)(_,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"nomination-item",attrs:{id:"nomination-item"}},[t.showHeader?n("header",[n("div",{staticClass:"avatar"},[n("img",{attrs:{src:t.nomination.recipient.avatar,alt:t.nomination.recipient.name}})]),t._v(" "),n("div",{staticClass:"detail"},[n("strong",{staticClass:"name"},[t._v(t._s(t.nomination.recipient.name))]),n("br"),t._v(" "),n("span",{staticClass:"department"},[t._v("\n        "+t._s(t.nomination.recipient.department_short_name||t.nomination.recipient.department_name)+"\n      ")])]),t._v(" "),n("v-btn",{staticClass:"text--white",attrs:{icon:"",color:"light-green"},on:{click:function(e){return t.$emit("welcome",t.nomination)}}},[n("v-icon",[t._v("edit")])],1)],1):t._e(),t._v(" "),n("div",{staticClass:"content"},[n("div",{directives:[{name:"show",rawName:"v-show",value:0==t.nomination.is_badge_removed,expression:"nomination.is_badge_removed == 0"}],staticClass:"badge"},[n("img",{attrs:{src:t.badgeImage}}),t._v(" "),n("p",{style:{color:"#000",fontSize:"17px",fontWeight:700},domProps:{innerHTML:t._s(t.badgeTitle)}})]),t._v(" "),n("p",{staticClass:"comment",domProps:{innerHTML:t._s(t.nomination.message)}}),t._v(" "),n("strong",{staticClass:"name"},[t._v("From "+t._s(t.nomination.sender.name))]),n("br"),t._v(" "),n("span",{staticClass:"date"},[t._v(t._s(t.$moment(t.nomination.created_at).format("DD MMM YYYY | hh:mm A")))])]),t._v(" "),n("footer",[n("a",{staticClass:"like-btn",class:{active:t.nomination.is_liked_by_user},attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.toggleLike(e)}}},[n("span",[t._v(t._s(t.nomination.total_likes))]),t._v(" "),n("div",{staticClass:"thumbs-up-icon"}),t._v(" "),n("span",[t._v("Great job!")])])])])}),[],!1,null,"b82a9766",null).exports;function w(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}var O={components:{NominationItem:y,InfiniteLoading:l.a},props:{nominations:{type:Array,required:!0},isUserNominations:{type:Boolean,default:!1},showSearch:{type:Boolean,default:!0},showSort:{type:Boolean,default:!0}},data:function(){return{infiniteIdentifier:new Date,shouldFetch:!1,isSearching:!1,isSorted:!1,isFetchingDepartment:!1,page:1,searchTimeout:null,searchResult:"",search:"",filter:v.FILTER_TYPES.RECEIVED,filterItems:[{text:"Outgoing messages",value:v.FILTER_TYPES.SENT},{text:"Incoming messages",value:v.FILTER_TYPES.RECEIVED}],filterDepartment:[],departments:[],delaySearch:null,menuProps:{closeOnContentClick:!0}}},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?w(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):w(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(m.b)({filterType:"nominations/GET_FILTER_TYPE"})),watch:{filterDepartment:function(){var t=this;null!==this.delaySearch&&clearTimeout(this.delaySearch),this.isSorted?this.delaySearch=setTimeout((function(){t.resetInfiniteScroll(),t.delaySearch=null,t.isSorted=!1}),500):(this.filterDepartment=this.filterDepartment.sort((function(a,b){return a.name.localeCompare(b.name)})),this.isSorted=!0)},filterType:function(t,e){t!==e&&this.resetInfiniteScroll()},filter:function(t,e){t!==e&&(this.$store.commit("nominations/SET_FILTER",t),this.resetInfiniteScroll())}},methods:{editNomination:function(t){this.$emit("welcome",t)},infiniteHandler:function(t){var e=this;return Object(r.a)(regeneratorRuntime.mark((function n(){var r,o;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(r=null,n.prev=1,o={page:e.page++,rpp:8},e.showSort&&(e.filter!==v.FILTER_TYPES.SENT&&e.filter!==v.FILTER_TYPES.RECEIVED?o.sort=e.filter:o.type=e.filterType),e.search?(o.search=e.search,e.searchResult=e.search,e.isSearching=!0):e.searchResult="",e.filterDepartment.length>0&&e.filterDepartment.forEach((function(p,i){o["departments[".concat(i,"]")]=p.id})),!e.isUserNominations){n.next=13;break}return e.$route.params.id&&(o.user_id=e.$route.params.id),n.next=10,e.$store.dispatch("nominations/fetchNextUserPageNominations",o);case 10:r=n.sent,n.next=16;break;case 13:return n.next=15,e.$store.dispatch("nominations/fetchNextPage",o);case 15:r=n.sent;case 16:e.searchTimeout=null,void 0!==r&&(0===r.length?t.complete():t.loaded()),n.next=23;break;case 20:n.prev=20,n.t0=n.catch(1),console.error(n.t0);case 23:setTimeout((function(){e.$redrawVueMasonry()}),500);case 24:case"end":return n.stop()}}),n,null,[[1,20]])})))()},fetchDepartment:function(){var t=this;this.isFetchingDepartment=!0;this.$axios.get(this.$queryBuilder("/departments",{paginate:0,sort:"name:asc"})).then((function(e){t.departments=e.data})).catch((function(t){console.error(t)})).finally((function(){t.isFetchingDepartment=!1}))},handleScroll:function(){document.body.scrollTop>250||document.documentElement.scrollTop>250?document.querySelector(".back-to-top").style.display="block":document.querySelector(".back-to-top").style.display="none"},backToTop:function(){document.body.scrollTop=0,document.documentElement.scrollTop=0},resetInfiniteScroll:function(){this.infiniteIdentifier+=1,this.page=1,this.$store.commit("nominations/CLEAR_USER_NOMINATIONS"),this.$store.commit("nominations/CLEAR_NOMINATIONS")},clearSearch:function(){this.isSearching=!1,this.searchResult="",this.search="",this.resetInfiniteScroll()},doSearch:function(t){null!==t?13===t.keyCode&&this.resetInfiniteScroll():this.resetInfiniteScroll()},doCaptializeWord:function(t){return Object(d.capitalize)(t)}},created:function(){window.addEventListener("scroll",this.handleScroll)},destroyed:function(){this.resetInfiniteScroll(),window.removeEventListener("scroll",this.handleScroll)},mounted:function(){this.fetchDepartment()}},C=(n(508),Object(x.a)(O,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container",attrs:{id:"nomination-list"}},[t.showSearch?n("div",{staticClass:"container--flex filters-control"},[n("div",{staticClass:"flex-1 container--flex filter-1 px-0"},[t.showSort?n("v-select",{staticStyle:{width:"35px"},attrs:{id:"filter",name:"filter",items:t.filterItems,"hide-details":"","item-text":"text","item-value":"value",color:"light-green lighten-1",label:"Sort by",outline:""},model:{value:t.filter,callback:function(e){t.filter=e},expression:"filter"}}):t._e(),t._v(" "),n("div",{staticClass:"flex-1 container--flex px-0 align-center"},[t.showSort?t._e():n("div",{staticClass:"container--flex align-center"},[n("v-select",{attrs:{items:t.departments,loading:t.isFetchingDepartment,"menu-props":t.menuProps,clearable:"",label:"Filter by department",color:"light-green lighten-1","hide-details":"",multiple:"",outline:""},scopedSlots:t._u([{key:"item",fn:function(e){var r=e.item;e.index;return[n("span",{staticClass:"capitalize"},[t._v(t._s(t.doCaptializeWord(r.short_name||r.name)))])]}},{key:"selection",fn:function(e){var n=e.item,r=e.index;return[t._v("\n              "+t._s(r>0?", ":"")+t._s(n.short_name||n.name)+"\n            ")]}}],null,!1,1875531482),model:{value:t.filterDepartment,callback:function(e){t.filterDepartment=e},expression:"filterDepartment"}})],1)])],1),t._v(" "),n("v-spacer"),t._v(" "),n("div",{staticClass:"container--flex align-center flex-1 px-0"},[n("v-text-field",{staticClass:"px-0",attrs:{label:"Search",color:"light-green lighten-1","single-line":"","hide-details":""},on:{keyup:t.doSearch},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}}),t._v(" "),n("v-btn",{staticClass:"mt-3",attrs:{icon:"",flat:""},on:{click:function(e){return e.preventDefault(),t.doSearch(null)}}},[n("v-icon",[t._v("search")])],1)],1)],1):t._e(),t._v(" "),t.isSearching?n("div",{staticClass:"container--flex align-center mb-2"},[n("v-btn",{staticClass:"white--text",attrs:{color:"light-green lighten-1"},on:{click:function(e){return t.clearSearch()}}},[t._v("\n      Exit search\n    ")]),t._v(" "),t.searchResult?n("span",[t._v('Search result for "'+t._s(t.searchResult)+'"')]):t._e()],1):t._e(),t._v(" "),n("no-ssr",[n("div",{directives:[{name:"masonry",rawName:"v-masonry"}],staticClass:"container",staticStyle:{padding:"0 0 24px"},attrs:{"transition-duration":"0.3s","horizontal-order":!0,gutter:8,stagger:"0.03s"}},t._l(t.nominations,(function(e,r){return n("nomination-item",{directives:[{name:"masonry-tile",rawName:"v-masonry-tile"}],key:r,staticClass:"grid-item",attrs:{nomination:e,"is-user-nominations":t.isUserNominations},on:{welcome:t.editNomination}})})),1)]),t._v(" "),n("a",{staticClass:"back-to-top",attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.backToTop(e)}}},[n("v-tooltip",{attrs:{top:""}},[n("i",{staticClass:"material-icons",attrs:{slot:"activator"},slot:"activator"},[t._v("arrow_upward")]),t._v(" "),n("span",{staticClass:"uppercase"},[t._v("BACK TO TOP")])])],1),t._v(" "),n("infinite-loading",{attrs:{identifier:t.infiniteIdentifier},on:{infinite:t.infiniteHandler}},[n("div",{attrs:{slot:"spinner"},slot:"spinner"},[t._v("Fetching...")]),t._v(" "),n("div",{attrs:{slot:"no-more"},slot:"no-more"},[t._v("All messages have been loaded")]),t._v(" "),n("div",{attrs:{slot:"no-results"},slot:"no-results"},[t._v("No Search Results Found")])])],1)}),[],!1,null,"2aa80182",null).exports);e.a={components:{NominationList:C}}},566:function(t,e,n){var content=n(737);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(3).default)("1498541a",content,!0,{sourceMap:!1})},567:function(t,e,n){var content=n(739);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(3).default)("7de2784d",content,!0,{sourceMap:!1})},568:function(t,e,n){var content=n(741);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(3).default)("6a4848ad",content,!0,{sourceMap:!1})},570:function(t,e,n){var content=n(743);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(3).default)("605399f2",content,!0,{sourceMap:!1})},710:function(t,e,n){"use strict";n(20);var r=n(10),o=n(12),c=(n(13),{data:function(){return{transactionHistory:[],selectedTransaction:null,isFetching:!1,isViewMode:!1,dialog:!1,page:1}},methods:{viewTransaction:function(t){this.selectedTransaction=this.transactionHistory[t],this.isViewMode=!0},back:function(){this.selectedTransaction=null,this.isViewMode=!1}},watch:{dialog:function(t){var e=this;t&&(this.page=1,this.selectedTransaction=null,this.isViewMode=!1,this.transactionHistory=[],this.isFetching=!0,this.$axios.get(this.$queryBuilder("/redeem/history",{page:this.page++})).then((function(t){e.transactionHistory=t.data.data})).finally((function(){e.isFetching=!1})))}}}),l=(n(736),n(9)),d=Object(l.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"transaction-history-modal-wrapper"}},[n("v-dialog",{attrs:{"max-width":"1024px"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[n("a",{staticClass:"capitalize grey--text",attrs:{slot:"activator",href:"#"},slot:"activator"},[n("small",[t._v("View Redemption History")])]),t._v(" "),n("div",{staticClass:"deloitte-modal",attrs:{id:"transaction-history-modal"}},[n("v-card",[n("v-card-title",{staticClass:"headline grey lighten-2",attrs:{"primary-title":""}},[t._v("\n          "+t._s(t.isViewMode?"Order #"+t.selectedTransaction.order_number:"Transaction History")+"\n\n          "),n("div",{staticClass:"icon"},[t.isViewMode?n("img",{attrs:{src:"/img/icons/cart-ico.svg",alt:"cart"}}):n("img",{attrs:{src:"/img/icons/transactions-ico.svg",alt:"transaction-history"}})]),t._v(" "),n("div",{staticClass:"cancel clickable",on:{click:function(e){t.dialog=!1}}},[n("img",{staticClass:"responsive-img",attrs:{src:"/img/icons/close.png"}})])]),t._v(" "),n("v-card-text",[t.isViewMode?n("div",{staticClass:"container--flex"},[n("div",{staticClass:"cart-items flex-1"},[n("table",[n("colgroup",[n("col",{attrs:{width:"25%"}}),t._v(" "),n("col",{attrs:{width:"50%"}}),t._v(" "),n("col",{attrs:{width:"25%"}})]),t._v(" "),n("thead",[n("tr",[n("th",{staticClass:"center-align"},[t._v("Quantity")]),t._v(" "),n("th",{staticClass:"center-align"},[t._v("Items")]),t._v(" "),n("th",[t._v("Tokens")])])]),t._v(" "),n("tbody",t._l(t.selectedTransaction.redeem_items,(function(i,e){return n("tr",{key:e},[n("td",{staticClass:"center-align"},[n("div",{staticClass:"quantity-count inline-block center-align"},[t._v("\n                        "+t._s(i.quantity)+"\n                      ")])]),t._v(" "),n("td",{staticClass:"center-align"},[n("img",{staticClass:"item-img responsive-img",attrs:{src:i.inventory.primary_photo.file,alt:i.name}})]),t._v(" "),n("td",{staticClass:"center-align"},[t._v(t._s(i.total_credits))])])})),0)])]),t._v(" "),n("div",{staticClass:"computation flex-1"},[n("p",[t._v("Total tokens: "),n("span",{staticClass:"right"},[t._v(t._s(t.$pluralize("token",t.selectedTransaction.total_credits)))])]),t._v(" "),n("div",{staticClass:"inline-block"},[n("button",{staticClass:"btn btn-flat btn-white clickable",on:{click:function(e){return t.back()}}},[t._v("BACK")])])])]):n("div",[n("table",{staticClass:"transaction-items"},[n("colgroup",[n("col",{attrs:{width:"25%"}}),t._v(" "),n("col",{attrs:{width:"50%"}}),t._v(" "),n("col",{attrs:{width:"25%"}})]),t._v(" "),n("thead",[n("tr",[n("th",{staticClass:"left-align"},[t._v("Date")]),t._v(" "),n("th",{staticClass:"left-align"},[t._v("Past transaction")]),t._v(" "),n("th",{staticClass:"left-align"},[t._v("Token used")])])]),t._v(" "),n("tbody",[t.isFetching?n("tr",{staticClass:"center-align"},[n("td",{attrs:{colspan:"3"}},[t._v("Fetching data...")])]):t._e(),t._v(" "),0!==t.transactionHistory.length||t.isFetching?t._l(t.transactionHistory,(function(e,i){return n("tr",{key:i,on:{click:function(e){return t.viewTransaction(i)}}},[n("td",{staticClass:"left-align"},[t._v(t._s(t.$moment(e.created_at).format("DD MMM YYYY")))]),t._v(" "),n("td",{staticClass:"left-align clickable"},[t._v("\n                    Order #"+t._s(e.order_number)+"\n                  ")]),t._v(" "),n("td",{staticClass:"left-align"},[t._v(t._s(e.total_credits))])])})):n("tr",{staticClass:"center-align"},[n("td",{attrs:{colspan:"3"}},[t._v("No transaction history yet.")])])],2)]),t._v(" "),n("br"),t._v(" "),n("div",{staticClass:"inline-block"},[n("button",{staticClass:"btn btn-flat right clickable",attrs:{disabled:""},on:{click:function(e){t.dialog=!1}}},[t._v("DOWNLOAD")])])])])],1)],1)])],1)}),[],!1,null,null,null).exports,m=n(194);function v(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function f(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?v(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):v(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var h={components:{TransactionHistoryModal:d},computed:f(f({},Object(o.b)({user:"profile/GET_USER_PROFILE",badges:"profile/GET_BADGES",badgeReceiveCount:"profile/GET_TOTAL_BADGES",badgeSendCount:"profile/GET_TOTAL_BADGES_SENT"})),{},{userName:function(){return this.user&&this.user.name?this.user.name:""},avatar:function(){return this.user&&this.user.avatar?this.user.avatar:"/img/placeholders/user-placeholder.png"}}),data:function(){return{FILTER_TYPES:m.FILTER_TYPES}},methods:{gotoUserHistory:function(){this.$router.push({name:"profile-user-history"})}}},_=(n(738),Object(l.a)(h,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"profile-summary"}},[n("div",{staticClass:"content container--flex container--flex-direction-column"},[n("br"),n("br"),t._v(" "),n("div",{staticClass:"center user-profile-details"},[n("div",{staticClass:"avatar center-block p-lg-vertical"},[n("img",{attrs:{src:t.avatar,alt:t.userName}})]),t._v(" "),n("p",{staticClass:"name mb-2"},[t._v(t._s(t.userName))]),t._v(" "),n("a",{staticClass:"white--text v-btn theme--light light-green lighten-1",staticStyle:{"text-transform":"none !important"},attrs:{href:"#"},on:{click:function(e){return e.preventDefault(),t.gotoUserHistory()}}},[t._v("View user history")]),n("br"),t._v(" "),t.user.nearest_token_expiration?n("small",[t._v('"Recognise Others" token expiration:'),n("br"),t._v(t._s(t.$moment(t.user.nearest_token_expiration).format("DD MMM YYYY | hh:mm A")))]):t._e()]),t._v(" "),n("div",{staticClass:"badges-summary container--flex center container--flex-justify-center"},[n("div",{staticClass:"sent flex-1 no-padding"},[n("p",[t._v("Badges sent")]),t._v(" "),n("span",[t._v(t._s(t.badgeSendCount))])]),t._v(" "),n("div",{staticClass:"received flex-1 no-padding"},[n("p",[t._v("Badges received")]),t._v(" "),n("span",[t._v(t._s(t.badgeReceiveCount))])])])])])}),[],!1,null,"12204a58",null));e.a=_.exports},712:function(t,e,n){"use strict";n(28),n(49),n(186),n(33),n(124),n(20);var r=n(10),o=n(12);function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function l(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var d={data:function(){return{dialog:!1,badgeDialog:!1}},methods:{displayRange:function(t,e){return e>0?"".concat(t," &mdash; ").concat(e," badges"):" > ".concat(t-1," badges")}},computed:l(l({},Object(o.b)({prospects:"ranking/GET_PROSPECTS",userBadges:"profile/GET_BADGES",user:"profile/GET_USER_PROFILE",tiers:"ranking/GET_TIERS",badges:"badges/GET"})),{},{rankingTiers:function(){var t=this;return this.tiers.map((function(e){return{title:e.name,badge_img:e.img,prospect:t.prospects.filter((function(p){return p.tier_id===e.id})).reduce((function(t,e){return e}),null)}}))},userAchievements:function(){var t=this;return this.badges.map((function(b){return{badge:b,count:t.userBadges.filter((function(t){return t.badge_id===b.id})).map((function(t){return t["count(id)"]})).reduce((function(t,e){return e}),0)}}))},badgeReceiveCount:function(){return this.userAchievements.map((function(t){return t.count})).reduce((function(t,e){return t+e}),0)},currentProspect:function(){var t=this;return this.prospects.filter((function(p){return t.badgeReceiveCount>=p.min})).map((function(p){return t.tiers.filter((function(t){return t.id===p.tier_id})).reduce((function(t,e){return e}),null)})).reduce((function(t,e){return e}),null)},nextAchievement:function(){var t=this,e=this.prospects.find((function(p){return p.min-t.badgeReceiveCount>0}));return{remaining:e?e.min-this.badgeReceiveCount:0,prospect:e||{title:""},tier:e?this.tiers.find((function(t){return t.id===e.tier_id})):null}}})},m=(n(740),n(9)),component=Object(m.a)(d,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"achievement-summary"}},[r("span",[t._v("Your achievement badges:")]),t._v(" "),r("div",{staticClass:"container--flex achievement-summary-content"},[r("div",{staticClass:"p-lg-vertical container--flex container--flex-wrap flex-2 p-0-horizontal",staticStyle:{position:"relative"}},[r("div",{staticClass:"help-btn"},[r("v-dialog",{attrs:{width:"60%"},model:{value:t.badgeDialog,callback:function(e){t.badgeDialog=e},expression:"badgeDialog"}},[r("div",{staticClass:"help",attrs:{slot:"activator"},slot:"activator"},[r("img",{staticClass:"responsive-img",attrs:{src:n(479),alt:"help"}})]),t._v(" "),r("div",{attrs:{id:"nomination-modal"}},[r("v-card",[r("v-card-title",{staticClass:"pa-0"},[r("div",{staticClass:"cancel clickable",on:{click:function(e){t.badgeDialog=!1}}},[r("img",{staticClass:"responsive-img",attrs:{src:n(456)}})])]),t._v(" "),r("v-card-text",[r("div",{staticClass:"container--flex container--flex-wrap container--flex-justify-center"},t._l(t.badges,(function(b,e){return r("div",{key:e,staticClass:"badge mt-3"},[r("div",{staticClass:"badge-img"},[r("img",{staticClass:"responsive-img",attrs:{src:b.img}})]),t._v(" "),r("p",{staticClass:"mb-0"},[r("strong",{domProps:{innerHTML:t._s(b.title_html)}})]),t._v(" "),r("p",[t._v(t._s(b.description))])])})),0)])],1)],1)])],1),t._v(" "),t._l(t.userAchievements,(function(b,i){return r("div",{key:i,staticClass:"badge"},[b.count>0?r("img",{attrs:{src:b.badge.img,alt:b.badge.title}}):r("img",{attrs:{src:b.badge.img_alt,alt:b.badge.title}}),t._v(" "),r("br"),t._v(" "),r("p",{style:{color:b.count>0?"#000000":"#eaeaea"},domProps:{innerHTML:t._s(b.badge.title_html)}}),t._v(" "),b.count>0?r("div",{staticClass:"badge-count"},[t._v("x"+t._s(b.count))]):t._e()])}))],2),t._v(" "),r("div",{staticClass:"flex-1 prospect-help"},[r("v-dialog",{attrs:{width:"80%"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[r("div",{staticClass:"help",attrs:{slot:"activator"},slot:"activator"},[r("img",{staticClass:"responsive-img",attrs:{src:n(479),alt:"help"}})]),t._v(" "),r("div",{attrs:{id:"prospect-modal"}},[r("v-card",[r("v-card-title",[r("div",{staticClass:"cancel clickable",on:{click:function(e){t.dialog=!1}}},[r("img",{staticClass:"responsive-img",attrs:{src:n(456)}})])]),t._v(" "),r("v-card-text",[r("div",{staticClass:"ranking-tiers container--flex"},t._l(t.rankingTiers,(function(rt,i){return r("div",{key:i,staticClass:"tier flex-1 center"},[r("img",{staticClass:"mb-4",attrs:{src:rt.badge_img,alt:rt.title,width:"150"}}),t._v(" "),r("p",{staticClass:"title mb-2"},[t._v(t._s(rt.title))]),t._v(" "),r("span",{domProps:{innerHTML:t._s(t.displayRange(rt.prospect.min,rt.prospect.max))}})])})),0)])],1)],1)]),t._v(" "),r("div",{staticClass:"prospect-img"},[null!==t.currentProspect?r("img",{staticClass:"responsive-img",attrs:{src:t.currentProspect.img,alt:t.currentProspect.name}}):t._e()]),t._v(" "),r("p",{staticClass:"prospect-text center",staticStyle:{}},[r("strong",[t._v(t._s(t.currentProspect?t.currentProspect.name:""))])]),t._v(" "),r("p",{staticClass:"prospect-text center",staticStyle:{"font-size":"14px"}},[r("strong",[t._v("You have collected a total of "+t._s(t.badgeReceiveCount)+" badges!")])]),t._v(" "),null!==t.nextAchievement.tier?r("p",{staticClass:"center",staticStyle:{color:"#858585","font-size":"14px"}},[r("strong",[t._v("\n          Collect "+t._s(t.$pluralize("more badge",t.nextAchievement.remaining))+' to unlock "'+t._s(t.nextAchievement.tier?t.nextAchievement.tier.name:"")+'" as your Personal Growth Achievement!\n        ')])]):t._e()],1)])])}),[],!1,null,"9a6a0c96",null);e.a=component.exports},713:function(t,e,n){"use strict";var r=n(10),o=n(12);function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}var l={mixins:[n(553).a],computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(o.b)({nominations:"nominations/GET_USER_NOMINATIONS"}))},d=(n(742),n(9)),component=Object(d.a)(l,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"received-messages"}},[e("nomination-list",{attrs:{"is-user-nominations":!0,nominations:this.nominations}})],1)}),[],!1,null,"661d197f",null);e.a=component.exports},736:function(t,e,n){"use strict";n(566)},737:function(t,e,n){(e=n(2)(!1)).push([t.i,"#transaction-history-modal-wrapper .cart-link{text-align:center;display:block;padding:20px 10px;font-size:14px;font-weight:700;margin:4px 0;color:#000}#transaction-history-modal-wrapper .cart-link .icon{width:20px;height:20px;margin:3px auto;background-repeat:no-repeat;background-position:50%;background-image:url(/img/icons/transactions-ico.svg)}#transaction-history-modal-wrapper .cart-link:hover{color:#fff;background-color:#757575}#transaction-history-modal-wrapper .cart-link:hover .icon{background-image:url(/img/icons/transactions-ico-alt.svg)}#transaction-history-modal table{width:100%}#transaction-history-modal table th{font-weight:200;padding-bottom:5px}#transaction-history-modal table tr:first-child td{border-top:2px solid #000;padding-top:20px}",""]),t.exports=e},738:function(t,e,n){"use strict";n(567)},739:function(t,e,n){(e=n(2)(!1)).push([t.i,"#profile-summary u[data-v-12204a58]{font-size:12px}#profile-summary .user-profile-details[data-v-12204a58]{padding-bottom:125px}#profile-summary .name[data-v-12204a58]{text-transform:capitalize;font-weight:700;font-size:20px;max-width:170px;margin:25px auto 0;word-break:break-word}#profile-summary .content[data-v-12204a58]{min-height:300px}#profile-summary .avatar[data-v-12204a58]{width:100px;height:100px;padding:8px;overflow:hidden;position:relative}#profile-summary .avatar img[data-v-12204a58]{position:absolute;left:0;right:0;top:0;bottom:0}#profile-summary .received[data-v-12204a58],#profile-summary .sent[data-v-12204a58]{border-top:1px solid #000}#profile-summary .received p[data-v-12204a58],#profile-summary .sent p[data-v-12204a58]{font-size:13px;margin:16px 0}#profile-summary .received span[data-v-12204a58],#profile-summary .sent span[data-v-12204a58]{font-size:30px;font-weight:200}#profile-summary .sent[data-v-12204a58]{border-right:1px solid #000}#profile-summary .sent span[data-v-12204a58]{color:#000}#profile-summary .received span[data-v-12204a58]{color:#87bb25}#profile-summary .badges-summary[data-v-12204a58]{left:0;bottom:0;right:0;position:absolute;z-index:1;min-height:100px;margin:auto auto 20px;width:80%}",""]),t.exports=e},740:function(t,e,n){"use strict";n(568)},741:function(t,e,n){(e=n(2)(!1)).push([t.i,"@media only screen and (max-width:600px){#achievement-summary .achievement-summary-content[data-v-9a6a0c96]{display:block}}#achievement-summary .help-btn[data-v-9a6a0c96]{position:absolute;right:16px;top:0;width:20px}#achievement-summary span[data-v-9a6a0c96]{font-size:16px}@media only screen and (max-width:992px){#achievement-summary .container--flex[data-v-9a6a0c96]{flex:3}}#achievement-summary .prospect-help[data-v-9a6a0c96]{position:relative;border-left:1px solid #eaeaea}@media only screen and (max-width:600px){#achievement-summary .prospect-help[data-v-9a6a0c96]{border-left:none}}#achievement-summary .prospect-help .help[data-v-9a6a0c96]{position:absolute;width:20px;right:90px}#achievement-summary .prospect-text[data-v-9a6a0c96]{color:#4a4a4a}#achievement-summary .prospect-img[data-v-9a6a0c96]{width:50%;min-width:185px;margin:auto auto 15px;min-height:130px}#achievement-summary .badge[data-v-9a6a0c96]{width:120px;height:130px;padding:0;margin:10px 20px 40px;position:relative}@media only screen and (max-width:600px){#achievement-summary .badge[data-v-9a6a0c96]{margin:10px 14px 40px}}@media only screen and (max-width:320px){#achievement-summary .badge[data-v-9a6a0c96]{margin:10px 7px 40px}}@media only screen and (max-width:1024px){#achievement-summary .badge[data-v-9a6a0c96]{margin:10px 14px 40px}}#achievement-summary .badge p[data-v-9a6a0c96]{font-size:11px;font-weight:700;margin-top:8px}#achievement-summary .badge img[data-v-9a6a0c96]{height:inherit}#achievement-summary .badge-count[data-v-9a6a0c96]{top:0;left:auto;bottom:auto;right:-10px;position:absolute;z-index:1;margin:auto;display:flex;justify-content:center;align-items:center;height:38px;width:38px;background:#000;color:#fff;border-radius:90%;font-weight:700}#prospect-modal[data-v-9a6a0c96]{margin:auto}#prospect-modal .v-card__text[data-v-9a6a0c96]{padding:24px 16px}@media screen and (max-width:1024px){#prospect-modal .v-card__text[data-v-9a6a0c96]{overflow:auto!important;height:45vh!important;padding-top:0!important}}@media screen and (max-width:1024px){#prospect-modal .ranking-tiers[data-v-9a6a0c96]{display:inherit}}#prospect-modal .ranking-tiers .tier[data-v-9a6a0c96]{margin-bottom:10px}#prospect-modal .ranking-tiers .prospects .prospect[data-v-9a6a0c96]{text-align:center;text-transform:uppercase;line-height:24px;padding:8px 8px 14px}#prospect-modal .ranking-tiers .prospects .prospect p[data-v-9a6a0c96]{font-size:30px;letter-spacing:-1px;font-weight:700;letter-spacing:-2px;margin-bottom:0}#prospect-modal .ranking-tiers .prospects .prospect small[data-v-9a6a0c96]{font-weight:700;font-size:10px;line-height:10px}#prospect-modal .ranking-tiers .prospects .prospect[data-v-9a6a0c96]:last-child{color:#86bc25;background:#eee}@media screen and (max-width:1300px){#nomination-modal .v-card__text[data-v-9a6a0c96]{overflow:auto!important;height:45vh!important;padding-top:0!important}}#nomination-modal .badge[data-v-9a6a0c96]{text-align:center;width:18%;margin:0 26px}@media screen and (max-width:1300px){#nomination-modal .badge[data-v-9a6a0c96]{width:inherit}}#nomination-modal .badge .badge-img[data-v-9a6a0c96]{max-width:110px;margin:auto}",""]),t.exports=e},742:function(t,e,n){"use strict";n(570)},743:function(t,e,n){(e=n(2)(!1)).push([t.i,"#received-messages .greeting[data-v-661d197f]{font-size:2rem;font-weight:200;padding:16px 6px}#received-messages #filter[data-v-661d197f]{margin:auto}",""]),t.exports=e}}]);