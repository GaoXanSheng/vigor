var isLogin = require('../../policies/isLogin');
// var message = require('../../sharable/im');
var vig = require('vig');
var inputInvalidHandler = require('../../errors/handlers/InputInvalid');

module.exports = {
  urls: ['/message/new', '/v2/message/new'],
  routers: {
    post: function (req, res) {
      var user = req.session.user;
      var extracted = req.extracted.body;
      var InstantMessage = req.models.InstantMessage;
      var User = req.models.User;

      User.findOne({
        id: extracted.to
      }).then(function (found) {
        if (!found) {
          return res.errorize(res.errors.UserNotFound);
        }
        InstantMessage.create({
          receiver: extracted.to,
          sender: user.id,
          text: extracted.text
        }).then(function (created) {
          created.receiver = found;
          created.sender = user;
          vig.events.send('sio-message', created, true);
          return res.errorize(res.errors.Success, created.toJSON());
        }).fail(res.onError);
      }).fail(res.onError);
    }
  },
  policies: {
    post: isLogin
  },
  validations: {
    post: {
      body: {
        to: {
          type: 'string',
          required: true
        },
        text: {
          type: 'text',
          required: true
        }
      }
    }
  },
  failures: {
    validation: inputInvalidHandler
  }
};
