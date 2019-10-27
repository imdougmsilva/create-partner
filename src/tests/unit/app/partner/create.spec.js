import assert from 'assert';
import {
  describe,
  it,
  beforeEach,
  afterEach,
} from 'mocha';
import sinon from 'sinon';
import { ErrorTypes } from '../../../../lib/common/error_handler';

const { createPartner } = require('../../../../app/partner');

const db = require('../../../../lib/database/models');

const { partners: PartnerModel } = db;

const mySandBox = sinon.createSandbox();
describe('[Unit] Create Partner', () => {
  const req = {
    body: {
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
    },
  };

  beforeEach(() => {
    mySandBox.stub(ErrorTypes, 'PartnerError');
    mySandBox.stub(PartnerModel, 'create');
  });

  afterEach(() => {
    mySandBox.restore();
  });

  describe('Partner creation', async () => {
    it('should return 200 when all required params is sent', async () => {
      const send = sinon.stub().returns({ partner: 2342 });
      const status = sinon.stub().returns({ send });
      const next = sinon.stub().returns({ status: 200 });
      const res = { status };

      await PartnerModel.create.returns([{
        id: '14c18026-2159-4744-bcad-663d526cc1d8',
      }, false]);

      await createPartner(req, res, next);
      assert(send.calledWith());
    });
  });
});
