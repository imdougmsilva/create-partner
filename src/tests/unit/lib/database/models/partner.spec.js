import assert from 'assert';
import {
  describe,
  it,
} from 'mocha';

const { sequelize } = require('../../../../../lib/database/models/index');

const Partner = sequelize.import('../../../../../lib/database/models/partner');

describe('[Unit] Partner Model', async () => {
  const PartnerData = {
    tradingName: 'Adega Pinheiros',
    ownerName: 'Ze da Silva',
    document: '04.433.714/0001-44',
    coverageArea: {
      type: 'MultiPolygon',
      coordinates: [
        [
          [
            [
              -49.36299,
              -25.4515,
            ],
            [
              -49.35334,
              -25.45065,
            ],
          ],
        ],
      ],
    },
  };

  describe('Partner Validations', () => {
    it('Should validate obrigatory fields TRUE', async () => {
      const partner = await Partner.build(PartnerData);
      assert(await partner.validate());
    });

    it('Should validate empty obrigatory fields', async () => {
      const WrongPartnerData = {
        tradingName: 'Adega Pinheiros',
        ownerName: 'Ze da Silva',
        document: '05202839000126',
        coverageArea: {
          type: 'MultiPolygon',
          coordinates: [
            [
              [
                [
                  -49.36299,
                  -25.4515,
                ],
                [
                  -49.35334,
                  -25.45065,
                ],
              ],
            ],
          ],
        },
      };
      try {
        const wrongPartner = await Partner.build(WrongPartnerData);
        assert(await wrongPartner.validate());
      } catch (error) {
        assert(error.message === 'notNull Violation: partner.document cannot be null');
      }
    });
  });
});
