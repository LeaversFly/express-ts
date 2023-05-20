const express = require('express');
import { IRouterConf } from "../../..";
import { Request, Response, NextFunction } from 'express';
import log from "../../../../utils/log";
import Utils from "../../../../utils/Utils";
import { IResponse } from "../../../../types/index";
import { Result } from "src/common/Result";

const utils = Utils.getInstance();
const ignorePath = utils.getConfig<Array<string>>("ignorePath") as string[];

const filters = express.Router();
const TAG = "filters";

filters.all("*",
    function (req: Request, res: Response, next: NextFunction) {
        if (ignorePath.includes(req.originalUrl)) {
            log.debug(`${TAG} not support path`);
            return;
        }
        log.info(`${TAG} ============ begin ===========`);
        log.info(`${TAG} url => ${req.originalUrl}`);
        log.info(`${TAG} method => ${req.method}`);
        log.info(`${TAG} ip is => ${req.ip}`);
        // req.params 需要在对的 path 上才能拿得到
        log.info(`${TAG} query is => ${JSON.stringify(req.query)}, data is => ${JSON.stringify(req.body)}`);


        next();
    },

    // 给 response 回调参数，绑定 sendResult() 方法，这样，后面所有的 response 就都有该方法了
    function <T = any>(req: Request, res: IResponse, next: NextFunction) {
        (res as unknown as { sendResult: Function }).sendResult = function (result: Result<T>) {
            res.json(result);
        };
        next();
    }

);

const routes: Array<IRouterConf> = [{
    path: "/**",
    router: filters
}];

export = routes;