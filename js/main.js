//vairables
var App ={};
App.Models={};
App.Collections={};
App.Views={};

//Models and Collections
App.Models.Reg = Backbone.Model.extend({
  url:' http://tiny-starburst.herokuapp.com/collections/contactsjacksaintjack'
});

App.Collections.Regs = Backbone.Collection.extend({
  url:' http://tiny-starburst.herokuapp.com/collections/contactsjacksaintjack',
  model: App.Models.Reg
});
//Views
App.Views.Home = Backbone.View.extend({
  template: _.template($('#homePage').html()),

  render: function(){
    this.$el.html(this.template());
  }
})

//router

App.Router = Backbone.Router.extend({
  routes:{
    '': 'home',
    'records': 'records'
  },
  home: function(){
    var view = new App.Views.Home();
    view.render();
    $('#mainArea').html(view.$el);
  },
  records: function(){

  }
});

App.router = new App.Router();
Backbone.history.start();
