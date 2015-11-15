Messages = new Mongo.Collection('messages');

Messages.allow({
  update: function(userId, message) { return true; },
  remove: function(userId, message) { return true; },
  insert: function(userId) { return true; }
});

Meteor.methods({
  messageCreate: function(messageAttributes) {
    // check(this.userId, String);
    console.log('MESSAGE CREATE');
    check(messageAttributes, {
      message: String,
      author: String,
      avatarUrl: String,
      createdAt: Date
    });
    var message = Messages.insert(messageAttributes);
    return message;
  },
  messageUpdate: function(messageId, messageAttributes) {
    var message = Messages.update({_id: messageId}, {$set: {messageAttributes}});
    return message;
  },
  messageDelete: function(messageId) {
    Messages.remove({_id: messageId});
  },
  registerUser: function(username, password) {
    check(username, String);
    check(password, String);
    console.log('USERNAME', username, password);
    return Accounts.createUser({username: username, password: password});
  },
  loginUser: function(username, password) {
    console.log('LOGGING IN', username, password);
    return Accounts.loginWithPassword({username: username, password: password})
  }
})
