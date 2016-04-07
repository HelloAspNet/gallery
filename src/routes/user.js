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
    console.log(22)
    console.log(db)
    const user = await db.User.findAll();
    ctx.body = user;
  })
  .get('/get/:id', async (ctx, next) => {

    const user = await db.User.findById(params.id);

    ctx.body = user;
    //ctx.body = ctx.user;
  })
  .post('/add', async (ctx, next) => {

    console.log(ctx.set)
    //const user = await db.User.create({name: 'test_ddd'});


    ctx.set('Access-Control-Allow-Method', 'POST');
    ctx.set('Access-Control-Allow-Origin', 'http://localhost:63342');
    ctx.set('Access-Control-Allow-Headers', 'Content-type');


    ctx.body = ctx;
    //ctx.body = ctx.user;
  })
  .post('/update', async (ctx, next) => {

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