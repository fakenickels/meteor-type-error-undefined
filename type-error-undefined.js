/* jshint esnext: true */
Items = new Mongo.Collection('items');

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });

  Template.hello.onRendered(function(){
    this.SubscribeWithScroll = new SubscribeWithScroll({
      pub: 'items',
      threshold: '.threshold',
      increment: 10,
      limit: 10,
      template: this
    });

    this.SubscribeWithScroll.params = function(){
      return {
        cool: true
      };
    };

    this.SubscribeWithScroll.run();
  });
}

if (Meteor.isServer) {
  Items.publish('items').mongoRule((limit) => {
    return {
      limit
    };
  });


  if(!Items.find().count()){
    _.times(50, (i) => {
      Items.insert({
        number: i
      });
    });
  }
}
