(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{1151:function(t,e,r){"use strict";r.r(e);r(20),r(13);var n=r(10),o=(r(14),r(4)),d=r(424),c=(r(425),r(427),r(478)),l=r(12),v=r(0),m=r(434),f=r.n(m),h=r(436);function y(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}var _=r(44);v.default.use(f.a);var w={head:function(){return{script:[],link:[]}},components:{Faq:c.a},data:function(){return{submitted:!1,id:null,categories:[],dbSelect:null,dbOptions:[],form_value:null,form_id:null,errors:[]}},validations:{form_value:{required:h.required}},created:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return{headers:{Accept:"application/json"}},e.prev=1,e.next=4,_.get("https://deloitte-backend.nmgdev.com/api/faqcategories-search",{headers:{Accept:"application/json"},params:{id:t.$route.params.id}});case 4:r=e.sent,t.form_value=r.data[0].value,t.form_id=r.data[0].id,e.next=11;break;case 9:e.prev=9,e.t0=e.catch(1);case 11:case"end":return e.stop()}}),e,null,[[1,9]])})))()},mixins:[d.a],mounted:function(){},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?y(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):y(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(l.b)({profile:"session/GET_PROFILE"})),watch:{},methods:{save:function(){console.log(this.editorData)},onSubmit:function(){var t=this;if(this.form_value){this.submitted=!0;var e=this.profile.id,r=this.profile.name,n=new FormData;n.append("value",this.form_value),n.append("profile_id",e),n.append("name",r),this.$toast.success("Please wait"),this.$axios.post("/create-faqcategories-item",n).then((function(e){t.$toast.success("Create Category is done"),t.submitted=!1,window.location="/a/cms/faqcategories"})).catch((function(e){t.submitted=!1})).finally((function(){}))}else this.errors.length=0,this.form_value||(this.$toast.success("Title is required."),this.errors.push("Title is required."))}}},x=(r(804),r(806),r(9)),component=Object(x.a)(w,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"cms-page"}},[r("div",{staticClass:"container no-padding"},[r("v-toolbar",{staticClass:"pt-4",attrs:{flat:"",color:"white"}},[r("v-toolbar-title",[t._v("FAQ")]),t._v(" "),r("v-divider",{staticClass:"mx-2",attrs:{inset:"",vertical:""}}),t._v(" "),r("v-spacer"),t._v(" "),r("div",{staticClass:"container--flex container--flex-align-item-center"})],1),t._v(" "),r("div",{staticClass:"container no-padding",staticStyle:{"background-color":"white"}},[r("v-container",{attrs:{fluid:""}},[r("div",[r("nuxt-link",{attrs:{to:{name:"a-cms-faqcategories"}}},[t._v("Go Back")]),t._v(" "),r("form",{staticClass:"review-form",attrs:{name:"editfaq"},on:{submit:function(e){return e.preventDefault(),t.onSubmit(e)}}},[r("div",{staticClass:"faq col-md-12"},[r("div",[t._v("Edit FAQ Categories")])]),t._v(" "),r("div",{staticClass:"form-group"},[r("v-text-field",{attrs:{label:"Category"},on:{blur:function(e){return t.$v.form_value.$touch()}},model:{value:t.form_value,callback:function(e){t.form_value=e},expression:"form_value"}})],1),t._v(" "),t.$v.form_value.$error?[t.$v.form_value.required?t._e():r("p",{staticClass:"errorMessage"},[t._v("Title is required.")])]:t._e(),t._v(" "),r("v-btn",{attrs:{color:"success",disable:t.$v.$invalid,disabled:t.submitted}},[r("input",{attrs:{type:"submit",value:"Submit"}})])],2)],1)])],1),t._v(" "),r("div",{staticClass:"controls m-lg-vertical"})],1)])}),[],!1,null,"59b0d757",null);e.default=component.exports},424:function(t,e,r){"use strict";r(14);var n=r(4);e.a={middleware:"authenticated",layout:"admin",asyncData:function(t){return Object(n.a)(regeneratorRuntime.mark((function e(){var r,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.store,n=t.error,e.next=3,r.dispatch("session/fetchUserProfile");case 3:return e.next=5,r.getters["session/IS_ADMIN"];case 5:e.sent||n({statusCode:404,message:"Page not found"});case 7:case"end":return e.stop()}}),e)})))()}}},425:function(t,e,r){"use strict";e.a={methods:{formatDate:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"DD MMM YYYY";return t?this.$moment(t).format(e):""},resetDateSelection:function(){this.dateFrom="",this.dateTo="",this.dateFromFormatted="",this.dateToFormatted=""}},watch:{dateTo:function(t){this.dateToFormatted=this.formatDate(this.dateTo)},dateFrom:function(t){this.dateFromFormatted=this.formatDate(this.dateFrom)}},computed:{hasDateSelected:function(){return this.dateFrom.length>0||this.dateTo.length>0}},data:function(){return{dateFrom:"",dateFromFormatted:"",dateTo:"",dateToFormatted:"",menuFrom:!1,menuTo:!1}}}},427:function(t,e,r){"use strict";r(13);var n=r(426);e.a={methods:{downloadExcel:function(){var t=this;this.isDownloading||(this.isDownloading=!0,this.$axios.get("".concat(this.currentDownloadCSVURL,"&download=1"),{responseType:"blob"}).then((function(t){n(t.data,"reports.xlsx")})).catch((function(e){t.$toast.error(e.response.data.message)})).finally((function(){t.isDownloading=!1})))}},data:function(){return{currentDownloadCSVURL:"",isDownloading:!1}}}},478:function(t,e,r){"use strict";var n={methods:{recreatelog:function(){var t;(t=console).log.apply(t,arguments)}}},o=(r(44),{name:"Faq",mixins:[n],props:["id","categoryname","value","datecreate"],methods:{fireDelete:function(t){this.l(t)}}}),d=r(9),component=Object(d.a)(o,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("tr",{attrs:{id:t.id}},[t._m(0),t._v(" "),r("td",[t._v(t._s(t.categoryname))]),t._v(" "),r("td",[t._v(t._s(t.value))]),t._v(" "),t._m(1),t._v(" "),r("td",[r("button",{staticClass:"btn btn-danger",on:{click:function(e){return t.fireDelete(t.id)}}},[t._v("Delete")])]),t._v(" "),r("td",[t._v(t._s(t.datecreate))]),t._v(" "),r("input",{attrs:{type:"hidden",value:"",id:"item",name:"item"}})])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("td",[e("input",{staticClass:"sub_chk",attrs:{type:"checkbox","data-id":""}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("td",[e("a",{staticClass:"btn btn-primary",attrs:{href:"/edit"}},[this._v("Edit")])])}],!1,null,null,null);e.a=component.exports},591:function(t,e,r){var content=r(805);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(3).default)("6cfdec76",content,!0,{sourceMap:!1})},592:function(t,e,r){var content=r(807);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(3).default)("1b37658e",content,!0,{sourceMap:!1})},804:function(t,e,r){"use strict";r(591)},805:function(t,e,r){(e=r(2)(!1)).push([t.i,".errorMessage[data-v-59b0d757]{color:red}",""]),t.exports=e},806:function(t,e,r){"use strict";r(592)},807:function(t,e,r){(e=r(2)(!1)).push([t.i,"#user-transactions-page .container[data-v-59b0d757]{margin:0 auto;max-width:1366px;width:98vw;padding-top:0;padding-bottom:0}.print-only[data-v-59b0d757]{padding:25px 0}.print-only table[data-v-59b0d757]{page-break-inside:auto}.print-only tr[data-v-59b0d757]{page-break-inside:avoid;page-break-after:auto}.print-only .item-list[data-v-59b0d757]{margin:0 auto!important;max-width:1366px!important;width:96vw!important;position:relative;display:block}.print-only .print-header[data-v-59b0d757],.print-only .print-total-tokens[data-v-59b0d757]{display:block!important}.print-only .v-toolbar[data-v-59b0d757]{display:none}.print-only .white--text[data-v-59b0d757]{color:#fff!important;caret-color:#fff!important}.print-only .black[data-v-59b0d757]{background-color:#000!important;border-color:#000!important}.print-only .item-list[data-v-59b0d757],.print-only .order-number[data-v-59b0d757]{display:block}.print-only .order-number[data-v-59b0d757]{font-weight:700}.print-only .cart-items table[data-v-59b0d757]{border-collapse:collapse}.print-only .cart-items tr[data-v-59b0d757]{background-color:#fff}.print-only .cart-items td[data-v-59b0d757],.print-only .cart-items th[data-v-59b0d757]{border:10px solid #e0e0e0;border-width:10px 0}.print-only .computation[data-v-59b0d757]{display:none}.print-only .v-dialog--fullscreen>.v-card[data-v-59b0d757]{background-color:#e0e0e0;width:100%}.print-only .v-dialog--fullscreen .v-card__text[data-v-59b0d757]{padding-top:20px!important}.print-only .layout--admin #navbar[data-v-59b0d757],.print-only .layout--admin .application--wrap[data-v-59b0d757],.print-only .layout--admin>footer[data-v-59b0d757],.print-only .layout--admin>header[data-v-59b0d757]{display:none}",""]),t.exports=e}}]);