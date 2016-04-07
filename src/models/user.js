export default function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    state: DataTypes.INTEGER,

    create_user_id: DataTypes.INTEGER,
    create_time: DataTypes.DATE,
    update_user_id: DataTypes.INTEGER,
    update_time: DataTypes.DATE,

    sex: DataTypes.ENUM('man', 'women'),
    phone: DataTypes.STRING,
    email: DataTypes.STRING

  });



  return User;
}