meBankApp.directive('meDonut', function () {
    return {
        templateUrl: 'app/shared/templates/meDonut.html',
        restrict: 'AE',
        scope: { options: '<' },
        controllerAs: 'vm',
        controller: ['$scope', '$element', function ($scope, $element) {
            var vm = this;

            angular.merge(vm, $scope.options);

            vm.getHeight = function () { return vm.size + 'px'; };
            vm.getWidth = function () { return vm.size + 'px'; };
            vm.getCenterX = function () { return vm.size / 2; };
            vm.getCenterY = function () { return vm.size / 2; };


            angular.forEach(vm.charts, function (chart) {
                chart.d = describeArc(vm.getCenterX(), vm.getCenterY(), chart.r, 0, percentToAngle(chart.getPercent()));
            });

            //////////////////////////////////////
            function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
                var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
                return {
                    x: centerX + (radius * Math.cos(angleInRadians)),
                    y: centerY + (radius * Math.sin(angleInRadians))
                };
            }

            function describeArc(x, y, radius, startAngle, endAngle) {
                var start = polarToCartesian(x, y, radius, endAngle);
                var end = polarToCartesian(x, y, radius, startAngle);

                var arcSweep = endAngle - startAngle <= 180 ? "0" : "1";

                var d = [
                    "M", start.x, start.y,
                    "A", radius, radius, 0, arcSweep, 0, end.x, end.y
                ].join(" ");

                return d;
            }

            function percentToAngle(percent) {
                return (percent / 100) * 360;
            }
        }]
    };
});