;(function($){
  $.fn.errors = function(errors){
    var fields = this
    fields.filter('.error').each(function(i, field){
      $(field).
        removeClass('error').
        find('ul.error-list').remove()
    })

    _.each(errors, function(messages, fieldName){
      fields.filter('.'+ fieldName).
        addClass('error').
        append( buildList(messages) )

    })
  }

  function buildList(messages){
    var list = $("<ul class='error-list'/>"),
        items = _.map(messages, function(message){ return "<li>"+ message +"</li>"})

    list.html( items.join("\n") )

    return list
  }
}(jQuery));