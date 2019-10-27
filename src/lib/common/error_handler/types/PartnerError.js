import mappedTags from '../mappedTags';

module.exports = function PartnerError(errorTag) {
  Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;

  if (mappedTags[errorTag.message] === errorTag) {
    this.message = mappedTags[errorTag.message].message;
    this.extra = { status: mappedTags[errorTag.message].status };
  } else {
    this.message = mappedTags.PARTNER_ERROR.message;
    this.extra = { status: mappedTags.PARTNER_ERROR.status };
  }
};

require('util').inherits(module.exports, Error);
