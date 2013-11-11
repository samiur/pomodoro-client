app.controller 'DashboardCtrl', ["$scope", "$cookieStore", "$rootScope", "$window", "Tomato", "User", "Session", ($scope, $cookieStore, $rootScope, $window, Tomato, User, Session) ->
  unless Session.loggedIn()
    $window.location = 'home.html'

  $scope.loaded = false

  $scope.$on 'currentUserReady', ->
    console.log $scope.currentUser
    $scope.tomatoes = $scope.currentUser.tomatoes
    $scope.completedTomatoes = _.where($scope.tomatoes, {completed: true})
    $scope.lastTomato = _.last($scope.tomatoes)
    $scope.loaded = true

  $scope.taskList = (tomato) ->
    _.map(tomato.tasks, 'name').join(',')

  $scope.toString = (time) ->
    mins = time/60
    secs = time%60

    min_unit = if mins <= 1 then "min" else "mins"
    sec_unit = if secs <= 1 then "sec" else "secs"

    if secs == 0
      "#{mins} #{min_unit}"
    else
      "#{mins} #{min_unit} and #{secs} #{sec_unit}"
]
