var Widget = require('widget').model

var CreateView = Backbone.Marionette.ItemView.extend({
  tagName: 'tr',
  className: 'new',
  template: 'table-editor/new-row',

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
  },

  initialize: function(opts){
    this.collection = opts.collection
    this.model = new Widget()
  },

  create: function(){
    var data = this.ui.fields.serializeObj(),
        collection = this.collection,
        addToCollection = function(model){collection.add(model)}

    this.model.save(data, {success: addToCollection})
  },

  addModel: function(){
    this.unbindAllFor(this.model)
    this.collection.add(this.model)

    this.model = new Widget()
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

module.exports = CreateView