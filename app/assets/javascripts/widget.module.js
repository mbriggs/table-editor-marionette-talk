var Widget = Backbone.Model.extend({
  urlRoot: '/widgets'
})

var WidgetCollection = Backbone.Collection.extend({
  model: Widget
})

module.exports = {
  model: Widget,
  collection: WidgetCollection
}