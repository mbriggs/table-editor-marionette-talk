var CompositeView = Backbone.Marionette.CompositeView,
    RowView = require("table-editor/row-view"),
    CreateView = require("table-editor/create-view")


var TableEditor = CompositeView.extend({
  tagName: 'table',
  className: 'editor table table-striped table-bordered',
  itemView: RowView,
  createView: CreateView,
  itemViewContainer: 'tbody',
  template: 'table-editor/table',

  initialize: function(){
    this.creatorRow = new this.createView({
      collection: this.collection
    })
  },

  onRender: function(){
    this.creatorRow.render()
    this.$el.find("tbody").prepend(this.creatorRow.el)
  }
})

module.exports = TableEditor
