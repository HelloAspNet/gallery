import Sequelize from 'sequelize';
import config from './config/sequelize.json';
import fs from 'fs';
import path from 'path';

const conf = config[process.env.NAME || 'development']

const client = new Sequelize(conf.database, conf.username, conf.password, conf.options);

console.log(conf)

const models = {};

fs
  .readdirSync(__dirname + '/models')
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach(function (file) {
    console.log(file)
    var model = client.import(path.join(__dirname + '/models', file));
    models[model.name] = model;
  });


client.sync();
  //.then(function() {
//  return User.create({
//    username: 'janedoe',
//    birthday: new Date(1980, 6, 20)
//  });
//}).then(function(jane) {
//  console.log(jane.get({
//    plain: true
//  }));
//});
//console.log(models);

export default models;
export { client };