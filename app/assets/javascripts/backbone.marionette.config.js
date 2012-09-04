;(function(){
  // make marionette use JST rather then its template lookup/cache
  Backbone.Marionette.Renderer.render = function(template, data){
    return JST['templates/'+ template](data)
  }


  var initialize = Backbone.Marionette.View.prototype.constructor

  Backbone.Marionette.View.prototype.constructor = function(){
    initialize.apply(this, arguments)
    this.bindBackboneEntityTo(this.model, this.modelEvents)
    this.bindBackboneEntityTo(this.collection, this.collectionEvents)
  }

  Backbone.Marionette.View.prototype.bindBackboneEntityTo = function(entity, bindings){
    if (!entity || !bindings) return

    var view = this

    _.each(bindings, function(methodName, evt){
      var method = view[methodName]
      if(!method) throw new Error("method '"+ methodName +"' does not exist")

      view.bindTo(entity, evt, method, view)
    })
  }

  Backbone.View.prototype.unbindAllFor = function(obj){
    var view = this

    _(this._eventBindings).chain().
      filter(function(b){ return b.obj === obj }).
      each(function(b){ view.unbindFrom(b) })
  }
}())
