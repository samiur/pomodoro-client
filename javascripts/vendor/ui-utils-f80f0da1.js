angular.module("ui.event",[]).directive("uiEvent",["$parse",function(e){return function(n,t,i){var r=n.$eval(i.uiEvent);angular.forEach(r,function(i,r){var u=e(i);t.bind(r,function(e){var t=Array.prototype.slice.call(arguments);t=t.splice(1),u(n,{$event:e,$params:t}),n.$$phase||n.$apply()})})}}]),angular.module("ui.format",[]).filter("format",function(){return function(e,n){var t=e;if(angular.isString(t)&&void 0!==n)if(angular.isArray(n)||angular.isObject(n)||(n=[n]),angular.isArray(n)){var i=n.length,r=function(e,t){return t=parseInt(t,10),t>=0&&i>t?n[t]:e};t=t.replace(/\$([0-9]+)/g,r)}else angular.forEach(n,function(e,n){t=t.split(":"+n).join(e)});return t}}),angular.module("ui.highlight",[]).filter("highlight",function(){return function(e,n,t){return n||angular.isNumber(n)?(e=e.toString(),n=n.toString(),t?e.split(n).join('<span class="ui-match">'+n+"</span>"):e.replace(new RegExp(n,"gi"),'<span class="ui-match">$&</span>')):e}}),angular.module("ui.include",[]).directive("uiInclude",["$http","$templateCache","$anchorScroll","$compile",function(e,n,t,i){return{restrict:"ECA",terminal:!0,compile:function(r,u){var a=u.uiInclude||u.src,o=u.fragment||"",l=u.onload||"",c=u.autoscroll;return function(r,u){function s(){var s=++d,h=r.$eval(a),p=r.$eval(o);h?e.get(h,{cache:n}).success(function(e){if(s===d){f&&f.$destroy(),f=r.$new();var n;n=p?angular.element("<div/>").html(e).find(p):angular.element("<div/>").html(e).contents(),u.html(n),i(n)(f),!angular.isDefined(c)||c&&!r.$eval(c)||t(),f.$emit("$includeContentLoaded"),r.$eval(l)}}).error(function(){s===d&&g()}):g()}var f,d=0,g=function(){f&&(f.$destroy(),f=null),u.html("")};r.$watch(o,s),r.$watch(a,s)}}}}]),angular.module("ui.indeterminate",[]).directive("uiIndeterminate",[function(){return{compile:function(e,n){return n.type&&"checkbox"===n.type.toLowerCase()?function(e,n,t){e.$watch(t.uiIndeterminate,function(e){n[0].indeterminate=!!e})}:angular.noop}}}]),angular.module("ui.inflector",[]).filter("inflector",function(){function e(e){return e.replace(/^([a-z])|\s+([a-z])/g,function(e){return e.toUpperCase()})}function n(e,n){return e.replace(/[A-Z]/g,function(e){return n+e})}var t={humanize:function(t){return e(n(t," ").split("_").join(" "))},underscore:function(e){return e.substr(0,1).toLowerCase()+n(e.substr(1),"_").toLowerCase().split(" ").join("_")},variable:function(n){return n=n.substr(0,1).toLowerCase()+e(n.split("_").join(" ")).substr(1).split(" ").join("")}};return function(e,n){return n!==!1&&angular.isString(e)?(n=n||"humanize",t[n](e)):e}}),angular.module("ui.jq",[]).value("uiJqConfig",{}).directive("uiJq",["uiJqConfig","$timeout",function(e,n){return{restrict:"A",compile:function(t,i){if(!angular.isFunction(t[i.uiJq]))throw new Error('ui-jq: The "'+i.uiJq+'" function does not exist');var r=e&&e[i.uiJq];return function(e,t,i){function u(){n(function(){t[i.uiJq].apply(t,a)},0,!1)}var a=[];i.uiOptions?(a=e.$eval("["+i.uiOptions+"]"),angular.isObject(r)&&angular.isObject(a[0])&&(a[0]=angular.extend({},r,a[0]))):r&&(a=[r]),i.ngModel&&t.is("select,input,textarea")&&t.bind("change",function(){t.trigger("input")}),i.uiRefresh&&e.$watch(i.uiRefresh,function(){u()}),u()}}}}]),angular.module("ui.keypress",[]).factory("keypressHelper",["$parse",function(e){var n={8:"backspace",9:"tab",13:"enter",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"insert",46:"delete"},t=function(e){return e.charAt(0).toUpperCase()+e.slice(1)};return function(i,r,u,a){var o,l=[];o=r.$eval(a["ui"+t(i)]),angular.forEach(o,function(n,t){var i,r;r=e(n),angular.forEach(t.split(" "),function(e){i={expression:r,keys:{}},angular.forEach(e.split("-"),function(e){i.keys[e]=!0}),l.push(i)})}),u.bind(i,function(e){var t=!(!e.metaKey||e.ctrlKey),u=!!e.altKey,a=!!e.ctrlKey,o=!!e.shiftKey,c=e.keyCode;"keypress"===i&&!o&&c>=97&&122>=c&&(c-=32),angular.forEach(l,function(i){var l=i.keys[n[c]]||i.keys[c.toString()],s=!!i.keys.meta,f=!!i.keys.alt,d=!!i.keys.ctrl,g=!!i.keys.shift;l&&s===t&&f===u&&d===a&&g===o&&r.$apply(function(){i.expression(r,{$event:e})})})})}}]),angular.module("ui.keypress").directive("uiKeydown",["keypressHelper",function(e){return{link:function(n,t,i){e("keydown",n,t,i)}}}]),angular.module("ui.keypress").directive("uiKeypress",["keypressHelper",function(e){return{link:function(n,t,i){e("keypress",n,t,i)}}}]),angular.module("ui.keypress").directive("uiKeyup",["keypressHelper",function(e){return{link:function(n,t,i){e("keyup",n,t,i)}}}]),angular.module("ui.mask",[]).value("uiMaskConfig",{maskDefinitions:{9:/\d/,A:/[a-zA-Z]/,"*":/[a-zA-Z0-9]/}}).directive("uiMask",["uiMaskConfig",function(e){return{priority:100,require:"ngModel",restrict:"A",compile:function(){var n=e;return function(e,t,i,r){function u(e){return angular.isDefined(e)?($(e),z?(s(),f(),!0):c()):c()}function a(e){angular.isDefined(e)&&(O=e,z&&w())}function o(e){return z?(j=h(e||""),H=g(j),r.$setValidity("mask",H),H&&j.length?p(j):void 0):e}function l(e){return z?(j=h(e||""),H=g(j),r.$viewValue=j.length?p(j):"",r.$setValidity("mask",H),""===j&&void 0!==r.$error.required&&r.$setValidity("required",!1),H?j:void 0):e}function c(){return z=!1,d(),angular.isDefined(I)?t.attr("placeholder",I):t.removeAttr("placeholder"),angular.isDefined(L)?t.attr("maxlength",L):t.removeAttr("maxlength"),t.val(r.$modelValue),r.$viewValue=r.$modelValue,!1}function s(){j=D=h(r.$modelValue||""),M=_=p(j),H=g(j);var e=H&&j.length?M:"";i.maxlength&&t.attr("maxlength",2*E[E.length-1]),t.attr("placeholder",O),t.val(e),r.$viewValue=e}function f(){J||(t.bind("blur",y),t.bind("mousedown mouseup",b),t.bind("input keyup click focus",w),J=!0)}function d(){J&&(t.unbind("blur",y),t.unbind("mousedown",b),t.unbind("mouseup",b),t.unbind("input",w),t.unbind("keyup",w),t.unbind("click",w),t.unbind("focus",w),J=!1)}function g(e){return e.length?e.length>=q:!0}function h(e){var n="",t=A.slice();return e=e.toString(),angular.forEach(R,function(n){e=e.replace(n,"")}),angular.forEach(e.split(""),function(e){t.length&&t[0].test(e)&&(n+=e,t.shift())}),n}function p(e){var n="",t=E.slice();return angular.forEach(O.split(""),function(i,r){e.length&&r===t[0]?(n+=e.charAt(0)||"_",e=e.substr(1),t.shift()):n+=i}),n}function v(e){var n=i.placeholder;return"undefined"!=typeof n&&n[e]?n[e]:"_"}function m(){return O.replace(/[_]+/g,"_").replace(/([^_]+)([a-zA-Z0-9])([^_])/g,"$1$2_$3").split("_")}function $(e){var n=0;if(E=[],A=[],O="","string"==typeof e){q=0;var t=!1,i=e.split("");angular.forEach(i,function(e,i){F.maskDefinitions[e]?(E.push(n),O+=v(i),A.push(F.maskDefinitions[e]),n++,t||q++):"?"===e?t=!0:(O+=e,n++)})}E.push(E.slice().pop()+1),R=m(),z=E.length>1?!0:!1}function y(){T=0,K=0,H&&0!==j.length||(M="",t.val(""),e.$apply(function(){r.$setViewValue("")}))}function b(e){"mousedown"===e.type?t.bind("mouseout",k):t.unbind("mouseout",k)}function k(){K=V(this),t.unbind("mouseout",k)}function w(n){n=n||{};var i=n.which,u=n.type;if(16!==i&&91!==i){var a,o=t.val(),l=_,c=h(o),s=D,f=!1,d=S(this)||0,g=T||0,v=d-g,m=E[0],$=E[c.length]||E.slice().shift(),y=K||0,b=V(this)>0,k=y>0,w=o.length>l.length||y&&o.length>l.length-y,A=o.length<l.length||y&&o.length===l.length-y,O=i>=37&&40>=i&&n.shiftKey,R=37===i,q=8===i||"keyup"!==u&&A&&-1===v,j=46===i||"keyup"!==u&&A&&0===v&&!k,M=(R||q||"click"===u)&&d>m;if(K=V(this),!O&&(!b||"click"!==u&&"keyup"!==u)){if("input"===u&&A&&!k&&c===s){for(;q&&d>m&&!x(d);)d--;for(;j&&$>d&&-1===E.indexOf(d);)d++;var H=E.indexOf(d);c=c.substring(0,H)+c.substring(H+1),f=!0}for(a=p(c),_=a,D=c,t.val(a),f&&e.$apply(function(){r.$setViewValue(c)}),w&&m>=d&&(d=m+1),M&&d--,d=d>$?$:m>d?m:d;!x(d)&&d>m&&$>d;)d+=M?-1:1;(M&&$>d||w&&!x(g))&&d++,T=d,C(this,d)}}}function x(e){return E.indexOf(e)>-1}function S(e){if(void 0!==e.selectionStart)return e.selectionStart;if(document.selection){e.focus();var n=document.selection.createRange();return n.moveStart("character",-e.value.length),n.text.length}return 0}function C(e,n){if(0!==e.offsetWidth&&0!==e.offsetHeight)if(e.setSelectionRange)e.focus(),e.setSelectionRange(n,n);else if(e.createTextRange){var t=e.createTextRange();t.collapse(!0),t.moveEnd("character",n),t.moveStart("character",n),t.select()}}function V(e){return void 0!==e.selectionStart?e.selectionEnd-e.selectionStart:document.selection?document.selection.createRange().text.length:0}var E,A,O,R,q,j,M,H,_,D,T,K,z=!1,J=!1,I=i.placeholder,L=i.maxlength,F={};i.uiOptions?(F=e.$eval("["+i.uiOptions+"]"),angular.isObject(F[0])&&(F=function(e,n){for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(n[t]?angular.extend(n[t],e[t]):n[t]=angular.copy(e[t]));return n}(n,F[0]))):F=n,i.$observe("uiMask",u),i.$observe("placeholder",a),r.$formatters.push(o),r.$parsers.push(l),t.bind("mousedown mouseup",b),Array.prototype.indexOf||(Array.prototype.indexOf=function(e){"use strict";if(null===this)throw new TypeError;var n=Object(this),t=n.length>>>0;if(0===t)return-1;var i=0;if(arguments.length>1&&(i=Number(arguments[1]),i!==i?i=0:0!==i&&1/0!==i&&i!==-1/0&&(i=(i>0||-1)*Math.floor(Math.abs(i)))),i>=t)return-1;for(var r=i>=0?i:Math.max(t-Math.abs(i),0);t>r;r++)if(r in n&&n[r]===e)return r;return-1})}}}}]),angular.module("ui.reset",[]).value("uiResetConfig",null).directive("uiReset",["uiResetConfig",function(e){var n=null;return void 0!==e&&(n=e),{require:"ngModel",link:function(e,t,i,r){var u;u=angular.element('<a class="ui-reset" />'),t.wrap('<span class="ui-resetwrap" />').after(u),u.bind("click",function(t){t.preventDefault(),e.$apply(function(){i.uiReset?r.$setViewValue(e.$eval(i.uiReset)):r.$setViewValue(n),r.$render()})})}}}]),angular.module("ui.route",[]).directive("uiRoute",["$location","$parse",function(e,n){return{restrict:"AC",scope:!0,compile:function(t,i){var r;if(i.uiRoute)r="uiRoute";else if(i.ngHref)r="ngHref";else{if(!i.href)throw new Error("uiRoute missing a route or href property on "+t[0]);r="href"}return function(t,i,u){function a(n){var i=n.indexOf("#");i>-1&&(n=n.substr(i+1)),c=function(){l(t,e.path().indexOf(n)>-1)},c()}function o(n){var i=n.indexOf("#");i>-1&&(n=n.substr(i+1)),c=function(){var i=new RegExp("^"+n+"$",["i"]);l(t,i.test(e.path()))},c()}var l=n(u.ngModel||u.routeModel||"$uiRoute").assign,c=angular.noop;switch(r){case"uiRoute":u.uiRoute?o(u.uiRoute):u.$observe("uiRoute",o);break;case"ngHref":u.ngHref?a(u.ngHref):u.$observe("ngHref",a);break;case"href":a(u.href)}t.$on("$routeChangeSuccess",function(){c()}),t.$on("$stateChangeSuccess",function(){c()})}}}}]),angular.module("ui.scrollfix",[]).directive("uiScrollfix",["$window",function(e){"use strict";return{require:"^?uiScrollfixTarget",link:function(n,t,i,r){function u(){var n;if(angular.isDefined(e.pageYOffset))n=e.pageYOffset;else{var r=document.compatMode&&"BackCompat"!==document.compatMode?document.documentElement:document.body;n=r.scrollTop}!t.hasClass("ui-scrollfix")&&n>i.uiScrollfix?t.addClass("ui-scrollfix"):t.hasClass("ui-scrollfix")&&n<i.uiScrollfix&&t.removeClass("ui-scrollfix")}var a=t[0].offsetTop,o=r&&r.$element||angular.element(e);i.uiScrollfix?"string"==typeof i.uiScrollfix&&("-"===i.uiScrollfix.charAt(0)?i.uiScrollfix=a-parseFloat(i.uiScrollfix.substr(1)):"+"===i.uiScrollfix.charAt(0)&&(i.uiScrollfix=a+parseFloat(i.uiScrollfix.substr(1)))):i.uiScrollfix=a,o.on("scroll",u),n.$on("$destroy",function(){o.off("scroll",u)})}}}]).directive("uiScrollfixTarget",[function(){"use strict";return{controller:function(e){this.$element=e}}}]),angular.module("ui.showhide",[]).directive("uiShow",[function(){return function(e,n,t){e.$watch(t.uiShow,function(e){e?n.addClass("ui-show"):n.removeClass("ui-show")})}}]).directive("uiHide",[function(){return function(e,n,t){e.$watch(t.uiHide,function(e){e?n.addClass("ui-hide"):n.removeClass("ui-hide")})}}]).directive("uiToggle",[function(){return function(e,n,t){e.$watch(t.uiToggle,function(e){e?n.removeClass("ui-hide").addClass("ui-show"):n.removeClass("ui-show").addClass("ui-hide")})}}]),angular.module("ui.unique",[]).filter("unique",["$parse",function(e){return function(n,t){if(t===!1)return n;if((t||angular.isUndefined(t))&&angular.isArray(n)){var i=[],r=angular.isString(t)?e(t):function(e){return e},u=function(e){return angular.isObject(e)?r(e):e};angular.forEach(n,function(e){for(var n=!1,t=0;t<i.length;t++)if(angular.equals(u(i[t]),u(e))){n=!0;break}n||i.push(e)}),n=i}return n}}]),angular.module("ui.validate",[]).directive("uiValidate",function(){return{restrict:"A",require:"ngModel",link:function(e,n,t,i){function r(n){return angular.isString(n)?(e.$watch(n,function(){angular.forEach(a,function(e){e(i.$modelValue)})}),void 0):angular.isArray(n)?(angular.forEach(n,function(n){e.$watch(n,function(){angular.forEach(a,function(e){e(i.$modelValue)})})}),void 0):(angular.isObject(n)&&angular.forEach(n,function(n,t){angular.isString(n)&&e.$watch(n,function(){a[t](i.$modelValue)}),angular.isArray(n)&&angular.forEach(n,function(n){e.$watch(n,function(){a[t](i.$modelValue)})})}),void 0)}var u,a={},o=e.$eval(t.uiValidate);o&&(angular.isString(o)&&(o={validator:o}),angular.forEach(o,function(n,t){u=function(r){var u=e.$eval(n,{$value:r});return angular.isObject(u)&&angular.isFunction(u.then)?(u.then(function(){i.$setValidity(t,!0)},function(){i.$setValidity(t,!1)}),r):u?(i.$setValidity(t,!0),r):(i.$setValidity(t,!1),void 0)},a[t]=u,i.$formatters.push(u),i.$parsers.push(u)}),t.uiValidateWatch&&r(e.$eval(t.uiValidateWatch)))}}}),angular.module("ui.utils",["ui.event","ui.format","ui.highlight","ui.include","ui.indeterminate","ui.inflector","ui.jq","ui.keypress","ui.mask","ui.reset","ui.route","ui.scrollfix","ui.showhide","ui.unique","ui.validate"]);