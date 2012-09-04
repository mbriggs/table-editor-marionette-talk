//= require libs
//= require widget.module
//= require jquery.errors
//= require_tree ./table-editor
//= require_tree ./templates
//= require_self

var App = new Backbone.Marionette.Application(),
    TableEditor = require('table-editor/table-editor'),
    WidgetCollection = require("widget").collection

App.bootstrap = {
  widgets: []
}

App.addRegions({
  mainContent: '#content'
})

App.addInitializer(function(){
  var widgets = new WidgetCollection(App.bootstrap.widgets),
      editor = new TableEditor({ collection: widgets })

  App.mainContent.show(editor)
})

module.exports = App
