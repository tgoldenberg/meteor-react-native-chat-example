Meteor.publish('messages', function() {
  console.log('Publishing Messages', Messages.find().count());
  return Messages.find();
});
