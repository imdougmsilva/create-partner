import assert from 'assert';
import {
  describe,
  it,
  beforeEach,
  afterEach,
} from 'mocha';
import sinon from 'sinon';
import { ErrorTypes } from '../../../../lib/common/error_handler';

const { searchPartnerById } = require('../../../../app/partner');
const { sequelize } = require('../../../../lib/database/models/index');

const Partner = sequelize.import('../../../../lib/database/models/partner');
const mySandBox = sinon.createSandbox();
describe('[Unit] Search Partner By ID', () => {
  const req = {
    params: {
      id: '14c18026-2159-4744-bcad-663d526cc1d8',
    },
  };

  beforeEach(() => {
    mySandBox.stub(ErrorTypes, 'PartnerError');
    mySandBox.stub(Partner, 'findByPk');
  });

  afterEach(() => {
    mySandBox.restore();
  });

  describe('get partner by id', async () => {
    it('should return 200 when all required params is sent', async () => {
      const send = sinon.stub().returns({ partner: 2342 });
      const status = sinon.stub().returns({ send });
      const next = sinon.stub().returns({ status: 200 });
      const res = { status };

      await Partner.findByPk.returns({
        partner: {
          id: 'cd206cb0-8710-4033-8f55-68440f36cd47',
          tradingName: 'Bar Legal',
          ownerName: 'Fernando Silva',
          document: '05202839000126',
          coverageArea: {
            type: 'MultiPolygon',
            coordinates: [
              [
                [
                  [
                    -43.50404,
                    -22.768366,
                  ],
                  [
                    -43.45254,
                    -22.775646,
                  ],
                  [
                    -43.429195,
                    -22.804451,
                  ],
                  [
                    -43.38422,
                    -22.788942,
                  ],
                  [
                    -43.390743,
                    -22.764568,
                  ],
                  [
                    -43.355724,
                    -22.739239,
                  ],
                  [
                    -43.403446,
                    -22.705671,
                  ],
                  [
                    -43.440525,
                    -22.707571,
                  ],
                  [
                    -43.4752,
                    -22.698704,
                  ],
                  [
                    -43.514683,
                    -22.742722,
                  ],
                  [
                    -43.50404,
                    -22.768366,
                  ],
                ],
              ],
            ],
          },
          address: {
            type: 'Point',
            coordinates: [
              -43.432034,
              -22.747707,
            ],
          },
          createdAt: '2019-10-25T19:14:34.765Z',
          updatedAt: '2019-10-25T19:14:34.765Z',
          deletedAt: null,
        },
      });

      await searchPartnerById(req, res, next);
      assert(send.calledWith());
    });
  });
});
