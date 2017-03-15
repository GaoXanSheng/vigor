var defaultNow = require('./_now');

/**
 * 未注册用户邀请表
 */
module.exports = {
  connection: 'default',
  identity: 'messagefriendinvite',
  schema: true,
  tableName: 'messagefriendinvite',
  autoUpdatedAt: false,
  attributes: {
    user: {
      model: 'user',
      required: true
    },
    email: {
      type: 'email',
      required: true
    },
    token: {
      type: 'string',
      required: true
    },
    processed: {
      type: 'boolean',
      defaultsTo: false
    },
    createdAt: {
      columnName: 'create_at',
      type: 'datetime',
      defaultsTo: defaultNow
    }
  }
};
