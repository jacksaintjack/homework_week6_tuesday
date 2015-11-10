//vairables
var App ={};
App.Models={};
App.Collections={};
App.Views={};

//Models and Collections
App.Models.Reg = Backbone.Model.extend({
  url:' http://tiny-starburst.herokuapp.com/collections/contactsNick',
  default: {
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: ''
	},
});

App.Collections.Regs = Backbone.Collection.extend({
  url:' http://tiny-starburst.herokuapp.com/collections/contactsNick',
  model: App.Models.Reg
});

//Views
App.Views.Home = Backbone.View.extend({
  template: _.template($('#homePage').html()),

  events: {
    'click #submit': 'clickHandler'
  },

  send: function(){
    var firstName = $('#firstName').val();
    var lastName = $('#lastName').val();
    var address = $('#address').val();
    var phoneNumber = $('#phoneNumber').val();
    var newRegistration = new App.Models.Reg({
      firstName: firstName,
      lastName: lastName,
      address: address,
      phoneNumber: phoneNumber
    });
    if (firstName.trim() === '') {
      alert('Add Your First Name');
      return;
    }
    if (lastName.trim() === '') {
      alert('Add your last Name');
      return;
    }
    if (address.trim() === '') {
      alert('Add Your Address');
      return;
    }
    if (phoneNumber.trim() === '') {
      alert('Add Your Name');
      return;
    }
    if (phoneNumber.length >= 11 ) {
      alert('Not a phone number or remove dashes');
      return;
    }
    newRegistration.save();
  },

  render: function(){
    this.$el.html(this.template());
  },

  clickHandler: function(event){
    event.preventDefault();
    this.send();
  }

});

App.Views.Records = Backbone.View.extend({
  template: _.template($('#record').html()),

  render: function(){
    var records = this.collection.toJSON();
    this.$el.html(this.template({
      records: records
    }));
    return this;
  }
});

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
    var collection = new App.Collections.Regs();
    var view = new App.Views.Records({
      collection: collection
    });

    collection.fetch({
      success: function(){
        view.render();
        $('#mainArea').html(view.$el);
      }
    })
  }

});

App.router = new App.Router();
Backbone.history.start();
