(window.webpackJsonp=window.webpackJsonp||[]).push([[58],{1111:function(e,t,n){"use strict";n(704)},1112:function(e,t,n){(t=n(2)(!1)).push([e.i,".controls[data-v-e5cf7192]{position:fixed;bottom:0;right:21px}.gren-token-input[data-v-e5cf7192]{width:60px;border:1px solid #9e9e9e;margin-left:10px;font-size:15px;padding:5px;height:40px}",""]),e.exports=t},1183:function(e,t,n){"use strict";n.r(t);n(28),n(186),n(35),n(33),n(48),n(430),n(13),n(34),n(116),n(47);var r=n(10),o=(n(14),n(4)),c=n(424);function l(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function d(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var v={ADD:1,MINUS:2},h={mixins:[c.a],mounted:function(){var e=this;this.getDataFromApi().then((function(t){e.users=t.items,e.usersCopy=JSON.parse(JSON.stringify(t.items)),e.table.totalItems=t.totalItems}))},data:function(){return{TOKEN_OPTIONS:v,table:{headers:[{text:"Name",value:"name",sortable:!0},{text:"Department",value:"department_name",sortable:!0},{text:"Designation",value:"position_name",sortable:!0},{text:"Career level",value:"career_level",sortable:!0},{text:"My Rewards Token",value:"green_token",align:"center",width:"20px",sortable:!0},{text:"*Remarks",value:"remarks",sortable:!1}],page:1,totalItems:0,isLoading:!1},pagination:{},users:[],usersCopy:[],updateSelection:[],currentEditedUser:null,searchTimeOut:null,searchFilter:"",search:null,dialog:!1,editDialog:!1,isSaving:!1}},methods:{showConfirmation:function(){this.dialog=!0},doUpdate:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:({title:"Save confirmation",buttonTrueText:"Submit",buttonFalseText:"Cancel",buttonFalseColor:"red",buttonTrueColor:"light-green lighten-1",color:"black",icon:""}),n={users:e.updateSelection.map((function(s){var e=s.green_token;return s.green_token_option===v.ADD?e+=Number(s.green_token_add):e-=Number(s.green_token_add),{id:s.id,green_token:e,remarks:s.remarks}}))},e.isSaving=!0,e.$axios.put("/admin/users",n).then((function(t){var n=t.data;for(var r in n)e.$toast.success(n[r]);e.closeDialog(),e.resetSelection()})).finally((function(){e.isSaving=!1,e.getDataFromApi().then((function(t){e.users=t.items,e.usersCopy=JSON.parse(JSON.stringify(t.items))}))}));case 4:case"end":return t.stop()}}),t)})))()},getDataFromApi:function(){var e=this;return this.table.isLoading=!0,new Promise((function(t,n){var r=e.pagination,o=r.sortBy,c=r.descending,l=r.page,v=r.rowsPerPage,h={page:l};-1===v?h.paginate=0:h.rpp=v||5,o&&(h.sort="".concat(o,":").concat(c?"desc":"asc")),e.search&&(h.search=e.search),e.$axios.get(e.$queryBuilder("/admin/users",h)).then((function(n){var r=n.data.data;-1===v&&(r=n.data),t({items:r.map((function(i){var t=e.getFromSelection(i.id);return d(d({},i),{},{remarks:t?t.remarks:"",green_token:t?t.green_token:Number(i.green_token),green_token_add:t?t.green_token_add:null,green_token_option:t?t.green_token_option:0})})),totalItems:n.data.total})})).catch((function(e){n(e.response)})).finally((function(){e.table.isLoading=!1}))}))},resetSelection:function(){this.users=JSON.parse(JSON.stringify(this.usersCopy)),this.updateSelection=[]},updateToken:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=this.users.findIndex((function(u){return u.id===e}));n>=0&&(t?this.users[n].green_token_add+=5:this.users[n].green_token_add-5<0?this.users[n].green_token_add=0:this.users[n].green_token_add-=5)},isExistingOnSelection:function(e){return-1!==this.updateSelection.findIndex((function(u){return u.id===e}))},addOrUpdateToSelection:function(e){if(this.isExistingOnSelection(e.id)){var t=this.updateSelection.findIndex((function(u){return u.id===e.id}));this.updateSelection[t]=Object.assign({},e)}else this.updateSelection.push(e)},removeFromSelection:function(e){var t=this.updateSelection.findIndex((function(u){return u.id===e}));t>=0&&this.updateSelection.splice(t,1)},getFromSelection:function(e){return this.updateSelection.find((function(u){return u.id===e}))},hasFieldChanges:function(e){return this.usersCopy[e].green_token_add!==this.users[e].green_token_add||this.usersCopy[e].green_token_option!==this.users[e].green_token_option||this.usersCopy[e].remarks!==this.users[e].remarks},isFieldChangesCompleted:function(e){return 0!=this.users[e].green_token_add&&null!==this.users[e].green_token_add&&0!==this.users[e].green_token_option&&this.users[e].remarks.length>0},setTokenOption:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:v.ADD,n=this.users[e];this.isDisabled(n.id)||(this.users[e].green_token_option=t)},isCurrentEdited:function(e){return null!==this.currentEditedUser&&this.currentEditedUser.id===e},isDisabled:function(e){var t=!1;return null!==this.currentEditedUser&&this.currentEditedUser.id!==e&&(t=!0),t},closeDialog:function(){this.dialog=!1},undoEdit:function(e){var t=this.users.findIndex((function(u){return u.id===e})),n=this.usersCopy.findIndex((function(u){return u.id===e}));this.currentEditedUser=null,this.users[t].remarks=this.usersCopy[n].remarks,this.users[t].green_token_add=this.usersCopy[n].green_token_add,this.users[t].green_token_option=this.usersCopy[n].green_token_option},clickRow:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;null!==this.currentEditedUser&&(this.isCurrentEdited(e)||(this.editDialog=!0))}},computed:{selected:function(){for(var i=0,e=this.users.length;i<e;++i){var t=this.users[i].id;this.hasFieldChanges(i)&&(this.isFieldChangesCompleted(i)?(this.addOrUpdateToSelection(this.users[i]),this.currentEditedUser=null):(this.isExistingOnSelection(t)&&this.removeFromSelection(t),this.currentEditedUser=Object.assign({},this.users[i])))}return!0}},watch:{pagination:{handler:function(e,t){var n=this;null===this.currentEditedUser?this.getDataFromApi().then((function(e){n.users=e.items,n.usersCopy=JSON.parse(JSON.stringify(e.items)),n.table.totalItems=e.totalItems})):this.$toast.error("You have unsaved changes. Please save or discard them.")},deep:!0},searchFilter:function(e){var t=this;this.searchTimeOut&&clearTimeout(this.searchTimeOut),this.searchTimeOut=setTimeout((function(){null===t.currentEditedUser?t.searchFilter.length>=3?t.search=t.searchFilter:t.search=null:t.$toast.error("You have unsaved changes. Please save or discard them.")}),300)}}},_=(n(1111),n(9)),component=Object(_.a)(h,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.selected?n("div",{attrs:{id:"users-page"}},[n("div",{staticClass:"container no-padding"},[n("v-toolbar",{attrs:{flat:"",color:"white"}},[n("v-toolbar-title",[e._v("User My Rewards Token")]),e._v(" "),n("v-divider",{staticClass:"mx-2",attrs:{inset:"",vertical:""}}),e._v(" "),n("v-spacer"),e._v(" "),n("v-text-field",{staticClass:"pt-0",attrs:{"append-icon":"search",label:"Search",color:"light-green lighten-1","single-line":"","hide-details":""},model:{value:e.searchFilter,callback:function(t){e.searchFilter=t},expression:"searchFilter"}})],1),e._v(" "),n("v-data-table",{attrs:{headers:e.table.headers,items:e.users,search:e.search,loading:e.table.isLoading,pagination:e.pagination,"total-items":e.table.totalItems,"item-key":"id"},on:{"update:pagination":function(t){e.pagination=t}},scopedSlots:e._u([{key:"items",fn:function(t){return[n("tr",{class:{"grey--text":null!==e.currentEditedUser&&e.currentEditedUser.id!==t.item.id},on:{click:function(n){return e.clickRow(t.item.id)}}},[n("td",[n("h3",[e._v(e._s(t.item.name))]),e._v(" "),n("p",[e._v(e._s(t.item.email))])]),e._v(" "),n("td",[n("h3",[e._v(e._s(t.item.department_name))])]),e._v(" "),n("td",[n("h3",[e._v(e._s(t.item.position_name))])]),e._v(" "),n("td",[n("h3",[e._v(e._s(t.item.career_level))])]),e._v(" "),n("td",[n("div",{staticClass:"credit-wrapper container--flex container--flex-align-item-center"},[n("span",{staticStyle:{width:"30px"}},[e._v(e._s(t.item.green_token))]),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.item.green_token_add,expression:"props.item.green_token_add"}],staticClass:"gren-token-input",attrs:{type:"number",name:"ken",min:"0",placeholder:"0",disabled:e.isDisabled(t.item.id)},domProps:{value:t.item.green_token_add},on:{input:function(n){n.target.composing||e.$set(t.item,"green_token_add",n.target.value)}}}),e._v(" "),n("v-tooltip",{attrs:{top:""}},[n("v-icon",{staticClass:"m-sm-horizontal",class:{"grey--text":0===t.item.green_token_option||e.isDisabled(t.item.id),"black--text":t.item.green_token_option!==e.TOKEN_OPTIONS.ADD&&!e.isDisabled(t.item.id),"green--text":t.item.green_token_option===e.TOKEN_OPTIONS.ADD&&!e.isDisabled(t.item.id)},attrs:{slot:"activator"},on:{click:function(n){return e.setTokenOption(t.index)}},slot:"activator"},[e._v("add_circle")]),e._v(" "),n("span",{staticClass:"uppercase"},[e._v("Add Token")])],1),e._v(" "),n("v-tooltip",{attrs:{top:""}},[n("v-icon",{class:{"grey--text":0===t.item.green_token_option||e.isDisabled(t.item.id),"black--text":t.item.green_token_option!==e.TOKEN_OPTIONS.MINUS&&!e.isDisabled(t.item.id),"red--text":t.item.green_token_option===e.TOKEN_OPTIONS.MINUS&&!e.isDisabled(t.item.id)},attrs:{slot:"activator"},on:{click:function(n){return e.setTokenOption(t.index,e.TOKEN_OPTIONS.MINUS)}},slot:"activator"},[e._v("remove_circle")]),e._v(" "),n("span",{staticClass:"uppercase"},[e._v("Reduce Token")])],1)],1)]),e._v(" "),n("td",{staticClass:"container--flex container--flex-align-item-center"},[n("v-text-field",{staticClass:"mr-3",attrs:{color:"light-green lighten-1",placeholder:"Required",disabled:e.isDisabled(t.item.id)},model:{value:t.item.remarks,callback:function(n){e.$set(t.item,"remarks",n)},expression:"props.item.remarks"}}),e._v(" "),n("div",{staticStyle:{width:"77.250px"}},[n("v-tooltip",{attrs:{top:""}},[n("v-icon",{directives:[{name:"show",rawName:"v-show",value:e.isCurrentEdited(t.item.id),expression:"isCurrentEdited(props.item.id)"}],staticClass:"m-sm-horizontal black--text",attrs:{slot:"activator"},on:{click:function(n){return e.undoEdit(t.item.id)}},slot:"activator"},[e._v("cancel")]),e._v(" "),n("span",{staticClass:"uppercase"},[e._v("Undo")])],1)],1)],1)])]}}],null,!1,3805940043)},[e._v(" "),n("v-alert",{attrs:{slot:"no-results",value:!0,color:"error",icon:"warning"},slot:"no-results"},[e._v('Your search for "'+e._s(e.search)+'" found no results.')])],1),e._v(" "),n("v-dialog",{attrs:{"max-width":"500px",width:"500px"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[n("v-toolbar",{attrs:{dark:"",dense:""}},[n("v-toolbar-title",{staticStyle:{"text-align":"left"},attrs:{dark:""}},[e._v("Save confirmation")])],1),e._v(" "),n("v-card",[n("v-card-text",{staticStyle:{padding:"25px"}},[n("p",{staticClass:"mb-0"},[n("strong",[e._v("You are about to save changes of the following:")])]),e._v(" "),n("ul",e._l(e.updateSelection,(function(i,t){return n("li",{key:t},[e._v(e._s(i.name)+" ("+e._s(i.green_token_option===e.TOKEN_OPTIONS.ADD?"+":"-")+e._s(e.$pluralize("token",i.green_token_add))+")")])})),0)]),e._v(" "),n("v-card-actions",[n("v-spacer"),e._v(" "),n("v-btn",{attrs:{type:"button",color:"grey",dark:""},on:{click:function(t){return t.preventDefault(),e.closeDialog()}}},[e._v("Back")]),e._v(" "),n("v-btn",{attrs:{loading:e.isSaving,type:"button",color:"light-green lighten-1",dark:""},on:{click:function(t){return t.preventDefault(),e.doUpdate()}}},[e._v("Proceed")]),e._v(" \n        ")],1)],1)],1),e._v(" "),n("v-dialog",{attrs:{"max-width":"500px",width:"500px"},model:{value:e.editDialog,callback:function(t){e.editDialog=t},expression:"editDialog"}},[n("v-toolbar",{attrs:{dark:"",dense:""}},[n("v-toolbar-title",{staticStyle:{"text-align":"left"},attrs:{dark:""}},[e._v("OOPS!")])],1),e._v(" "),n("v-card",[n("v-card-text",{staticStyle:{padding:"25px"}},[n("p",{staticClass:"mb-0"},[n("strong",[e._v("\n              Looks like you've left some necessary field(s) empty. Please complete all the necessary\n              field(s) before moving on the next item.\n            ")])])]),e._v(" "),n("v-card-actions",[n("v-spacer"),e._v(" "),n("v-btn",{attrs:{flat:"",color:"grey",dark:""},on:{click:function(t){t.preventDefault(),e.editDialog=!1}}},[e._v("Back")])],1)],1)],1),e._v(" "),e.updateSelection.length>0&&null===e.currentEditedUser?n("div",{staticClass:"controls m-lg-vertical right"},[n("v-btn",{attrs:{dark:"",disabled:0===e.updateSelection.length},on:{click:function(t){return e.showConfirmation()}}},[e._v("Review")]),e._v(" "),n("v-btn",{attrs:{dark:"",disabled:0===e.updateSelection.length},on:{click:function(t){return e.resetSelection()}}},[e._v("Cancel")])],1):e._e()],1)]):e._e()}),[],!1,null,"e5cf7192",null);t.default=component.exports},424:function(e,t,n){"use strict";n(14);var r=n(4);t.a={middleware:"authenticated",layout:"admin",asyncData:function(e){return Object(r.a)(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.store,r=e.error,t.next=3,n.dispatch("session/fetchUserProfile");case 3:return t.next=5,n.getters["session/IS_ADMIN"];case 5:t.sent||r({statusCode:404,message:"Page not found"});case 7:case"end":return t.stop()}}),t)})))()}}},430:function(e,t,n){"use strict";var r=n(19),o=n(6),c=n(76),l=n(24),d=n(21),v=n(37),h=n(188),_=n(74),m=n(8),f=n(115),k=n(114).f,x=n(58).f,S=n(23).f,O=n(431).trim,y=o.Number,N=y.prototype,C="Number"==v(f(N)),E=function(e){var t,n,r,o,c,l,d,code,v=_(e,!1);if("string"==typeof v&&v.length>2)if(43===(t=(v=O(v)).charCodeAt(0))||45===t){if(88===(n=v.charCodeAt(2))||120===n)return NaN}else if(48===t){switch(v.charCodeAt(1)){case 66:case 98:r=2,o=49;break;case 79:case 111:r=8,o=55;break;default:return+v}for(l=(c=v.slice(2)).length,d=0;d<l;d++)if((code=c.charCodeAt(d))<48||code>o)return NaN;return parseInt(c,r)}return+v};if(c("Number",!y(" 0o1")||!y("0b1")||y("+0x1"))){for(var D,w=function(e){var t=arguments.length<1?0:e,n=this;return n instanceof w&&(C?m((function(){N.valueOf.call(n)})):"Number"!=v(n))?h(new y(E(t)),n,w):E(t)},I=r?k(y):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),T=0;I.length>T;T++)d(y,D=I[T])&&!d(w,D)&&S(w,D,x(y,D));w.prototype=N,N.constructor=w,l(o,"Number",w)}},431:function(e,t,n){var r=n(22),o="["+n(432)+"]",c=RegExp("^"+o+o+"*"),l=RegExp(o+o+"*$"),d=function(e){return function(t){var n=String(r(t));return 1&e&&(n=n.replace(c,"")),2&e&&(n=n.replace(l,"")),n}};e.exports={start:d(1),end:d(2),trim:d(3)}},432:function(e,t){e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},704:function(e,t,n){var content=n(1112);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(3).default)("0df9dcec",content,!0,{sourceMap:!1})}}]);