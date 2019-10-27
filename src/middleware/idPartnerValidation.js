import validate from 'uuid-validate';
import { ErrorTypes, MappedTags } from '../lib/common/error_handler';

const idPartnerValidation = (req, res, next) => {
  const { id } = req.params;

  if (validate(id)) {
    return next();
  }

  return next(new ErrorTypes.PartnerError(MappedTags.INVALID_ID_PARTNER));
};

export default idPartnerValidation;
