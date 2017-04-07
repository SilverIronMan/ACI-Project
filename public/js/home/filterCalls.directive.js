angular.module('app').directive('filterCalls', function (listCalls, passMultipleCallsData) {
  return {
    restrict: 'A',
    link: function (scope, element) {
      element[0].querySelector('#submitFilter').addEventListener('click', function () {
        const filter = element[0].querySelector('#filterCallsBy').value;
        listCalls.getData(filter).then(function (data, error) {
          if (error) {
            console.log('Error in getting call list');
            return;
          }
          if (element[0].querySelector('#filterCallsSelector').checked) {
            scope.callData = [];
            for (let i = 0; i < data.data.Contents.length; ++i) {
              // This is specific to Affiliated Creditors System
              if (data.data.Contents[i].Key.substr(33, 7).match(/~....~[^\*]/)
                || data.data.Contents[i].Key.substr(44, 6).match(/~....~/)) {
                scope.callData.push(data.data.Contents[i]);
              }
            }
          } else {
            scope.callData = data.data.Contents;
          }
          scope.$apply();
          scope.multipleKeys = [];
          element[0].querySelectorAll('.callMultiSelect').forEach(function (elem) {
            elem.addEventListener('change', function () {
              if (elem.checked) {
                scope.multipleKeys.push(elem.value);
              } else {
                // TODO
              }
            });
          });
        });

        // Add the multiple call submit button
        scope.displayMultipleSubmitButton = true;
      });

      element[0].querySelector('#multiSubmit').addEventListener('click', function () {
        console.log('submit!', scope.multipleKeys);
        passMultipleCallsData.set(scope.multipleKeys);
      });
    },
  };
});
