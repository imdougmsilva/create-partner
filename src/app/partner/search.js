import { responseHandler } from '../../lib/common/response_handler';
import { ErrorTypes, MappedTags } from '../../lib/common/error_handler';


const db = require('../../lib/database/models/index');

const { partners: PartnerModel } = db;

module.exports = async (req, res, next) => {
  try {
    const { lat, long } = req.body;
    const pdvs = await PartnerModel.getPdvByLatLong(lat, long);
    return responseHandler(res, 200, { pdvs });
  } catch (err) {
    return next(new ErrorTypes.PartnerError(MappedTags.PARTNER_DEFAULT));
  }
};
