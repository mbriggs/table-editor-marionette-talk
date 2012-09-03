;(function(){
  // make marionette use JST rather then its template lookup/cache
  Backbone.Marionette.Renderer.render = function(template, data){
    return JST['templates/'+ template](data)
  }

  // monkey patch based on pull request that is going into the next version
  // https://github.com/derickbailey/backbone.marionette/pull/231
  var bindBackboneEntityTo = function(entity, view, bindings){
    if (!entity || !bindings) return

    _.each(bindings, function(methodName, evt){
      var method = view[methodName]
      if(!method) throw new Error("method '"+ methodName +"' does not exist")
      view.bindTo(entity, evt, method, view)
    })
  }

  var renderItemView = Backbone.Marionette.ItemView.prototype.render

  Backbone.Marionette.ItemView.prototype.render = function(){
    renderItemView.apply(this, arguments)

    bindBackboneEntityTo(this.model, this.modelEvents)
    bindBackboneEntityTo(this.collection, this.collectionEvents)
  }
})
