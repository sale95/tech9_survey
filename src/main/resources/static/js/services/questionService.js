(function () {
  angular.module("app")
    .factory('QuestionService', QuestionService);

  QuestionService.$inject = ['$http', '$q'];

  function QuestionService($http, $q) {

    var service = {
      saveQuestion: saveQuestion,
      deleteQuestion: deleteQuestion
    }

    function saveQuestion(surveyId, question) {
      var def = $q.defer();
      var req = {
        method: 'POST',
        url: "question/" + surveyId,
        data: question
      }
      $http(req).success(function (data) {
        def.resolve(data);
      })
        .error(function () {
        def.reject("Failed to save a question!");
      });
      return def.promise;
    }

    function deleteQuestion(surveyId, questionId) {
      var def = $q.defer();
      var req = {
        method: 'DELETE',
        url: "question/" + surveyId + "/" + questionId
      }
      $http(req).success(function (data) {
        def.resolve(data);
      })
        .error(function () {
        def.reject("Failed to delete a question!");
      });
      return def.promise;
    }

    return service;

  }
} ());