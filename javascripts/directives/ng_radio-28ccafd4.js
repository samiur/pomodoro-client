!function(){app.directive("ngRadio",function(){return{restrict:"C",require:"ngModel",link:function(n,e,o){return $(e).radio(),n.$watch(o.ngModel,function(){return $(e).radio("radio",o.ngModel)}),e.on("toggle",function(e){return console.log(e),n.$apply(function(){return n.$eval(""+o.ngModel+" = "+e.target.value)})})}}})}.call(this);