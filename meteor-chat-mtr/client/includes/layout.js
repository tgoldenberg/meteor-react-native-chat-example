Template.layout.events({
  'click .logout': function(e) {
    Router.go('/')
    Meteor.logout();
  }
});

Template.layout.helpers({
  userLoggedIn: function() {
    return !!Meteor.user();
  }
})
