/**
 * Created by manu on 18.05.16.
 * Pausing watchers of elements that are currently not visible
 */
(function(){
    'use strict';

    angular.module('app',['angular-inview'])
        .controller('DemoController',function($scope){
            var vm = this;

            vm.config = {
                rows: 200,
                debounceScroll: 0 // ms
            };

            vm.rowVisible = [];

            function generateRows( ) {
                var rows = [];
                for ( var i = 0; i < vm.config.rows; i++ ) {
                    var d = new Date();
                    rows.push( [
                        'First Name ' + i,
                        'Last Name ' + i,
                        'name' + i + '@domain.com',
                        '+00491234567' + i,
                        'Extra Column 1 - ' + i,
                        'Extra Column 2 - ' + i,
                        'Extra Column 3 - ' + i,
                        'Extra Column 4 - ' + i,
                        'Extra Column 5 - ' + i,
                        'Extra Column 6 - ' + i,
                        '@name' + i,
                        i + '-' + i,
                        d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
                    ] );
                }
                return rows;
            }

            vm.table = {
                cols: [ 'First Name', 'Last Name', 'Phone','extra column 1','extra column 2','extra column 3','extra column 4','extra column 5','extra column 6','Email', 'Twitter', 'Id', 'Modified' ],
                rows: generateRows()
            };

            vm.changed = function(){
                // dummy method for watcher..
                console.log("changed");
            }
        })

        // thanks to:
        // https://gist.github.com/timelf123/e86366583e6c3079febc
        .directive('pauseChildrenWatchersIf', function(){
            return {
                link: function (scope, element, attrs) {

                    scope.$watch(attrs.pauseChildrenWatchersIf, function (newVal) {
                        if (newVal === undefined) {
                            return;
                        }
                        if (newVal) {
                            toggleChildrenWatchers(element, true)
                        } else {
                            toggleChildrenWatchers(element, false)
                        }
                    });
                    function toggleChildrenWatchers(element, pause) {
                        angular.forEach(element.children(), function (childElement) {
                            toggleAllWatchers(angular.element(childElement), pause);
                        });
                    }

                    function toggleAllWatchers(element, pause) {
                        var data = element.data();
                        if (data.hasOwnProperty('$scope') && data.$scope.hasOwnProperty('$$watchers') && data.$scope.$$watchers) {
                            if (pause) {
                                data._bk_$$watchers = [];
                                $.each(data.$scope.$$watchers, function (i, watcher) {
                                    data._bk_$$watchers.push($.extend(true, {}, watcher))
                                });

                                data.$scope.$$watchers = [];
                            } else {
                                if (data.hasOwnProperty('_bk_$$watchers')) {
                                    $.each(data._bk_$$watchers, function (i, watcher) {
                                        data.$scope.$$watchers.push($.extend(true, {}, watcher))
                                    });
                                }
                            }

                        }
                        toggleChildrenWatchers(element, pause);
                    }
                }
            }
        });
})();