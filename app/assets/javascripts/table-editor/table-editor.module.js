var TableEditor = Backbone.Marionette.CompositeView.extend({
  tagName: 'table',
  className: 'editor table table-striped table-bordered',
  itemViewContainer: 'tbody',

  constructor: function(options){
    Backbone.Marionette.CompositeView.prototype.constructor.apply(this, arguments)

    this.itemView = options.rowView
    this.template = options.tableTemplate
    this.creatorRow = new options.createView({
      collection: this.collection
    })
  },

  render: function(){
    Backbone.Marionette.CompositeView.prototype.render.apply(this, arguments)
    this.creatorRow.render()
    this.$el.find("tbody").prepend(this.creatorRow.el)
  }
})

module.exports = TableEditor
