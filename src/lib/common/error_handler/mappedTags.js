const mappedResponseErrorTags = {
  INVALID_DOCUMENT: { message: 'INVALID_DOCUMENT', status: 500 },
  INVALID_ID_PARTNER: { message: 'INVALID_ID_PARTNER', status: 500 },
  EMPTY_ARGUMENT_LAT_AND_LONG: { message: 'EMPTY_ARGUMENT_LAT_AND_LONG', status: 406 },
  PARTNER_DEFAULT: { message: 'PARTNER_DEFAULT', status: 500 },

};

export default mappedResponseErrorTags;
