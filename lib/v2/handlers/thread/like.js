var isLogin = require('../../policies/isLogin');
var like = require('../../logics/thread/like');
var notLogin = require('../../failures/notLogin');
var wrongInput = require('../../failures/wrongInput');

module.exports = {
  urls: [
    '/thread/like/:id'
  ],
  routers: {
    post: like.like
  },
  policies: {
    post: isLogin
  },
  validations: {
    post: {
      params: {
        id: {
          type: 'string',
          required: true
        }
      }
    }
  },
  failures: {
    policy: notLogin,
    validation: wrongInput
  }
};
