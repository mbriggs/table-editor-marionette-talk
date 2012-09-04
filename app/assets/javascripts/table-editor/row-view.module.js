var RowView = Backbone.Marionette.ItemView.extend({
  tagName: 'tr',
  mode: 'view',

  constructor: function(options){
    Backbone.Marionette.ItemView.prototype.constructor.apply(this, arguments)

    applyDefaults(this, 'ui')

    applyDefaults(this, 'events')
    this.delegateEvents()

    applyDefaults(this, 'modelEvents')
    this.bindBackboneEntityTo(this.model, this.modelEvents)
  },

  getTemplate: function(){
    if(this.mode == 'view'){
      return this.viewTemplate
    } else {
      return this.editTemplate
    }
  },

  editMode: function(){
    this.mode = 'edit'
    this.render()
  },

  viewMode: function(){
    this.mode = 'view'
    this.render()
  },

  maybeSave: function(e){
    var enter = 13
    if(e.which == enter) this.save()
  },

  delete: function(){
    this.model.destroy()
  },

  save: function(){
    var data = this.ui.fields.serializeObj()
    this.model.save(data, {wait: true})
  },

  showErrors: function(model, resp){
    var errors = JSON.parse(resp.responseText)
    this.ui.controlGroups.errors(errors)
  }
})

function applyDefaults(view, obj){
  view[obj] = _.extend(defaults[obj], view[obj])
}

var defaults = {
  events: {
    'click .actions .destroy': 'delete',
    'click .actions .edit': 'editMode',
    'click .actions .cancel-edit': 'viewMode',
    'click .actions .save': 'save',
    'keydown input': 'maybeSave'
  },

  modelEvents: {
    'update': 'viewMode',
    'error': 'showErrors'
  },

  ui: {
    fields: ':input',
    controlGroups: '.control-group'
  }
}

module.exports = RowView
