meBankApp.directive(
    'initialFocus', 
    function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                attrs.$observe('initialFocus', function (value) {
                    if (value === 'true') {
                        element[0].focus();
                        element[0].setAttribute('initial-focus', 'false');
                    }
                });
            }
        };
    });