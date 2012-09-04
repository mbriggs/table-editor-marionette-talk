//= require libs
//= require widget.module
//= require jquery.errors
//= require_tree ./table-editor
//= require_tree ./templates
//= require jquery.tableEditor
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
  $("#content").tableEditor({
    urlRoot: '/widgets',
    data: App.bootstrap.widgets,
    tableTemplate: 'table-editor/table',
    createTemplate: 'table-editor/new-row',
    rowTemplate: 'table-editor/row',
    editRowTemplate: 'table-editor/edit-row'
  })
})

module.exports = App
