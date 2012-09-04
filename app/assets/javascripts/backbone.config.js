;(function(){
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'delete': 'DELETE',
    'read':   'GET'
  }

  var urlError = function() {
    throw new Error('A "url" property or function must be specified')
  }

  Backbone.sync = function(method, model, options) {
    options || (options = {})

    var type = methodMap[method]
    var params = {type: type, dataType: 'json'}

    if (!options.url) {
      params.url = _.result(model, 'url') || urlError()
    }

    if (!options.data && model && (method === 'create' || method === 'update')) {
      params.contentType = 'application/json'
      params.data = JSON.stringify(model)
    }

    if (params.type !== 'GET') {
      params.processData = false
    }

    var success = options.success
    options.success = function(resp, status, xhr) {
      if (success) success(resp, status, xhr)
      model.trigger(method)
      model.trigger('sync', model, resp, options)
    }

    var error = options.error
    options.error = function(xhr, status, thrown) {
      if (error) error(model, xhr, options)
      model.trigger('error', model, xhr, options)
    }

    return Backbone.ajax(_.extend(params, options))
  }
}());
