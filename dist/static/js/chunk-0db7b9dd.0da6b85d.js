(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0db7b9dd"],{"49c4":function(e,t,a){},"6e57":function(e,t,a){"use strict";a("e413")},"80c1":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("common-layout",[s("div",{staticClass:"top"},[s("div",{staticClass:"header"},[s("img",{staticClass:"logo",attrs:{alt:"logo",src:a("4ffd")}}),s("span",{staticClass:"title"},[e._v(e._s(e.systemName))])])]),s("div",{staticClass:"login"},[s("a-form",{attrs:{form:e.form},on:{submit:e.onSubmit}},[s("a-tabs",{staticStyle:{padding:"0 2px"},attrs:{size:"large",tabBarStyle:{textAlign:"center"}}},[s("a-tab-pane",{key:"1",attrs:{tab:"Login"}},[s("a-alert",{directives:[{name:"show",rawName:"v-show",value:e.error,expression:"error"}],staticStyle:{"margin-bottom":"24px"},attrs:{type:"error",closable:!0,message:e.error,showIcon:""}}),s("a-form-item",[s("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["name",{rules:[{required:!0,message:"Please enter username.",whitespace:!0}]}],expression:"['name', {rules: [{ required: true, message: 'Please enter username.', whitespace: true}]}]"}],attrs:{autocomplete:"autocomplete",size:"large",placeholder:"username"}},[s("a-icon",{attrs:{slot:"prefix",type:"user"},slot:"prefix"})],1)],1),s("a-form-item",[s("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["password",{rules:[{required:!0,message:"Please enter password.",whitespace:!0}]}],expression:"['password', {rules: [{ required: true, message: 'Please enter password.', whitespace: true}]}]"}],attrs:{size:"large",placeholder:"password",autocomplete:"autocomplete",type:"password"}},[s("a-icon",{attrs:{slot:"prefix",type:"lock"},slot:"prefix"})],1)],1)],1)],1),s("div",[s("a-checkbox",{attrs:{checked:!0}},[e._v("Remember me")]),s("a",{staticStyle:{float:"right"}},[e._v("Forgot password?")])],1),s("a-form-item",[s("a-button",{staticStyle:{width:"100%","margin-top":"24px"},attrs:{loading:e.logging,size:"large",htmlType:"submit",type:"primary"}},[e._v("Login")])],1)],1)],1)])},r=[],o=a("5530"),i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"common-layout"},[a("div",{staticClass:"content"},[e._t("default")],2),a("page-footer",{attrs:{"link-list":e.footerLinks,copyright:e.copyright}})],1)},n=[],l=a("613e"),c=a("5880"),m={name:"CommonLayout",components:{PageFooter:l["a"]},computed:Object(o["a"])({},Object(c["mapState"])("setting",["footerLinks","copyright"]))},u=m,p=(a("6e57"),a("2877")),d=Object(p["a"])(u,i,n,!1,null,"63c094a6",null),g=d.exports,f=a("93d6"),h=a("b775"),b=a("89a5"),v={name:"Login",components:{CommonLayout:g},data:function(){return{logging:!1,error:"",form:this.$form.createForm(this)}},computed:{systemName:function(){return this.$store.state.setting.systemName}},methods:Object(o["a"])(Object(o["a"])({},Object(c["mapMutations"])("account",["setUser","setPermissions","setRoles"])),{},{onSubmit:function(e){var t=this;e.preventDefault(),this.form.validateFields((function(e){if(!e){t.logging=!0;var a=t.form.getFieldValue("name"),s=t.form.getFieldValue("password");Object(f["b"])(a,s).then(t.afterLogin)}}))},afterLogin:function(e){var t=this;if(this.logging=!1,200===e.status){var a=e.data;this.setUser({name:a.user.userName,email:a.user.email,fullname:a.user.fullname,role:a.user.role}),this.setRoles(a.user.role),Object(h["g"])({token:a.token,expireAt:(new Date).getDate()+90}),Object(f["a"])().then((function(e){var s=e.data.data;Object(b["d"])(s),t.$router.push("/brands/brand-list"),t.$message.success("Welcome back, "+a.user.fullname+".",3)}))}else this.error="Invalid username or password!"}})},w=v,y=(a("b7dd"),Object(p["a"])(w,s,r,!1,null,"36f346e7",null)),x=y.exports;t["default"]=x},b7dd:function(e,t,a){"use strict";a("49c4")},e413:function(e,t,a){}}]);