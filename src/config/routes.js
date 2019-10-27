import healthcheck from '../app/healthcheck/controller';
import documentValidation from '../middleware/documentValidation';
import latLongValidation from '../middleware/latLongValidation';
import idPartnerValidation from '../middleware/idPartnerValidation';


const {
  createPartner,
  searchPartner,
  searchPartnerById,
} = require('../app/partner');

export default (router) => {
  router.get('/', healthcheck);
  // Create user
  router.post('/partner', documentValidation, createPartner);
  router.get('/partner', latLongValidation, searchPartner);
  router.get('/partner/:id', idPartnerValidation, searchPartnerById);
};
