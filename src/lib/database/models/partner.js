
import Sequelize from 'sequelize';


module.exports = (sequelize, DataTypes) => {
  const Partner = sequelize.define(
    'partners',
    {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        type: Sequelize.UUID,
      },
      tradingName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ownerName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      document: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      coverageArea: DataTypes.GEOMETRY('MultiPolygon'),
      address: DataTypes.GEOMETRY('POINT'),

    },
    {
      deletedAt: 'deletedAt',
      paranoid: true,
      underscored: false,
      indexes: [
        {
          fields: ['id'],
          unique: true,
        },
        {
          fields: ['document'],
          unique: true,
        },
        {
          fields: ['tradingName'],
          unique: true,
        },
      ],
    },
  );

  Partner.getPdvByLatLong = async (lat, long) => {
    const pdv = await sequelize.query(`
    select
      *
    from
      partners tp
    where
      ST_Distance_sphere( st_geometryfromtext('POINT(${lat} ${long})'),
      st_point(st_x(tp.address),
      st_y(tp.address)) ) <= 1000`,
    { type: sequelize.QueryTypes.SELECT });

    return pdv;
  };

  return Partner;
};
