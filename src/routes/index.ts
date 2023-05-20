import { Express, Request, Response, Router } from 'express';
import user from './api/private/v1/web/user';
import common from './api/private/v1/common';
import filters from './api/private/v1/filter';
import tools from './api/private/v1/web/tools';
import { Result } from '../common/Result';
import { ResultCodeEnum, ResultMessageEnum } from '../enums/ResultEmums';
import Utils from '../utils/Utils';
const prefix = "/api/private/v1";
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
if (env === "dev") {
  routerConf.push(...user);
}

routerConf.push(...tools);

// 公共路由配置
const commonRouterConf: Array<IRouterConf> = [...common];
const filterRouteConf: Array<IRouterConf> = [...filters];

function routes(app: Express) {
  filterRouteConf.forEach((conf: IRouterConf) => app.use(conf.path, conf.router));

  // 根目录
  app.get(prefix, (req: Request, res: Response) => res.status(200).send('Hello express + ts !!!'));

  app.get(prefix + "/get", function (req, res) {
    return res.json(new Result(ResultCodeEnum.SUCCESS, ResultMessageEnum.SUCCESS));
  });

  routerConf.forEach((conf) => app.use(prefix + conf.path, conf.router));

  commonRouterConf.forEach((conf: IRouterConf) => app.use(conf.path, conf.router));
}

export default routes;