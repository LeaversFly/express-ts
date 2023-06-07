import { Express, Router } from 'express';
import common from './common';
import filters from './filter';
import example from './web/example'
import { Result } from '../common/Result';
import { ResultCodeEnum, ResultMessageEnum } from '../enums/ResultEmums';
import Utils from '../utils/Utils';

const env = Utils.getInstance().getConfig<string>("env");

// 路由配置接口
export interface IRouterConf {
  path: string,
  router: Router,
  meta?: unknown
}

// 路由配置
const routerConf: Array<IRouterConf> = [];

// 本地测试接口
routerConf.push(...example);

// 公共路由配置
const commonRouterConf: Array<IRouterConf> = [...common];
const filterRouteConf: Array<IRouterConf> = [...filters];

function routes(app: Express) {
  filterRouteConf.forEach((conf: IRouterConf) => app.use(conf.path, conf.router));

  app.get("/", function (req, res) {
    return res.json(new Result(ResultCodeEnum.SUCCESS, ResultMessageEnum.SUCCESS));
  });

  routerConf.forEach((conf) => app.use(conf.path, conf.router));

  commonRouterConf.forEach((conf: IRouterConf) => app.use(conf.path, conf.router));
}

export default routes;