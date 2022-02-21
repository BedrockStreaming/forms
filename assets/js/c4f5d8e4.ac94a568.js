(self.webpackChunkforms=self.webpackChunkforms||[]).push([[195,825,309],{8743:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>p});var n=r(7294),a=r(6010),s=r(2247),i=r(9960),o=r(2263),l=r(4996),u=r(3321),c=r(1100);const d="heroBanner_63wd",m="buttons_jyKK";var f=n.forwardRef((function(e){return n.createElement(i.Z,e)}));const p=function(){var e=(0,o.Z)().siteConfig,t=void 0===e?{}:e;return n.createElement(s.Z,{title:""+t.title,description:"Documentation website for Bedrock Strealing Forms, a monorepo exposing a form-builder wrapper around react-hook-form"},n.createElement("header",{className:(0,a.Z)("hero hero--primary",d)},n.createElement("div",{className:"container"},n.createElement("h1",{"data-testid":"hero-title",className:"hero__title",style:{color:"#1c1c1c"}},t.title),n.createElement("p",{className:"hero__subtitle",style:{color:"#1c1c1c"}},t.tagline),n.createElement("div",{className:m},n.createElement(u.Z,{color:"secondary",component:f,variant:"contained",to:(0,l.Z)("docs/"),"data-testid":"hero-get-started-button"},"Get Started")))),n.createElement("main",null,n.createElement(c.default,null)))}},1100:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>Ae});var n=r(7294),a=r(9960),s=r(7357),i=r(6886),o=r(6483),l=r(3321),u=r(5617),c=r(6486),d=r.n(c),m=r(7462),f=r(7536),p=r(438),h={min:"min",max:"max",required:"required"},g=[],v=function(e){var t=e.fieldsToCheckByStep,r=e.schema,n=e.dirtyFields,a=e.defaultValues,s=e.errors;return t.some((function(e){return function(e){var t=e.fieldToCheck,r=e.errors;return!(!r||!r[t])}({fieldToCheck:e,errors:s})||function(e){var t=e.schema,r=e.fieldToCheck;return d().get(t,["fields",r,"validation",h.required],!1)}({schema:r,fieldToCheck:e})&&function(e){var t=e.fieldToCheck,r=e.dirtyFields,n=e.defaultValues;return!d().get(r,t)&&!d().get(n,t)}({fieldToCheck:e,dirtyFields:n,defaultValues:a})}))},y=function(e){var t=e.errors,r=e.schema,a=e.isLastStep,s=e.currentStepIndex,i=e.dirtyFields,o=e.defaultValues,l=e.isValidating;return(0,n.useMemo)((function(){if(a||l)return!1;var e=function(e){var t=e.schema,r=e.currentStepIndex,n=d().get(t,["stepsById",r]);return d().get(t,["steps",n,"fieldsById"],g)}({schema:r,currentStepIndex:s});return!v({fieldsToCheckByStep:e,schema:r,dirtyFields:i,defaultValues:o,errors:t})}),[t,r,a,s,i,o,l])},b=[],j={},k=function(e,t,r){return d().filter(e,(function(e){var n=d().get(t,[e,"type"]);return r.includes(n)&&"submit"!==n}))},x=r(4578),E=function(e){function t(t){var r;return(r=e.call(this,t)||this).name="FormBuilderError",r}return(0,x.Z)(t,e),t}((0,r(4542).Z)(Error)),Z=function(e){var t=e.children,r=e.currentStepIndex,a=d().get(t,r,null);return n.createElement(n.Fragment,null,a)},w=r(3366),I=["id","fieldType","dictionary"];function F(e){var t=e.id,r=e.fieldType,a=e.dictionary,s=(0,w.Z)(e,I),i=a[r];return i?n.createElement(i,(0,m.Z)({"data-testid":t,id:t},s)):null}function N(e){var t=e.formId,r=e.dictionary,a=e.submitDisabled,s=e.nextDisabled,i=e.getValues,o=e.isLastStep,l=e.submitLabel,u=e.onNextStep,c=n.useCallback((function(e){e.preventDefault(),u(i())}),[u,i]);return n.createElement("div",null,o?n.createElement(F,{id:"submit-field",fieldType:"submit",disabled:a,label:l,dictionary:r,formId:t}):n.createElement(F,{id:"next-field",fieldType:"submit",disabled:s,onClick:c,label:l,dictionary:r,formId:t}))}var S=r(5861),M=r(7757),B=r.n(M),C=["key"],V=function(e){var t=e.validation,r=e.extraValidation,n=d().reduce(t,(function(e,t){var r,n=t.key,a=(0,w.Z)(t,C);return d().includes(h,n)?Object.assign({},e,((r={})[n]=a,r)):e}),{}),a=d().reduce(t,(function(e,t){var n,a=t.key,s=t.value,i=t.message;return d().includes(h,a)||r&&!r[a]?e:Object.assign({},e,((n={})[a]=function(e,t){return(0,S.Z)(B().mark((function r(){var n,a=arguments;return B().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,e.apply(void 0,a);case 2:return n=r.sent,r.abrupt("return",n||t);case 4:case"end":return r.stop()}}),r)})))}(d().invoke(r,a,s),i),n))}),{}),s=!!Object.keys(a).length;return Object.assign({},n,s&&{validate:a})},q={};function z(e){var t=e.formId,r=e.schema,a=e.dictionary,s=e.onSubmit,i=e.onNextStep,o=void 0===i?d().noop:i,l=e.extraValidation,u=e.defaultValues,c=e.behavior,h=void 0===c?"onChange":c,g=e.isLastStep,v=void 0===g||g,x=e.currentStepIndex,w=void 0===x?0:x,I=e.formProps,S=void 0===I?q:I,M=e.debug,B=void 0!==M&&M,C=(0,f.cI)({mode:h,criteriaMode:"all",defaultValues:u}),z=C.handleSubmit,D=C.formState,L=D.isDirty,P=D.isValid,T=D.isValidating,A=D.errors,O=D.dirtyFields,R=C.control,Y=C.getValues,_=C.setValue,U=C.trigger,J=C.setFocus,K=!d().isEmpty(u),$=n.useMemo((function(){return d().keys(a)}),[a]),G=n.useMemo((function(){return function(e,t,r){var n=d().get(e,"steps"),a=d().get(e,"stepsById",b),s=d().get(a,r),i=d().get(n,[s,"fieldsById"],b),o=d().get(n,[s,"submit","label"]),l=d().get(e,"fields",j);return{fields:l,fieldsById:k(i,l,t),submitLabel:o,stepsById:a}}(r,$,w)}),[w,r,$]),Q=G.fields,W=G.fieldsById,X=G.stepsById,H=G.submitLabel,ee=function(e){var t=e.fieldsById,r=e.fields,n=e.getValues,a=e.extraValidation,s=e.errors;return t.reduce((function(e,t){var i=r[t].dependsOn;return i?function(e){var t=e.dependsOn,r=e.getValues,n=e.extraValidation,a=e.errors;if(!t)return!0;var s=[];return t.forEach((function(e){if("string"==typeof e)return s.push(!!r(e)&&!a[e]);var t=r(e.fieldId),i=a[e.fieldId];if(!e.validate){var o=i&&i[e.key];return s.push(!!t&&!o)}var l=n&&n[e.key];return l?s.push(!!l(e.value)(t)&&!i):s.push(!!t&&!i)})),0===s.filter((function(e){return!e})).length}({dependsOn:i,getValues:n,extraValidation:a,errors:s})?[].concat(e,[t]):e:[].concat(e,[t])}),[])}({fieldsById:W,fields:Q,getValues:Y,errors:A,extraValidation:l}),te=n.useMemo((function(){return d().reduce(W,(function(e,t){var r,n=d().get(Q,[t,"validation"],q);return Object.assign({},e,((r={})[t]=V({validation:n,extraValidation:l}),r))}),{})}),[l,Q,W]),re=n.useCallback((function(e,t){return _(e,t,{shouldValidate:!0,shouldDirty:!0})}),[_]),ne=n.useCallback(U,[U]),ae=y({errors:A,schema:r,isLastStep:v,currentStepIndex:w,dirtyFields:O,defaultValues:u,isValidating:T});return function(e){var t=e.currentStepIndex,r=e.schema,a=e.setFocus;(0,n.useEffect)((function(){var e=d().get(r,"stepsById."+t),n=d().get(r,["steps",e,"fieldsById",0]);try{a(n)}catch(s){return}}),[t,r,a])}({currentStepIndex:w,schema:r,setFocus:J}),B&&function(e,t,r){var n=d().filter(t.fields,(function(t){var r=t.type;return!e.includes(r)||"submit"===r}));if(n.length>0)throw new E("The form's schema contains some bad field(s) type that are prohibited or not defined in the dictionary: \n"+JSON.stringify(n,null,2)+"\nAvailable in dictionary:\n"+JSON.stringify(e));var a=d().get(t,"steps");if(!d().isObject(a)||d().isEmpty(a))throw new E("The form's schema must contain a map of steps by id. Found: \n"+JSON.stringify(a,null,2));var s=d().get(t,"stepsById");if(d().keys(a).length!==s.length)throw new E("The form's schema must contain as many steps entries as steps ids. Found: \n"+JSON.stringify({steps:d().keys(a).length,stepsById:s.length},null,2));if(!r.submit)throw new E("The form's dictionary must contain a submit field. Found: \n"+JSON.stringify(r,null,2))}($,r,a),d().isEmpty(r)||d().isEmpty(a)||"function"!=typeof s?null:n.createElement(n.Fragment,null,n.createElement("form",(0,m.Z)({"data-testid":"form-builder","aria-labelledby":"form-label-element-id"},S,{onSubmit:z(s)}),n.createElement(Z,{currentStepIndex:w},d().map(X,(function(e){return n.createElement(n.Fragment,{key:e},d().map(ee,(function(e){var t=Q[e],r=t.type,s=t.id,i=t.defaultValue,o=t.meta,l=t.validation;return n.createElement(f.Qr,{key:s,name:s,control:R,defaultValue:i,rules:te[e],render:function(e){var t=e.field;return n.createElement(F,(0,m.Z)({id:s,fieldType:r,validation:l,dictionary:a,errors:d().get(A,[s]),setFieldValue:re,triggerValidationField:ne},d().omit(t,"ref"),{propRef:t.ref,isValidating:T},o))}})})))}))),n.createElement(N,{formId:t,dictionary:a,submitDisabled:!(L||K)||!P,nextDisabled:!ae,isLastStep:v,submitLabel:H,getValues:Y,onNextStep:o})),B&&n.createElement(p.DevTool,{control:R}))}var D,L,P=r(9230),T=r(5113),A=r(1519),O=r(6624),R=r(4472),Y=r(3578),_=r(9874),U={register:"register"},J={register:{fields:{birthdate:{id:"birthdate",meta:{errorMessage:"Birth date invalid",label:"Birth date",name:"birthdate"},type:"date",validation:{checkDateFormat:{key:"checkDateFormat",message:"Date format must be DD/MM/YYYY"},checkMinAge:{key:"checkMinAge",message:"Minimum age"},required:{key:"required",message:"Required field",value:!0}}},email:{id:"email",meta:{errorMessage:"Invalid Email",label:"Email",name:"email"},type:"text",validation:{checkPattern:{key:"checkPattern",message:"Email format",value:'^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'},required:{key:"required",message:"Required field",value:!0}}},firstName:{id:"firstName",meta:{errorMessage:"Invalid firstname",label:"Firstname",name:"firstName"},type:"text",validation:{checkPattern:{key:"checkPattern",message:"Firstname format",value:"^[a-zA-Z\xc0-\u0233 ,.'-]+$"},required:{key:"required",message:"forms.required.error",value:!0}}},lastName:{id:"lastName",meta:{errorMessage:"Invaid lastname",label:"Lastname",name:"lastName"},type:"text",validation:{maxLength:{key:"checkMaxLength",message:"Maximum input length",value:20},required:{key:"required",message:"Required field",value:!0}}},password:{id:"password",meta:{errorMessage:"Invalid Password",label:"Password",name:"password"},type:"password",validation:{checkForLower:{key:"checkForLower",message:"Lowercase expected"},checkForNumber:{key:"checkForNumber",message:"Number expected"},checkForUpper:{key:"checkForUpper",message:"Uppercase expected"},checkMinLength:{key:"checkMinLength",message:"Minimum chars expected",value:8},required:{key:"required",message:"Required field",value:!0}}}},steps:{"step-0":{fieldsById:["email"],id:"step-0",meta:{subtitle:"Email",title:"Email"},submit:{label:"Next"}},"step-1":{fieldsById:["password"],id:"step-1",meta:{subtitle:"Password",title:"Password"},submit:{label:"Next"}},"step-2":{fieldsById:["firstName","lastName"],id:"step-2",meta:{subtitle:"First name and Last name",title:"First name and Last name"},submit:{label:"Next"}},"step-3":{fieldsById:["birthdate"],id:"step-3",meta:{subtitle:"Birthdate",title:"Birthdate"},submit:{label:"Submit"}}},stepsById:["step-0","step-1","step-2","step-3"]},single_step_register:{fields:{birthdate:{id:"birthdate",meta:{errorMessage:"account.invalidBirthdate",label:"account.birthDay",name:"birthdate"},type:"date",validation:{checkDateFormat:{key:"checkDateFormat",message:"onboarding.rules.birthdateFormat"},checkMinAge:{key:"checkMinAge",message:"onboarding.rules.birthdateMinAge"},required:{key:"required",message:"forms.required.error",value:!0}}},email:{id:"email",meta:{errorMessage:"account.invalidEmail",label:"account.email",name:"email"},type:"text",validation:{checkPattern:{key:"checkPattern",message:"forms.pattern.error",value:'^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'},required:{key:"required",message:"forms.required.error",value:!0}}},firstName:{id:"firstName",meta:{errorMessage:"account.invalidFirstName",label:"account.firstName",name:"firstName"},type:"text",validation:{checkPattern:{key:"checkPattern",message:"forms.pattern.error",value:"^[a-zA-Z\xc0-\u0233 ,.'-]+$"},required:{key:"required",message:"forms.required.error",value:!0}}},lastName:{id:"lastName",meta:{errorMessage:"account.invalidLastName",label:"account.lastName",name:"lastName"},type:"text",validation:{maxLength:{key:"checkMaxLength",message:"forms.maxLength.error",value:20},required:{key:"required",message:"forms.required.error",value:!0}}},password:{id:"password",meta:{errorMessage:"account.invalidPassword",label:"global.password",name:"password"},type:"password",validation:{checkForLower:{key:"checkForLower",message:"onboarding.rules.lowercase"},checkForNumber:{key:"checkForNumber",message:"onboarding.rules.number"},checkForUpper:{key:"checkForUpper",message:"onboarding.rules.uppercase"},checkMinLength:{key:"checkMinLength",message:"onboarding.rules.charLimit",value:8},required:{key:"required",message:"forms.required.error",value:!0}}}},steps:{"single-step-register-step-0":{fieldsById:["firstName","lastName","email","birthdate","password"],id:"single-step-register-step-0",meta:{subtitle:"(used for testing)",title:"One step registration form"},submit:{label:"components.register"}}},stepsById:["single-step-register-step-0"]}},K=r(2880),$=((D={})[1]="complete",D[2]="incomplete",D[0]="idle",D),G=function(e,t){return{key:e,check:function(e){function t(t){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}((function(e){return void 0!==e&&d().get(e,["length"])&&t?t(e)?1:2:0}))}},Q=function(e,t){return t.reduce((function(t,r){var n=r.check,a=r.key;return 2===n(e)?d().concat(t,a):t}),[])},W=function(e){var t=e.t,r=void 0===t?d().identity:t,n=e.errors,a=e.validation,s=e.config;return Object.values(a).reduce((function(e,t){var a=t.message,i=t.key;return h[i]?e:[].concat(e,[G(r(a,s),(function(){return!d().get(n,["types",i])}))])}),[])},X=["rules","value","component","componentProp","onError"],H=function(e){var t,r=e.rules,a=void 0===r?[]:r,s=e.value,i=void 0===s?"":s,o=e.component,l=e.componentProp,u=void 0===l?"items":l,c=e.onError,m=void 0===c?d().noop:c,f=(0,w.Z)(e,X);if(!o||!a.length)return null;var p=function(e,t){return e.reduce((function(e,r){var n=r.check,a=r.key,s=n(t),i=2===s?d().concat(e.errors,a):e.errors;return{items:d().concat(e.items,{key:a,status:$[s]}),errors:i}}),{errors:[],items:[]})}(a,i),h=p.items;m(p.errors);var g=Object.assign({},f,((t={})[u]=h,t));return n.createElement(o,g)},ee=["rules","value","ruleComponent","ruleComponentProp","valueProp","onError"],te=function(e){return function(t){var r,a=t.rules,s=t.value,i=t.ruleComponent,o=t.ruleComponentProp,l=t.valueProp,u=void 0===l?"value":l,c=t.onError,d=(0,w.Z)(t,ee),m=Object.assign({},d,((r={})[u]=s,r)),f=d.className;return n.createElement("div",{className:f},n.createElement(e,m),n.createElement(H,{rules:a,value:s,component:i,componentProp:o,onError:c,id:d.name}))}},re=(0,_.Z)(((L={list:{display:"flex",margin:0,padding:0,textAlign:"left",listStyle:"none"},listItem:{margin:"4px",fontSize:"smaller"}}).idle={color:"#2e2e2d"},L.complete={color:"#4ed569"},L.incomplete={color:"#da3b2b"},L)),ne=function(e){var t=e.items,r=re();return n.createElement("ul",{className:r.list},t.map((function(e){return n.createElement("li",{key:e.key,className:r.listItem+" "+r[e.status]},n.createElement("span",null,e.key))})))},ae=te(K.Z),se=r(381),ie=r.n(se),oe={moment:{formats:{shortDate:"DD/MM/YYYY",shortDateDisplay:"DD/MM/YYYY"}}},le=d().get(oe,"moment.formats.shortDate"),ue=d().get(oe,"moment.formats.shortDateDisplay"),ce=function(e){return ie()().diff(ie()(e,le),"years")},de=function(e){return e.replace(/[a-z\xc0-\u017e]/gi,"")[0]},me=function(e){var t=de(ue),r=function(){var e=de(ue);return Array.from(ue).reduce((function(t,r,n){return r===e?t.concat(n-1-t.length):t}),[])}();if(2!==r.length)throw new Error("Birthdate should have two separators, found: "+r.length);return Array.from(e).filter((function(e){return!!parseInt(e,10)||0===parseInt(e,10)})).splice(0,8).reduce((function(e,n,a){return r.includes(a)?e.concat(n.toString()).concat(t):e.concat(n.toString())}),"")},fe=["component","id","label","value","setFieldValue","onChange"],pe=de(ue),he=function(e){var t=e.component,r=e.id,a=e.label,s=e.value,i=e.setFieldValue,o=e.onChange,l=(0,w.Z)(e,fe),u=n.useRef("");return n.createElement(t,(0,m.Z)({label:a,"data-testid":"birthdate-field",type:"text",name:"birthdate",onChange:function(e){var t=d().get(e,"target.value","");if(!(t.length>10)){if(!(u.current.length>=t.length)||10===t.length){var n=t[t.length]===pe?t:me(t);i(r,me(n))}u.current=t,o(e)}},value:s},l))},ge=te(K.Z),ve=["label","formId"],ye={text:function(e){var t=e["data-testid"],r=e.errorMessage,a=e.errors,i=e.id,o=e.label,l=e.name,u=e.onBlur,c=e.onChange,d=e.optionalText,m=e.propRef,f=e.type,p=e.value,h=(0,n.useMemo)((function(){return{ref:m}}),[m]),g=a&&a.type&&r;return n.createElement(s.Z,{sx:{m:1}},n.createElement(K.Z,{"data-testid":t,error:!!g,helperText:g||d,id:i,inputProps:h,label:o,name:l,onBlur:u,onChange:c,type:f||"text",value:p}))},password:function(e){var t=e["data-testid"],r=e.errors,a=e.id,i=e.label,o=e.name,l=e.onBlur,u=e.onChange,c=e.optionalText,d=e.propRef,m=e.value,f=e.validation,p=(0,n.useMemo)((function(){return{ref:d}}),[d]),h=W({errors:r,validation:f}),g=!!Q(m,h).length;return n.createElement(s.Z,{sm:{m:1}},n.createElement(ae,{type:"password",inputProps:p,id:a,label:i,name:o,error:g,helperText:c,onBlur:l,onChange:u,rules:h,value:m,"data-testid":t,ruleComponent:ne}))},date:function(e){var t=e["data-testid"],r=e.errors,a=e.validation,i=e.name,o=e.optionalText,l=e.label,u=e.id,c=e.value,d=e.setFieldValue,m=e.onChange,f=e.onBlur,p=e.propRef,h=(0,n.useMemo)((function(){return{ref:p}}),[p]),g=W({errors:r,validation:a}),v=!!Q(c,g).length;return n.createElement(s.Z,{sx:{m:1}},n.createElement(he,{component:ge,setFieldValue:d,inputProps:h,id:u,label:l,name:i,error:v,helperText:o,onBlur:f,onChange:m,rules:g,value:c,"data-testid":t,ruleComponent:ne}))},submit:function(e){var t=e.label,r=e.formId,a=(0,w.Z)(e,ve),i=(0,u.I0)(),o=0!==(0,u.v9)((0,P.vc)(r));return n.createElement(s.Z,{display:"flex",justifyContent:"center",width:"100%"},o&&n.createElement(l.Z,{onClick:function(){i((0,P.IT)(r))},variant:"outlined",sx:{margin:1},type:"button"},"Previous"),n.createElement(l.Z,(0,m.Z)({variant:"contained",sx:{margin:1},type:"submit"},a),t))}},be=function(e){return{type:"some_scope/SUBMIT",payload:e}},je={onboarding:{maxAge:130,minAge:13}},ke=d().get(je,"onboarding.maxAge"),xe=d().get(je,"onboarding.minAge"),Ee={checkMinAge:function(){return function(e){return ce(e)>=xe}},checkDateFormat:function(){return function(e){var t,r=e&&e.match(/\D/g),n=r&&2===r.length,a=ce(e),s=!!a&&a<=ke;return t=e,!!(ie()(t,le,!0).isValid()&&n&&s)}},checkMaxLength:function(e){return function(t){return!!(t&&t.length<=e)}},checkMinLength:function(e){return function(t){return!!(t&&t.length>=e)}},checkForUpper:function(){return function(e){return/[A-Z]+/g.test(e)}},checkForLower:function(){return function(e){return/[a-z]+/g.test(e)}},checkForNumber:function(){return function(e){return/\d+/g.test(e)}},isChecked:function(){return function(e){return!!e}},checkPattern:function(e){return function(t){return new RegExp(e).test(t)}}},Ze=r(6447),we=r(6514),Ie=r(7918),Fe=r(5058),Ne=r(734),Se=r(891),Me=r(3390),Be=r(9197);function Ce(e){switch(e.iconKey){case"email":return n.createElement(Se.Z,null);case"firstName":case"lastName":return n.createElement(Fe.Z,null);case"birthdate":return n.createElement(Be.Z,null);case"password":return n.createElement(Me.Z,null);default:return n.createElement(Ne.Z,null)}}const Ve=function(e){var t=e.results;return n.createElement(s.Z,null,n.createElement(Ze.Z,{alignItems:"center",justifyContent:"center",flexDirection:"row",flexWrap:"wrap"},d().map(t,(function(e,t){return e?n.createElement(we.Z,{key:t,in:!0,timeout:500},n.createElement(Ie.Z,{sx:{m:.5,p:.5},icon:n.createElement(Ce,{iconKey:t}),label:"password"===t?"*******":""+e,variant:"outlined"})):null}))))};var qe={email:"",firstName:"",lastName:"",birthdate:"",password:""},ze=U.register,De=J.register,Le=(0,_.Z)({root:{margin:"0 auto"}});const Pe=function(){var e=Le(),t=(0,u.I0)(),r=(0,u.v9)((0,P.vc)(ze)),a=(0,u.v9)((0,P.ze)(ze)),i=(0,u.v9)((0,P.zi)(ze));(0,n.useEffect)((function(){t((0,P.Pq)(ze,De))}),[t]);var l=function(e){var t=(0,u.I0)();return[(0,n.useCallback)(function(){var r=(0,S.Z)(B().mark((function r(n){var a;return B().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return t((0,P.Zv)(e,n)),a=n,r.abrupt("return",t(be(a)));case 3:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}(),[t,e]),(0,n.useCallback)((function(){return t({type:"some_scope/EXIT"})}),[t])]}(ze),c=l[0],m=l[1];return(0,n.useEffect)((function(){return function(){m()}}),[m]),n.createElement(T.Z,{className:e.root,sx:{p:2},"data-testid":"form-example"},n.createElement(o.Z,{sx:{p:1},component:"h1",variant:"h6"},"Multi Step Registration Form Demo"),n.createElement(A.Z,null),n.createElement(s.Z,{sx:{m:2}},n.createElement(s.Z,{sx:{p:2}},n.createElement(O.Z,{activeStep:r},Object.keys(De.steps).map((function(e){return n.createElement(R.Z,{key:e},n.createElement(Y.Z,null,e))})))),n.createElement(z,{formId:ze,dictionary:ye,schema:De,defaultValues:d().isEmpty(i)?qe:i,onNextStep:function(e){t((0,P.Zv)(ze,e)),t((0,P.FE)(ze))},onSubmit:c,currentStepIndex:r,isLastStep:a,extraValidation:Ee})),n.createElement(Ve,{results:d().isEmpty(i)?qe:i}))};var Te=n.forwardRef((function(e){return n.createElement(a.Z,e)}));function Ae(){return n.createElement(s.Z,{component:"section",sx:{p:5}},n.createElement(s.Z,null,n.createElement(i.ZP,{container:!0},n.createElement(i.ZP,{sx:{p:2,m:"auto",textAlign:"center"},item:!0,xs:12,sm:6,md:6},n.createElement(o.Z,{sx:{m:2},component:"h1",variant:"h4",gutterBottom:!0},"A live example"),n.createElement(o.Z,{sx:{m:1}},"This registration form was generated using the FormBuilder component."),n.createElement(o.Z,{sx:{m:1}},"You can play with it here to see how a form behaves with our solution."),n.createElement(s.Z,{sx:{p:2},display:"flex",justifyContent:"center"},n.createElement(l.Z,{sx:{m:1},color:"primary",component:Te,variant:"contained",to:"https://github.com/BedrockStreaming/forms/blob/master/apps/docsite/src/form/form.component.jsx"},"See code sample"),n.createElement(l.Z,{sx:{m:1,color:"white",borderColor:"white"},component:Te,variant:"outlined",to:"https://codesandbox.io/s/cranky-buck-pdxxd?file=/src/App.js"},"Try it in CodeSandBox"))),n.createElement(i.ZP,{sx:{p:2},item:!0,xs:12,sm:6,md:6},n.createElement(Pe,null)))))}},8686:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>s});var n=r(7294),a=r(8743);const s=function(){return n.createElement(a.default,null)}},6700:(e,t,r)=>{var n={"./af":2786,"./af.js":2786,"./ar":867,"./ar-dz":4130,"./ar-dz.js":4130,"./ar-kw":6135,"./ar-kw.js":6135,"./ar-ly":6440,"./ar-ly.js":6440,"./ar-ma":7702,"./ar-ma.js":7702,"./ar-sa":6040,"./ar-sa.js":6040,"./ar-tn":7100,"./ar-tn.js":7100,"./ar.js":867,"./az":1083,"./az.js":1083,"./be":9808,"./be.js":9808,"./bg":8338,"./bg.js":8338,"./bm":7438,"./bm.js":7438,"./bn":8905,"./bn-bd":6225,"./bn-bd.js":6225,"./bn.js":8905,"./bo":1560,"./bo.js":1560,"./br":1278,"./br.js":1278,"./bs":622,"./bs.js":622,"./ca":2468,"./ca.js":2468,"./cs":5822,"./cs.js":5822,"./cv":877,"./cv.js":877,"./cy":7373,"./cy.js":7373,"./da":4780,"./da.js":4780,"./de":9740,"./de-at":217,"./de-at.js":217,"./de-ch":894,"./de-ch.js":894,"./de.js":9740,"./dv":5300,"./dv.js":5300,"./el":837,"./el.js":837,"./en-au":8348,"./en-au.js":8348,"./en-ca":7925,"./en-ca.js":7925,"./en-gb":2243,"./en-gb.js":2243,"./en-ie":6436,"./en-ie.js":6436,"./en-il":7207,"./en-il.js":7207,"./en-in":4175,"./en-in.js":4175,"./en-nz":6319,"./en-nz.js":6319,"./en-sg":1662,"./en-sg.js":1662,"./eo":2915,"./eo.js":2915,"./es":5655,"./es-do":2088,"./es-do.js":2088,"./es-mx":6112,"./es-mx.js":6112,"./es-us":1146,"./es-us.js":1146,"./es.js":5655,"./et":5603,"./et.js":5603,"./eu":7763,"./eu.js":7763,"./fa":6959,"./fa.js":6959,"./fi":1897,"./fi.js":1897,"./fil":2549,"./fil.js":2549,"./fo":4694,"./fo.js":4694,"./fr":4470,"./fr-ca":3049,"./fr-ca.js":3049,"./fr-ch":2330,"./fr-ch.js":2330,"./fr.js":4470,"./fy":5044,"./fy.js":5044,"./ga":9295,"./ga.js":9295,"./gd":2101,"./gd.js":2101,"./gl":8794,"./gl.js":8794,"./gom-deva":7884,"./gom-deva.js":7884,"./gom-latn":3168,"./gom-latn.js":3168,"./gu":5349,"./gu.js":5349,"./he":4206,"./he.js":4206,"./hi":94,"./hi.js":94,"./hr":316,"./hr.js":316,"./hu":2138,"./hu.js":2138,"./hy-am":1423,"./hy-am.js":1423,"./id":9218,"./id.js":9218,"./is":135,"./is.js":135,"./it":626,"./it-ch":150,"./it-ch.js":150,"./it.js":626,"./ja":9183,"./ja.js":9183,"./jv":4286,"./jv.js":4286,"./ka":2105,"./ka.js":2105,"./kk":7772,"./kk.js":7772,"./km":8758,"./km.js":8758,"./kn":9282,"./kn.js":9282,"./ko":3730,"./ko.js":3730,"./ku":1408,"./ku.js":1408,"./ky":3291,"./ky.js":3291,"./lb":6841,"./lb.js":6841,"./lo":5466,"./lo.js":5466,"./lt":7010,"./lt.js":7010,"./lv":7595,"./lv.js":7595,"./me":9861,"./me.js":9861,"./mi":5493,"./mi.js":5493,"./mk":5966,"./mk.js":5966,"./ml":7341,"./ml.js":7341,"./mn":5115,"./mn.js":5115,"./mr":370,"./mr.js":370,"./ms":9847,"./ms-my":1237,"./ms-my.js":1237,"./ms.js":9847,"./mt":2126,"./mt.js":2126,"./my":6165,"./my.js":6165,"./nb":4924,"./nb.js":4924,"./ne":6744,"./ne.js":6744,"./nl":3901,"./nl-be":9814,"./nl-be.js":9814,"./nl.js":3901,"./nn":3877,"./nn.js":3877,"./oc-lnc":2135,"./oc-lnc.js":2135,"./pa-in":5858,"./pa-in.js":5858,"./pl":4495,"./pl.js":4495,"./pt":9520,"./pt-br":7971,"./pt-br.js":7971,"./pt.js":9520,"./ro":6459,"./ro.js":6459,"./ru":1793,"./ru.js":1793,"./sd":950,"./sd.js":950,"./se":490,"./se.js":490,"./si":124,"./si.js":124,"./sk":4249,"./sk.js":4249,"./sl":4985,"./sl.js":4985,"./sq":1104,"./sq.js":1104,"./sr":9131,"./sr-cyrl":9915,"./sr-cyrl.js":9915,"./sr.js":9131,"./ss":5606,"./ss.js":5606,"./sv":8760,"./sv.js":8760,"./sw":1172,"./sw.js":1172,"./ta":7333,"./ta.js":7333,"./te":3110,"./te.js":3110,"./tet":2095,"./tet.js":2095,"./tg":7321,"./tg.js":7321,"./th":9041,"./th.js":9041,"./tk":9005,"./tk.js":9005,"./tl-ph":5768,"./tl-ph.js":5768,"./tlh":9444,"./tlh.js":9444,"./tr":2397,"./tr.js":2397,"./tzl":8254,"./tzl.js":8254,"./tzm":1106,"./tzm-latn":699,"./tzm-latn.js":699,"./tzm.js":1106,"./ug-cn":9288,"./ug-cn.js":9288,"./uk":7691,"./uk.js":7691,"./ur":3795,"./ur.js":3795,"./uz":6791,"./uz-latn":588,"./uz-latn.js":588,"./uz.js":6791,"./vi":5666,"./vi.js":5666,"./x-pseudo":4378,"./x-pseudo.js":4378,"./yo":5805,"./yo.js":5805,"./zh-cn":3839,"./zh-cn.js":3839,"./zh-hk":5726,"./zh-hk.js":5726,"./zh-mo":9807,"./zh-mo.js":9807,"./zh-tw":4152,"./zh-tw.js":4152};function a(e){var t=s(e);return r(t)}function s(e){if(!r.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}a.keys=function(){return Object.keys(n)},a.resolve=s,e.exports=a,a.id=6700}}]);