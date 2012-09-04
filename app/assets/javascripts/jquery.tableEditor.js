;(function($){
  var tableEditorFactory = require("table-editor/factory")
  $.fn.tableEditor = function(options){
    var editor = tableEditorFactory(options)
    editor.render()

    this.append(editor.el)
    this.data("table-editor", editor)

    return this
  }
}(jQuery))