import '../imports/startup/accounts-config.js';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Messages } from '../imports/api/messages.js';

import './main.html';

Template.messages.helpers({
    messages: function() {
                  return Messages.find({}, { sort: { time: -1}});
              }
});

Template.input.events = {
    'keydown input#message' : function (event) {
        if (event.which == 13) { // 13 is the enter key event
            if (Meteor.user())
                //var name = Meteor.user().profile.name;
                var name = Meteor.user().username;
            else
                var name = 'Anonymous';
            var message = document.getElementById('message');
            if (message.value != '') {
                Messages.insert({
                    username: name,
                    message: message.value,
                    createdAt: Date.now(),
                    ownerId: Meteor.userId(),
                });

                document.getElementById('message').value = '';
                message.value = '';
            }
        }
    }
}

