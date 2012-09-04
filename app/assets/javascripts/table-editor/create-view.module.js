var CreateView = Backbone.Marionette.ItemView.extend({
  tagName: 'tr',
  className: 'new',

  constructor: function(opts){
    Backbone.Marionette.ItemView.prototype.constructor.apply(this, arguments)

    this.collection = opts.collection
    this.modelClass = opts.collection.model
    this.model = new this.modelClass()

    applyDefaults(this, 'events')
    this.delegateEvents()

    applyDefaults(this, 'ui')

    applyDefaults(this, 'collectionEvents')
    this.bindBackboneEntityTo(this.collection, this.collectionEvents)

    applyDefaults(this, 'modelEvents')
    this.bindBackboneEntityTo(this.model, this.modelEvents)
  },

  create: function(){
    var data = this.ui.fields.serializeObj()

    this.model.save(data)
  },

  addModel: function(){
    this.unbindAllFor(this.model)
    this.collection.add(this.model)

    this.model = new this.modelClass()
    this.bindBackboneEntityTo(this.model, this.modelEvents)

    this.render()
  },

  clear: function(){
    this.ui.fields.val('')
  },

  maybeCreate: function(e){
    var enter = 13
    if(e.which == enter) this.create()
  },

  setErrors: function(model, resp){
    var errors = JSON.parse(resp.responseText)
    this.ui.controlGroups.errors(errors)
  }
})

var defaults = {
  events: {
    'click .actions .save': 'create',
    'keydown input': 'maybeCreate'
  },

  ui: {
    fields: ':input',
    controlGroups: '.control-group'
  },

  collectionEvents: {
    add: 'clear'
  },

  modelEvents: {
    error: 'setErrors',
    create: 'addModel'
  }
}

function applyDefaults(view, obj){
  view[obj] = _.extend(defaults[obj], view[obj])
}

module.exports = CreateView