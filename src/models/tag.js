export default function(sequelize, DataTypes) {
  const Tag = sequelize.define('Tag', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    state: DataTypes.INTEGER,

    create_user_id: DataTypes.INTEGER,
    create_time: DataTypes.DATE,
    update_user_id: DataTypes.INTEGER,
    update_time: DataTypes.DATE,

    cover: DataTypes.STRING,      //封面
    click_num: DataTypes.INTEGER  //点击数

  });

  return Tag;
}
