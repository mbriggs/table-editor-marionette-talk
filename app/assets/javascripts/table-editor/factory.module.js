var TableEditor = require('table-editor/table-editor'),
    CreateView = require('table-editor/create-view'),
    RowView = require('table-editor/row-view')

function buildEditor(options){
  if(!options.tableTemplate){
    throw new Error("A tableTemplate is required")
  }

  if(!options.collection){
    if(!options.urlRoot) requiredError("urlRoot or collection")

    var data = (options.data || [])
    options.collection = buildCollection(options.urlRoot, data)
  }

  if(!options.createView){
    if(!options.createTemplate) requiredError("createView or createTemplate")
    options.createView = CreateView.extend({
      template: options.createTemplate
    })
  }

  if(!options.rowView){
    if(!options.rowTemplate || !options.editRowTemplate) {
      requiredError("rowView or a rowTemplate AND an editRowTemplate")
    }

    options.rowView = RowView.extend({
      viewTemplate: options.rowTemplate,
      editTemplate: options.editRowTemplate
    })
  }

  return new TableEditor(options)
}

function requiredError(missing){
  throw new Error("Either a "+ missing +" is required")
}

function buildCollection(urlRoot, data){
  var Model = Backbone.Model.extend({ urlRoot: urlRoot }),
      Collection = Backbone.Collection.extend({ model: Model })

  return new Collection(data)
}

module.exports = buildEditor