!function(){app.directive("planTomato",function(){return{restrict:"A",templateUrl:"templates/planTomato.html",link:function(){},scope:{tomato:"="},controller:["$scope","$element","$attrs",function(t){return t.addTask=function(){return t.tomato.addTask(t.task),t.task=""}}]}})}.call(this);