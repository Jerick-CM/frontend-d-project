(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{1077:function(e,t,n){"use strict";n(687)},1078:function(e,t,n){(t=n(2)(!1)).push([e.i,".ck-editor__editable[data-v-2b81a0ce]{min-height:500px}.errorMessage[data-v-2b81a0ce]{color:red}.white-font[data-v-2b81a0ce]{color:#fff}.red-font[data-v-2b81a0ce]{color:red}table.preview[data-v-2b81a0ce]{border:1px solid #000}",""]),e.exports=t},1079:function(e,t,n){"use strict";n(688)},1080:function(e,t,n){(t=n(2)(!1)).push([e.i,"#user-transactions-page .container[data-v-2b81a0ce]{margin:0 auto;max-width:1366px;width:98vw;padding-top:0;padding-bottom:0}.print-only[data-v-2b81a0ce]{padding:25px 0}.print-only table[data-v-2b81a0ce]{page-break-inside:auto}.print-only tr[data-v-2b81a0ce]{page-break-inside:avoid;page-break-after:auto}.print-only .item-list[data-v-2b81a0ce]{margin:0 auto!important;max-width:1366px!important;width:96vw!important;position:relative;display:block}.print-only .print-header[data-v-2b81a0ce],.print-only .print-total-tokens[data-v-2b81a0ce]{display:block!important}.print-only .v-toolbar[data-v-2b81a0ce]{display:none}.print-only .white--text[data-v-2b81a0ce]{color:#fff!important;caret-color:#fff!important}.print-only .black[data-v-2b81a0ce]{background-color:#000!important;border-color:#000!important}.print-only .item-list[data-v-2b81a0ce],.print-only .order-number[data-v-2b81a0ce]{display:block}.print-only .order-number[data-v-2b81a0ce]{font-weight:700}.print-only .cart-items table[data-v-2b81a0ce]{border-collapse:collapse}.print-only .cart-items tr[data-v-2b81a0ce]{background-color:#fff}.print-only .cart-items td[data-v-2b81a0ce],.print-only .cart-items th[data-v-2b81a0ce]{border:10px solid #e0e0e0;border-width:10px 0}.print-only .computation[data-v-2b81a0ce]{display:none}.print-only .v-dialog--fullscreen>.v-card[data-v-2b81a0ce]{background-color:#e0e0e0;width:100%}.print-only .v-dialog--fullscreen .v-card__text[data-v-2b81a0ce]{padding-top:20px!important}.print-only .layout--admin #navbar[data-v-2b81a0ce],.print-only .layout--admin .application--wrap[data-v-2b81a0ce],.print-only .layout--admin>footer[data-v-2b81a0ce],.print-only .layout--admin>header[data-v-2b81a0ce]{display:none}",""]),e.exports=t},1168:function(e,t,n){"use strict";n.r(t);n(186),n(45),n(189),n(20),n(13),n(36),n(46),n(75),n(464);var r=n(10),o=(n(14),n(4)),l=n(424),c=(n(425),n(427),n(12)),d=n(0),m=n(434),h=n.n(m),f=n(436),v=n(481),_=n.n(v),k=n(454);function w(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}n(44);var x="https://deloitte-backend.nmgdev.com";d.default.use(h.a);var y={head:function(){return{script:[],link:[]}},components:{"ckeditor-nuxt":function(){return n.e(1).then(n.t.bind(null,1127,7))}},data:function(){return{token:null,editorConfig:[],submitted:!1,id:null,dbSelect:null,dbOptions:[],form_id:null,form_label:null,form_title:null,form_subject:null,form_content:"",form_locationdate:"Singapore | {{date}}",errors:[],image1previewstore:"img/edm/main-banner.jpg",image2previewstore:"img/edm/welcome_banner_default.jpg",image1preview:"",image2preview:"",image1:"img/edm/main-banner.jpg",image2:"img/edm/welcome_banner_default.jpg",href1:"https://www.deloitte.com/",href2:"https://www.deloitte.com/",dialog:!1,edmID:10,previewTemplate:"",emails:"",comboBoxDisabled:!1,filename:"",items:[""],disableSendEmail:!0}},validations:{form_label:{required:f.required},form_title:{required:f.required},form_subject:{required:f.required},form_content:{required:f.required}},mounted:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){var n,data;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$axios.get("/users",{params:{page:1,paginate:0,sort:"name:asc",blast:1}});case 2:n=t.sent,data=n.data,e.items=data,console.log(data);case 6:case"end":return t.stop()}}),t)})))()},created:function(){var e=this;return Object(o.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.url=x,e.token=e.sessionToken,e.timezone="Asia/Singapore",e.id=e.$route.query.edit,e.editorConfig={simpleUpload:{uploadUrl:x+"/api/edm-header/ckeditor",headers:{Accept:"application/json",Timezone:e.timezone,Authorization:"Bearer "+e.token}}},{headers:{Accept:"application/json"}};case 6:case"end":return t.stop()}}),t)})))()},mixins:[l.a],computed:function(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?w(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):w(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}({},Object(c.b)({profile:"session/GET_PROFILE",sessionToken:"session/GET_TOKEN"})),methods:{fireSendEmail:function(){var e=this,t=this.comboBoxDisabled,n=null,r=[],l=new FormData;this.submitted=!0,t?(n=this.$refs.fileInput.files[0],l.append("emailFile",n)):(this.emails.forEach((function(e,t){r.push(e.email)})),l.append("emails",r)),this.$axios.post("/admin/edm/send_blast/"+this.id,l,{headers:{"Content-Type":"multipart/form-data"}}).then(function(){var t=Object(o.a)(regeneratorRuntime.mark((function t(n){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.submitted=!1,e.$toast.success("Send sent success fully.");case 2:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()).catch((function(t){e.$toast.error("Email sending error."),e.submitted=!1})).finally((function(){}))},onPickFile:function(){this.$refs.fileInput.value=null,this.$refs.fileInput.click()},onFilePicked:function(e){var t=e.target.files;void 0!==t[0]?(this.filename=t[0].name,this.filenameSelected=!0,Papa.parse(t[0],{complete:this.applyCsv})):(this.comboBoxDisabled=!1,this.fileName="",this.filenameSelected=!1)},applyCsv:function(e,t){var n=this;return Object(o.a)(regeneratorRuntime.mark((function t(){var r,o,l,c,i,d;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(r=n.emails,o=[],l=[],c=[],r||(r=[]),i=e.data.length-1;i>=0;i--)e.data[i][0]&&((d=n.items.find((function(element){return element.email==e.data[i][0]})))?r.length&&r.find((function(element){return element.email==e.data[i][0]}))?l.push(e.data[i][0]):(r.push(d),o.push(e.data[i][0])):c.push(e.data[i][0]));n.report="Unique emails: ("+o.length+")"+o.join(", ")+"\nDuplicate emails:  ("+l.length+")"+l.join(", ")+"\nEmail with no user:  ("+c.length+") "+c.join(", ")+"\n",n.emails=r;case 8:case"end":return t.stop()}}),t)})))()},loadpreview:function(){var e=this,t=new FormData;t.append("content",this.form_content),t.append("editpreview",!0),this.$axios.post("/admin/edm/"+this.edmID,t).then((function(t){e.previewTemplate=t.data})).catch((function(t){e.$toast.error(t.response.message)})).finally((function(){e.isFetching=!1}))},handleFileUpload_image1:function(e){try{var t=this.$refs.image1.files[0];this.image1preview=URL.createObjectURL(t),this.image1=this.$refs.image1.files[0],this.image1previewstore=""}catch(e){console.log(e)}},handleFileUpload_image2:function(e){try{var t=this.$refs.image2.files[0];this.image2preview=URL.createObjectURL(t),this.image2=this.$refs.image2.files[0],this.image2previewstore=""}catch(e){console.log(e)}},removeheader1:function(){this.$refs.image1.value=null,this.image1previewstore="",this.image1="",this.image1preview=""},removeheader2:function(){this.$refs.image2.value=null,this.image2previewstore="",this.image2="",this.image2preview=""},onSubmit:function(){var e=this;if(this.form_label&&this.form_subject&&this.form_content){var t=this.profile.id,n=this.profile.name,r=new FormData;this.$toast.success("Please wait"),this.form_content=_.a.inlineContent(this.form_content,k.a.styles),r.append("profile_id",t),r.append("name",n),r.append("label",this.form_label),r.append("subject",this.form_subject),r.append("content",this.form_content),r.append("href1",this.href1),r.append("href2",this.href2),r.append("header1",this.image1),r.append("header2",this.image2),r.append("locationdate",this.form_locationdate),this.$axios.post("/api/create-edm-templatebody",r).then((function(t){e.$toast.success("Save is done"),e.submitted=!1,e.id=t.data.data.id,e.id&&(e.disableSendEmail=!1)})).catch((function(t){e.submitted=!1})).finally((function(){}))}else this.errors.length=0,this.form_label||this.$toast.error("Title is required."),this.form_title||this.$toast.error("Subject is required."),this.form_content||this.$toast.error("Content body is required.")}}},$=(n(1077),n(1079),n(9)),component=Object($.a)(y,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"edm-header"}},[n("div",{staticClass:"container no-padding"},[n("v-toolbar",{staticClass:"pt-4",attrs:{flat:"",color:"white"}},[n("v-toolbar-title",[e._v("EDM Template message body")]),e._v(" "),n("v-divider",{staticClass:"mx-2",attrs:{inset:"",vertical:""}}),e._v(" "),n("v-spacer"),e._v(" "),n("div",{staticClass:"container--flex container--flex-align-item-center"})],1),e._v(" "),n("div",{staticClass:"container no-padding",staticStyle:{"background-color":"white"}},[n("v-container",{attrs:{fluid:""}},[n("div",[n("nuxt-link",{attrs:{to:{path:"/a/edm-management/templatebody"}}},[e._v("Go Back")]),e._v(" "),n("br"),e._v(" "),n("form",{staticClass:"review-form",attrs:{name:"editfaq"},on:{submit:function(t){return t.preventDefault(),e.onSubmit(t)}}},[n("br"),e._v(" "),n("v-layout",{attrs:{row:"",wrap:""}},[n("v-flex",{attrs:{xs12:""}},[n("ckeditor-nuxt",{attrs:{config:e.editorConfig},model:{value:e.form_locationdate,callback:function(t){e.form_locationdate=t},expression:"form_locationdate"}})],1)],1),e._v(" "),n("br"),e._v(" "),n("v-layout",{attrs:{row:""}},[n("v-flex",{attrs:{xs12:""}},[""!=this.image1previewstore?n("div",[n("v-img",{staticClass:"image-preview",attrs:{src:this.url+"/"+this.image1previewstore}})],1):n("div",[""!=this.image1preview?n("div",[e._v("\n                    image :\n                    "),n("v-img",{staticClass:"image-preview",attrs:{src:e.image1preview}})],1):e._e()]),e._v(" "),n("br"),e._v(" "),n("label",[e._v("Top Header")]),e._v(" "),n("div",{staticClass:"form-group"},[n("input",{ref:"image1",attrs:{type:"file"},on:{change:function(t){return e.handleFileUpload_image1()}}})]),e._v(" "),n("div",[n("label",{staticClass:"red-font",attrs:{onclick:"return false"},on:{click:function(t){return e.removeheader1()}}},[e._v("Remove")])])])],1),e._v(" "),n("v-layout",{attrs:{row:"",wrap:""}},[n("v-flex",{attrs:{xs12:""}},[n("v-textarea",{attrs:{rows:"1",label:"image link 1"},model:{value:e.href1,callback:function(t){e.href1=t},expression:"href1"}})],1)],1),e._v(" "),n("br"),e._v(" "),n("v-layout",{attrs:{row:""}},[n("v-flex",{attrs:{xs12:""}},[""!=this.image2previewstore?n("div",[n("v-img",{staticClass:"image-preview",attrs:{src:this.url+"/"+this.image2previewstore}})],1):n("div",[""!=this.image2preview?n("div",[e._v("\n                      image :\n                       "),n("v-img",{staticClass:"image-preview",attrs:{src:e.image2preview}})],1):e._e()]),e._v(" "),n("br"),e._v(" "),n("label",[e._v("Top Header 2")]),e._v(" "),n("div",{staticClass:"form-group"},[n("input",{ref:"image2",attrs:{type:"file"},on:{change:function(t){return e.handleFileUpload_image2()}}})]),e._v(" "),n("div",[n("label",{staticClass:"red-font",attrs:{onclick:"return false"},on:{click:function(t){return e.removeheader2()}}},[e._v("Remove")])])])],1),e._v(" "),n("v-layout",{attrs:{row:"",wrap:""}},[n("v-flex",{attrs:{xs12:""}},[n("v-textarea",{attrs:{rows:"1",label:"image link 2"},model:{value:e.href2,callback:function(t){e.href2=t},expression:"href2"}})],1)],1),e._v(" "),n("v-layout",{attrs:{row:""}},[n("v-flex",{attrs:{xs12:""}},[n("div",{staticClass:"form-group"},[n("v-textarea",{attrs:{rows:"1",label:"E-mail Title:"},on:{blur:function(t){return e.$v.form_label.$touch()}},model:{value:e.form_label,callback:function(t){e.form_label=t},expression:"form_label"}})],1),e._v(" "),e.$v.form_label.$error?[e.$v.form_label.required?e._e():n("p",{staticClass:"errorMessage"},[e._v("\n                      Title is required.\n                    ")])]:e._e()],2)],1),e._v(" "),n("div",{staticClass:"form-group d-none"},[n("v-textarea",{attrs:{rows:"1",label:"EDM Title:"},on:{blur:function(t){return e.$v.form_title.$touch()}},model:{value:e.form_title,callback:function(t){e.form_title=t},expression:"form_title"}})],1),e._v(" "),e.$v.form_title.$error?[e.$v.form_title.required?e._e():n("p",{staticClass:"errorMessage"},[e._v("\n                Title is required.\n              ")])]:e._e(),e._v(" "),n("v-layout",{attrs:{row:""}},[n("v-flex",{attrs:{xs12:""}},[n("v-textarea",{attrs:{rows:"1",label:"E-mail Subject:"},on:{blur:function(t){return e.$v.form_subject.$touch()}},model:{value:e.form_subject,callback:function(t){e.form_subject=t},expression:"form_subject"}})],1)],1),e._v(" "),e.$v.form_subject.$error?[e.$v.form_subject.required?e._e():n("p",{staticClass:"errorMessage"},[e._v("\n                E-mail subject is required.\n              ")])]:e._e(),e._v(" "),n("v-layout",{attrs:{row:""}},[n("v-flex",{attrs:{xs12:""}},[n("client-only",{attrs:{placeholder:"loading..."}},[n("ckeditor-nuxt",{attrs:{config:e.editorConfig},on:{blur:function(t){return e.$v.form_content.$touch()}},model:{value:e.form_content,callback:function(t){e.form_content=t},expression:"form_content"}})],1)],1)],1),e._v(" "),e.$v.form_content.$error?[e.$v.form_content.required?e._e():n("p",{staticClass:"errorMessage"},[e._v("\n                Content is required.\n              ")])]:e._e(),e._v(" "),n("v-btn",{attrs:{color:"blue",disable:e.$v.$invalid,disabled:e.submitted},on:{click:function(t){return e.onSubmit()}}},[n("label",{staticClass:"white-font"},[e._v("Submit")])]),e._v(" "),n("v-dialog",{attrs:{fullscreen:"","hide-overlay":"",transition:"dialog-bottom-transition"},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on;return[n("v-btn",e._g({attrs:{dark:"",color:"success"},on:{click:function(t){return e.loadpreview()}}},r),[n("label",{staticClass:"white-font"},[e._v("Preview")])])]}}]),model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[e._v(" "),n("v-card",[n("v-toolbar",{attrs:{dark:"",color:"primary"}},[n("v-btn",{attrs:{icon:"",dark:""},on:{click:function(t){e.dialog=!1}}},[n("v-icon",[e._v("close")])],1),e._v(" "),n("v-toolbar-title",[e._v("Preview")]),e._v(" "),n("v-spacer")],1),e._v(" "),n("v-container",{attrs:{fluid:""}},[n("v-layout",{attrs:{row:""}},[n("v-flex",{attrs:{xs12:""}},[n("div",{domProps:{innerHTML:e._s(e.previewTemplate)}})])],1)],1)],1)],1)],2)],1),e._v(" "),n("br"),e._v(" "),n("v-layout",{attrs:{row:""}},[n("v-combobox",{attrs:{items:e.items,disabled:e.comboBoxDisabled,"item-text":"name","item-value":"email",multiple:"",chips:"","deletable-chips":"",label:"Select emails to send"},model:{value:e.emails,callback:function(t){e.emails=t},expression:"emails"}}),e._v(" "),n("input",{ref:"fileInput",staticStyle:{display:"none"},attrs:{type:"file",accept:"*/*"},on:{change:e.onFilePicked}})],1),e._v(" "),n("v-layout",{attrs:{row:""}},[n("v-btn",{attrs:{color:"primary"},on:{click:e.onPickFile}},[e._v("Select file")]),e._v(" "),n("v-chip",{attrs:{close:""},model:{value:e.comboBoxDisabled,callback:function(t){e.comboBoxDisabled=t},expression:"comboBoxDisabled"}},[e._v("\n              "+e._s(e.filename)+"\n            ")])],1),e._v(" "),n("v-btn",{class:{"disable-input":e.disableSendEmail},attrs:{color:"success",disabled:e.disableSendEmail,loading:e.submitted},on:{click:function(t){return e.fireSendEmail()}}},[n("label",{staticClass:"white-font"},[e._v("Send Email")])]),e._v(" "),n("div",{staticStyle:{"white-space":"pre"}},[e._v(e._s(e.report))])],1)],1),e._v(" "),n("div",{staticClass:"controls m-lg-vertical"})],1)])}),[],!1,null,"2b81a0ce",null);t.default=component.exports},424:function(e,t,n){"use strict";n(14);var r=n(4);t.a={middleware:"authenticated",layout:"admin",asyncData:function(e){return Object(r.a)(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.store,r=e.error,t.next=3,n.dispatch("session/fetchUserProfile");case 3:return t.next=5,n.getters["session/IS_ADMIN"];case 5:t.sent||r({statusCode:404,message:"Page not found"});case 7:case"end":return t.stop()}}),t)})))()}}},425:function(e,t,n){"use strict";t.a={methods:{formatDate:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"DD MMM YYYY";return e?this.$moment(e).format(t):""},resetDateSelection:function(){this.dateFrom="",this.dateTo="",this.dateFromFormatted="",this.dateToFormatted=""}},watch:{dateTo:function(e){this.dateToFormatted=this.formatDate(this.dateTo)},dateFrom:function(e){this.dateFromFormatted=this.formatDate(this.dateFrom)}},computed:{hasDateSelected:function(){return this.dateFrom.length>0||this.dateTo.length>0}},data:function(){return{dateFrom:"",dateFromFormatted:"",dateTo:"",dateToFormatted:"",menuFrom:!1,menuTo:!1}}}},427:function(e,t,n){"use strict";n(13);var r=n(426);t.a={methods:{downloadExcel:function(){var e=this;this.isDownloading||(this.isDownloading=!0,this.$axios.get("".concat(this.currentDownloadCSVURL,"&download=1"),{responseType:"blob"}).then((function(e){r(e.data,"reports.xlsx")})).catch((function(t){e.$toast.error(t.response.data.message)})).finally((function(){e.isDownloading=!1})))}},data:function(){return{currentDownloadCSVURL:"",isDownloading:!1}}}},454:function(e,t,n){"use strict";t.a={styles:":root {\n  --ck-color-mention-background: hsla(341, 100%, 30%, 0.1);\n  --ck-color-mention-text: hsl(341, 100%, 30%);\n  --ck-highlight-marker-blue: hsl(201, 97%, 72%);\n  --ck-highlight-marker-green: hsl(120, 93%, 68%);\n  --ck-highlight-marker-pink: hsl(345, 96%, 73%);\n  --ck-highlight-marker-yellow: hsl(60, 97%, 73%);\n  --ck-highlight-pen-green: hsl(112, 100%, 27%);\n  --ck-highlight-pen-red: hsl(0, 85%, 49%);\n  --ck-image-style-spacing: 1.5em;\n  --ck-todo-list-checkmark-size: 16px;\n}\n\n.image-style-side {\n  float: right;\n  margin-left: var(--ck-image-style-spacing);\n  max-width: 50%;\n}\n\n.image-style-align-left {\n  float: left;\n  margin-right: var(--ck-image-style-spacing);\n}\n\n.image-style-align-center {\n  margin-left: auto;\n  margin-right: auto;\n}\n\n.image-style-align-right {\n  float: right;\n  margin-left: var(--ck-image-style-spacing);\n}\n\n.image {\n  display: table;\n  clear: both;\n  text-align: center;\n  margin: 1em auto;\n}\n\n.image img {\n  display: block;\n  margin: 0 auto;\n  max-width: 100%;\n  min-width: 50px;\n}\n\n.image > figcaption {\n  display: table-caption;\n  caption-side: bottom;\n  word-break: break-word;\n  color: hsl(0, 0%, 20%);\n  background-color: hsl(0, 0%, 97%);\n  padding: .6em;\n  font-size: .75em;\n  outline-offset: -1px;\n}\n\n.image.image_resized {\n  max-width: 100%;\n  display: block;\n  box-sizing: border-box;\n}\n\n.image.image_resized img {\n  width: 100%;\n}\n\n.image.image_resized > figcaption {\n  display: block;\n}\n\n.marker-yellow {\n  background-color: var(--ck-highlight-marker-yellow);\n}\n\n.marker-green {\n  background-color: var(--ck-highlight-marker-green);\n}\n\n.marker-pink {\n  background-color: var(--ck-highlight-marker-pink);\n}\n\n.marker-blue {\n  background-color: var(--ck-highlight-marker-blue);\n}\n\n.pen-red {\n  color: var(--ck-highlight-pen-red);\n  background-color: transparent;\n}\n\n.pen-green {\n  color: var(--ck-highlight-pen-green);\n  background-color: transparent;\n}\n\n.text-tiny {\n  font-size: .7em;\n}\n\n.text-small {\n  font-size: .85em;\n}\n\n.text-big {\n  font-size: 1.4em;\n}\n\n.text-huge {\n  font-size: 1.8em;\n}\n\nblockquote {\n  overflow: hidden;\n  padding-right: 1.5em;\n  padding-left: 1.5em;\n  margin-left: 0;\n  margin-right: 0;\n  font-style: italic;\n  border-left: solid 5px hsl(0, 0%, 80%);\n}\n\n[dir=\"rtl\"] blockquote {\n  border-left: 0;\n  border-right: solid 5px hsl(0, 0%, 80%);\n}\n\ncode {\n  background-color: hsla(0, 0%, 78%, 0.3);\n  padding: .15em;\n  border-radius: 2px;\n}\n\n.table {\n  margin: 1em auto;\n  display: table;\n}\n\n.table table {\n  border-collapse: collapse;\n  border-spacing: 0;\n  width: 100%;\n  height: 100%;\n  border: 1px double hsl(0, 0%, 70%);\n}\n\n.table table td,\n.table table th {\n  min-width: 2em;\n  padding: .4em;\n  border: 1px solid hsl(0, 0%, 75%);\n}\n\n.table table th {\n  font-weight: bold;\n  background: hsla(0, 0%, 0%, 5%);\n}\n\n[dir=\"rtl\"] .table th {\n  text-align: right;\n}\n\n[dir=\"ltr\"] .table th {\n  text-align: left;\n}\n\n.page-break {\n  position: relative;\n  clear: both;\n  padding: 5px 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.page-break::after {\n  content: '';\n  position: absolute;\n  border-bottom: 2px dashed hsl(0, 0%, 77%);\n  width: 100%;\n}\n\n.page-break__label {\n  position: relative;\n  z-index: 1;\n  padding: .3em .6em;\n  display: block;\n  text-transform: uppercase;\n  border: 1px solid hsl(0, 0%, 77%);\n  border-radius: 2px;\n  font-family: Helvetica, Arial, Tahoma, Verdana, Sans-Serif;\n  font-size: 0.75em;\n  font-weight: bold;\n  color: hsl(0, 0%, 20%);\n  background: hsl(0, 0%, 100%);\n  box-shadow: 2px 2px 1px hsla(0, 0%, 0%, 0.15);\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n}\n\n.todo-list {\n  list-style: none;\n}\n\n.todo-list li {\n  margin-bottom: 5px;\n}\n\n.todo-list li .todo-list {\n  margin-top: 5px;\n}\n\n.todo-list .todo-list__label > input {\n  -webkit-appearance: none;\n  display: inline-block;\n  position: relative;\n  width: var(--ck-todo-list-checkmark-size);\n  height: var(--ck-todo-list-checkmark-size);\n  vertical-align: middle;\n  border: 0;\n  left: -25px;\n  margin-right: -15px;\n  right: 0;\n  margin-left: 0;\n}\n\n.todo-list .todo-list__label > input::before {\n  display: block;\n  position: absolute;\n  box-sizing: border-box;\n  content: '';\n  width: 100%;\n  height: 100%;\n  border: 1px solid hsl(0, 0%, 20%);\n  border-radius: 2px;\n  transition: 250ms ease-in-out box-shadow, 250ms ease-in-out background, 250ms ease-in-out border;\n}\n\n.todo-list .todo-list__label > input::after {\n  display: block;\n  position: absolute;\n  box-sizing: content-box;\n  pointer-events: none;\n  content: '';\n  left: calc( var(--ck-todo-list-checkmark-size) / 3 );\n  top: calc( var(--ck-todo-list-checkmark-size) / 5.3 );\n  width: calc( var(--ck-todo-list-checkmark-size) / 5.3 );\n  height: calc( var(--ck-todo-list-checkmark-size) / 2.6 );\n  border-style: solid;\n  border-color: transparent;\n  border-width: 0 calc( var(--ck-todo-list-checkmark-size) / 8 ) calc( var(--ck-todo-list-checkmark-size) / 8 ) 0;\n  transform: rotate(45deg);\n}\n\n.todo-list .todo-list__label > input[checked]::before {\n  background: hsl(126, 64%, 41%);\n  border-color: hsl(126, 64%, 41%);\n}\n\n.todo-list .todo-list__label > input[checked]::after {\n  border-color: hsl(0, 0%, 100%);\n}\n\n.todo-list .todo-list__label .todo-list__label__description {\n  vertical-align: middle;\n}\n\n.media {\n  clear: both;\n  margin: 1em 0;\n  display: block;\n  min-width: 15em;\n}\n\n.raw-html-embed {\n  margin: 1em auto;\n  min-width: 15em;\n}\n\nhr {\n  margin: 15px 0;\n  height: 4px;\n  background: hsl(0, 0%, 87%);\n  border: 0;\n}\n\npre {\n  padding: 1em;\n  color: hsl(0, 0%, 20.8%);\n  background: hsla(0, 0%, 78%, 0.3);\n  border: 1px solid hsl(0, 0%, 77%);\n  border-radius: 2px;\n  text-align: left;\n  direction: ltr;\n  tab-size: 4;\n  white-space: pre-wrap;\n  font-style: normal;\n  min-width: 200px;\n}\n\npre code {\n  background: unset;\n  padding: 0;\n  border-radius: 0;\n}\n\n.mention {\n  background: var(--ck-color-mention-background);\n  color: var(--ck-color-mention-text);\n}\n@media print {\n\n  .page-break {\n      padding: 0;\n  }\n\n  .page-break::after {\n      display: none;\n  }\n}",DELIVERY:"Delivery",CARRIER:"Carrier"}},484:function(e,t){},488:function(e,t){},489:function(e,t){},687:function(e,t,n){var content=n(1078);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(3).default)("2692e9ea",content,!0,{sourceMap:!1})},688:function(e,t,n){var content=n(1080);"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(3).default)("4a916e81",content,!0,{sourceMap:!1})}}]);