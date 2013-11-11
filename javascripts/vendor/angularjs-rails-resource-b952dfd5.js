!function(){angular.module("rails",["ng"])}(),function(){angular.module("rails").factory("RailsInflector",function(){function t(t){return angular.isString(t)?t.replace(/_[\w\d]/g,function(t,e,r){return 0===e?t:r.charAt(e+1).toUpperCase()}):t}function e(t){return angular.isString(t)?t.replace(/[A-Z]/g,function(t,e){return 0===e?t:"_"+t.toLowerCase()}):t}function r(t){return t+"s"}return{camelize:t,underscore:e,pluralize:r}})}(),function(t){angular.module("rails").factory("RailsResourceInjector",["$injector",function(e){function r(r){return r?angular.isString(r)?e.get(r):r:t}function n(n){return n?e.instantiate(r(n)):t}return{createService:n,getDependency:r}}])}(),function(){angular.module("rails").factory("railsUrlBuilder",["$interpolate",function(t){return function(e){var r;return angular.isFunction(e)||angular.isUndefined(e)?e:(-1===e.indexOf(t.startSymbol())&&(e=e+"/"+t.startSymbol()+"id"+t.endSymbol()),r=t(e),function(t){return e=r(t),"/"===e.charAt(e.length-1)&&(e=e.substr(0,e.length-1)),e})}}])}(),function(t){angular.module("rails").provider("railsSerializer",function(){var e={underscore:t,camelize:t,pluralize:t,exclusionMatchers:[]};this.underscore=function(t){return e.underscore=t,this},this.camelize=function(t){return e.camelize=t,this},this.pluralize=function(t){return e.pluralize=t,this},this.exclusionMatchers=function(t){return e.exclusionMatchers=t,this},this.$get=["$injector","RailsInflector","RailsResourceInjector",function(r,n,i){function o(r,n){function o(){angular.isFunction(r)&&(n=r,r={}),this.exclusions={},this.inclusions={},this.serializeMappings={},this.deserializeMappings={},this.customSerializedAttributes={},this.preservedAttributes={},this.customSerializers={},this.nestedResources={},this.options=angular.extend({excludeByDefault:!1},e,r||{}),n&&n.call(this,this)}return o.prototype.exclude=function(){var t=this.exclusions;return angular.forEach(arguments,function(e){t[e]=!1}),this},o.prototype.only=function(){var t=this.inclusions;return this.options.excludeByDefault=!0,angular.forEach(arguments,function(e){t[e]=!0}),this},o.prototype.nestedAttribute=function(){var t=this;return angular.forEach(arguments,function(e){t.rename(e,e+"_attributes")}),this},o.prototype.resource=function(t,e,r){return this.nestedResources[t]=e,r&&this.serializeWith(t,r),this},o.prototype.rename=function(e,r,n){return this.serializeMappings[e]=r,(n||n===t)&&(this.deserializeMappings[r]=e),this},o.prototype.add=function(t,e){return this.customSerializedAttributes[t]=e,this},o.prototype.preserve=function(t){return this.preservedAttributes[t]=!0,this},o.prototype.serializeWith=function(t,e){return this.customSerializers[t]=e,this},o.prototype.isExcludedFromSerialization=function(e){if(this.options.excludeByDefault&&!this.inclusions.hasOwnProperty(e)||this.exclusions.hasOwnProperty(e))return!0;if(this.options.exclusionMatchers){var r=!1;return angular.forEach(this.options.exclusionMatchers,function(n){angular.isString(n)?r=r||0===e.indexOf(n):angular.isFunction(n)?r=r||n.call(t,e):n instanceof RegExp&&(r=r||n.test(e))}),r}return!1},o.prototype.getSerializedAttributeName=function(e){var r=this.serializeMappings[e]||e,n=this.isExcludedFromSerialization(r),i=this.isExcludedFromSerialization(e);if(this.options.excludeByDefault){if(n&&i)return t}else if(n||i)return t;return this.underscore(r)},o.prototype.isExcludedFromDeserialization=function(){return!1},o.prototype.getDeserializedAttributeName=function(e){var r=this.camelize(e);return r=this.deserializeMappings[e]||this.deserializeMappings[r]||r,this.isExcludedFromDeserialization(e)||this.isExcludedFromDeserialization(r)?t:r},o.prototype.getNestedResource=function(t){return i.getDependency(this.nestedResources[t])},o.prototype.getAttributeSerializer=function(e){var r=this.getNestedResource(e),n=this.customSerializers[e];return n?i.createService(n):r?r.config.serializer:t},o.prototype.serializeValue=function(t){var e=t,r=this;if(angular.isArray(t))e=[],angular.forEach(t,function(t){e.push(r.serializeValue(t))});else if(angular.isObject(t)){if(angular.isDate(t))return t;e={},angular.forEach(t,function(t,n){angular.isFunction(t)||r.serializeAttribute(e,n,t)})}return e},o.prototype.serializeAttribute=function(e,r,n){var i=this.getAttributeSerializer(r),o=this.getSerializedAttributeName(r);o!==t&&(e[o]=i?i.serialize(n):this.serializeValue(n))},o.prototype.serialize=function(t){var e=this.serializeValue(t),r=this;return angular.isObject(e)&&angular.forEach(this.customSerializedAttributes,function(n,i){angular.isFunction(n)&&(n=n.call(t,t)),r.serializeAttribute(e,i,n)}),e},o.prototype.deserializeValue=function(t,e){var r=t,n=this;if(angular.isArray(t))r=[],angular.forEach(t,function(t){r.push(n.deserializeValue(t,e))});else if(angular.isObject(t)){if(angular.isDate(t))return t;r={},e&&(r=new e.config.resourceConstructor),angular.forEach(t,function(t,e){n.deserializeAttribute(r,e,t)})}return r},o.prototype.deserializeAttribute=function(e,r,n){var i,o,s=this.getDeserializedAttributeName(r);s!==t&&(i=this.getAttributeSerializer(s),o=this.getNestedResource(s),e[s]=this.preservedAttributes[s]?n:i?i.deserialize(n,o):this.deserializeValue(n,o))},o.prototype.deserialize=function(t,e){return this.deserializeValue(t,e)},o.prototype.pluralize=function(t){return this.options.pluralize?this.options.pluralize(t):t},o.prototype.underscore=function(t){return this.options.underscore?this.options.underscore(t):t},o.prototype.camelize=function(t){return this.options.camelize?this.options.camelize(t):t},o}return e.underscore=e.underscore||n.underscore,e.camelize=e.camelize||n.camelize,e.pluralize=e.pluralize||n.pluralize,o.defaultOptions=e,o}]})}(),function(t){angular.module("rails").factory("railsRootWrappingTransformer",function(){return function(t,e){var r={};return r[angular.isArray(t)?e.config.pluralName:e.config.name]=t,r}}),angular.module("rails").factory("railsRootWrappingInterceptor",function(){return function(t){var e=t.resource;return e?t.then(function(t){return t.data&&t.data.hasOwnProperty(e.config.name)?t.data=t.data[e.config.name]:t.data&&t.data.hasOwnProperty(e.config.pluralName)&&(t.data=t.data[e.config.pluralName]),t}):t}}),angular.module("rails").provider("RailsResource",function(){var e={rootWrapping:!0,updateMethod:"put",httpConfig:{},defaultParams:t};this.rootWrapping=function(t){return e.rootWrapping=t,this},this.updateMethod=function(t){return e.updateMethod=t,this},this.httpConfig=function(t){return e.httpConfig=t,this},this.defaultParams=function(t){return e.defaultParams=t,this},this.$get=["$http","$q","railsUrlBuilder","railsSerializer","railsRootWrappingTransformer","railsRootWrappingInterceptor","RailsResourceInjector",function(r,n,i,o,s,u,a){function c(t,e){return e&&("/"!==e[0]&&(t+="/"),t+=e),t}function l(t,e){for(var r,n=0,i=t.length;i>n;n++)r=t[n],angular.isString(r)&&(r=t[n]=a.getDependency(r)),e(r)}function p(t){var e=this;if(t){var r=function(t){return{resource:p,context:e,response:t,then:function(t){return this.response=t(this.response,this.resource,this.context),r(this.response)}}},n=this.constructor.callInterceptors(r({data:t}),this).response.data;angular.extend(this,n)}}return p.extend=function(t){function e(){this.constructor=t}var r={}.hasOwnProperty,n=this;for(var i in n)r.call(n,i)&&(t[i]=n[i]);return e.prototype=n.prototype,t.prototype=new e,t.__super__=n.prototype,t},p.configure=function(r){r=r||{},this.config&&(r=angular.extend({},this.config,r)),this.config={},this.config.url=r.url,this.config.rootWrapping=r.rootWrapping===t?e.rootWrapping:r.rootWrapping,this.config.httpConfig=r.httpConfig||e.httpConfig,this.config.httpConfig.headers=angular.extend({Accept:"application/json","Content-Type":"application/json"},this.config.httpConfig.headers||{}),this.config.defaultParams=r.defaultParams||e.defaultParams,this.config.updateMethod=(r.updateMethod||e.updateMethod).toLowerCase(),this.config.requestTransformers=r.requestTransformers?r.requestTransformers.slice(0):[],this.config.responseInterceptors=r.responseInterceptors?r.responseInterceptors.slice(0):[],this.config.afterResponseInterceptors=r.afterResponseInterceptors?r.afterResponseInterceptors.slice(0):[],this.config.serializer=angular.isObject(r.serializer)?r.serializer:a.createService(r.serializer||o()),this.config.name=this.config.serializer.underscore(r.name),this.config.pluralName=this.config.serializer.underscore(r.pluralName||this.config.serializer.pluralize(this.config.name)),this.config.urlBuilder=i(this.config.url),this.config.resourceConstructor=this},p.configure({}),p.setUrl=function(t){this.configure({url:t})},p.buildUrl=function(t){return this.config.urlBuilder(t)},p.beforeResponse=function(t){t=a.getDependency(t),this.config.responseInterceptors.push(function(e){return e.then(function(r){return t(r.data,e.resource.config.resourceConstructor,e.context),r})})},p.afterResponse=function(t){t=a.getDependency(t),this.config.afterResponseInterceptors.push(function(e){return e.then(function(r){return t(r,e.resource.config.resourceConstructor),r})})},p.beforeRequest=function(t){t=a.getDependency(t),this.config.requestTransformers.push(function(e,r){return t(e,r.config.resourceConstructor)||e})},p.transformData=function(t){var e=this.config;return t=e.serializer.serialize(t),l(this.config.requestTransformers,function(r){t=r(t,e.resourceConstructor)}),e.rootWrapping&&(t=s(t,e.resourceConstructor)),t},p.callInterceptors=function(t,e){var r=this.config;return t=t.then(function(t){return t.originalData=t.data,t}),r.rootWrapping&&(t.resource=r.resourceConstructor,t=u(t)),t.then(function(t){return t.data=r.serializer.deserialize(t.data,r.resourceConstructor),t}),l(r.responseInterceptors,function(n){t.resource=r.resourceConstructor,t.context=e,t=n(t)}),t},p.callAfterInterceptors=function(t){var e=this.config;return l(e.afterResponseInterceptors,function(r){t.resource=e.resourceConstructor,t=r(t)}),t},p.processResponse=function(t){return t=this.callInterceptors(t).then(function(t){return t.data}),this.callAfterInterceptors(t)},p.getParameters=function(t){var e;return this.config.defaultParams&&(e=this.config.defaultParams),angular.isObject(t)&&(e=angular.extend(e||{},t)),e},p.getHttpConfig=function(t){var e=this.getParameters(t);return e?angular.extend({params:e},this.config.httpConfig):angular.copy(this.config.httpConfig)},p.$url=p.resourceUrl=function(t,e){return angular.isObject(t)||(t={id:t}),c(this.buildUrl(t||{}),e)},p.$get=function(t,e){return this.processResponse(r.get(t,this.getHttpConfig(e)))},p.query=function(t,e){return this.$get(this.resourceUrl(e),t)},p.get=function(t,e){return this.$get(this.resourceUrl(t),e)},p.prototype.$url=function(t){return c(this.constructor.resourceUrl(this),t)},p.prototype.processResponse=function(t){return t=this.constructor.callInterceptors(t,this),t=t.then(angular.bind(this,function(t){return t.hasOwnProperty("data")&&angular.isObject(t.data)&&angular.extend(this,t.data),this})),this.constructor.callAfterInterceptors(t)},angular.forEach(["post","put","patch"],function(t){p["$"+t]=function(e,n){var i;return n=this.transformData(angular.copy(n,{})),i=angular.extend({method:t,url:e,data:n},this.getHttpConfig()),this.processResponse(r(i))},p.prototype["$"+t]=function(e){var n,i;return n=this.constructor.transformData(angular.copy(this,{})),i=angular.extend({method:t,url:e,data:n},this.constructor.getHttpConfig()),this.processResponse(r(i))}}),p.prototype.create=function(){return this.$post(this.$url(),this)},p.prototype.update=function(){return this["$"+this.constructor.config.updateMethod](this.$url(),this)},p.prototype.isNew=function(){return null==this.id},p.prototype.save=function(){return this.isNew()?this.create():this.update()},p.$delete=function(t){return this.processResponse(r["delete"](t,this.getHttpConfig()))},p.prototype.$delete=function(t){return this.processResponse(r["delete"](t,this.constructor.getHttpConfig()))},p.prototype.remove=p.prototype["delete"]=function(){return this.$delete(this.$url())},p}]}),angular.module("rails").factory("railsResourceFactory",["RailsResource",function(t){return function(e){function r(){r.__super__.constructor.apply(this,arguments)}return t.extend(r),r.configure(e),r}}])}();