export default function (sequelize, DataTypes) {
  const File = sequelize.define('File', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    state: DataTypes.INTEGER,

    create_user_id: DataTypes.INTEGER,
    create_time: DataTypes.DATE,
    update_user_id: DataTypes.INTEGER,
    update_time: DataTypes.DATE,

    visit_num: DataTypes.INTEGER,       //访问次数
    click_num: DataTypes.INTEGER,       //点击次数
    download_num: DataTypes.INTEGER,    //下载次数

    suffix: DataTypes.STRING,     //后缀名
    size: DataTypes.BIGINT,       //文件大小，单位字节

    /* 图片属性－begin */
    width: DataTypes.FLOAT,
    height: DataTypes.FLOAT,
    has_copyright: DataTypes.BOOLEAN,   //是否有版权
    /* 图片属性－end */

  });

  return File;
}