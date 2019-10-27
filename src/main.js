import express from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import logger from './lib/common/logger';
import { ErrorHandler } from './lib/common/error_handler';
import db from './lib/database/models/index';
import routes from './config/routes';

const PORT = process.env.PORT || 3030;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
routes(app);
app.use(ErrorHandler);

async function startApp() {
  let sequelizeForceSync = null;

  if (process.env.FORCE_SYNC === 'TRUE') {
    logger.warn('Forcing database sync');
    sequelizeForceSync = { force: true };
  }

  await db.sequelize.sync(sequelizeForceSync);

  app.listen(PORT, (err) => {
    if (err) return logger.error(`Error occured at Search Partner ${PORT}.`, err.stack);
    return logger.info(`Search Partner is running at ${PORT}.`);
  });
}

export {
  app,
  startApp,
};

export default app;
