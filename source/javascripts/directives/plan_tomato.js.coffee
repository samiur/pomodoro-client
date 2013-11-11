app.directive 'planTomato', ->
  restrict: "A"
  templateUrl: '/templates/planTomato.html'
  link: (scope, elem, attrs) ->
  scope:
    tomato: "="
  controller: ["$scope", "$element", "$attrs", ($scope, $element, $attrs) ->
    $scope.addTask = () ->
      $scope.tomato.addTask($scope.task)
      $scope.task = ""
  ]
