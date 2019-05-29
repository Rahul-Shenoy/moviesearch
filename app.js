const Koa = require('koa');
const Router = require('koa-router');
const logger = require('koa-logger');
var {search, movies} = require('./search')
const koaBody = require('koa-body');
var cors = require('@koa/cors');

const app = new Koa();
const router = new Router();
app.use(cors({'Access-Control-Allow-Origin': '*'}));
app.use(logger());
app.use(koaBody());

router.get('/search', async (ctx, next) => {
    let key = ctx.request.query.key;
    let filter = ctx.request.query.filter;
    console.log(filter)
    if(filter && (filter[0] === "{" || filter[0] === "[")) filter = JSON.parse(filter)
    ctx.body = await search(key, filter);
});

router.get('/test', async (ctx, next) => {
    var data = {
      'data': search("2019")
    };
    ctx.body = data;
});
 
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(process.env.PORT || 3000);
