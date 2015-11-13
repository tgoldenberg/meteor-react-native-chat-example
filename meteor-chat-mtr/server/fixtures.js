if (Messages.find().count() == 0) {
  console.log('NO MESSAGES');
  var messageAttributes = {
    message: "Hello World",
    author: "tgoldenberg",
    avatarUrl: "",
    createdAt: new Date()
  };
  Messages.insert(messageAttributes);
}
