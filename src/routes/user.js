import Router from 'koa-router';
import db from '../db'
const router = new Router();

const params = {};

router
  .param('id', async (val, ctx, next) => {

    params.id = val;
    //
    //const users = await db.User.findAll();
    //const user = users.filter((user) => {
    //  console.log(user)
    //  return val === user.id;
    //});
    //console.log(user)
    //ctx.user = users[val];
    //if (!ctx.user) return ctx.status = 404;
    await next();
  })
  .get('/', async (ctx, next) => {
    const user = await db.User.findAll();
    ctx.body = user;
    //ctx.body = {
    //  route: 'user',
    //  url: ctx.url,
    //  env: process.env
    //};
  })
  //.get('/add/:name', (ctx, next) => {
  //  ctx.body = {
  //    route: 'user',
  //    url: ctx.url
  //  };
  //})
  .get('/get/:id', async (ctx, next) => {

    const user = await db.User.findById(params.id)

    ctx.body = user;
    //ctx.body = ctx.user;
  })
  .get('/add', async (ctx, next) => {

    const user = await db.User.create({name: 'test_ddd'});

    ctx.body = user;
    //ctx.body = ctx.user;
  });

export default router;

//var platform = require('../../platform'),
//  parse = require('co-body');
//
//var show = exports.show = function *show(){
//  var user = yield platform.users.getUser(this.params.userId);
//  if(!user){
//    return this.throw(404, 'No user found');
//  }
//
//  this.body = user;
//};
//
//var create = exports.create = function *create(){
//  var body = yield parse(this);
//  var user = yield platform.users.createUser(body.name);
//  this.body = user;
//};
//
//exports.register = function(router){
//  router.get('/users/:userId', show);
//  router.post('/users', create);
//};