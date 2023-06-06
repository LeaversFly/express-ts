const express = require('express');
import { IRouterConf } from "./index";
import { Request, Response, NextFunction } from 'express';
import log from "../utils/log";
import { Result } from "../common/Result";
import { ResultCodeEnum, ResultMessageEnum } from "../enums/ResultEmums";

const common = express.Router();
const TAG = "common";

// 兜底
common.all("*",
    function (req: Request, res: Response, next: NextFunction) {
        // 参数验证
        log.debug(`${TAG} 404 not found, request uri is => ${req.originalUrl}`);
        res.send(new Result(ResultCodeEnum.PAGE_NOT_FOUND, ResultMessageEnum.PAGE_NOT_FOUND).toString());
    }
);

const routes: Array<IRouterConf> = [{
    path: "/**",
    router: common
}];

export = routes;
