const express = require('express');
import { IRouterConf } from "../../../..";
import { Request, Response, NextFunction } from 'express';
import log from "../../../../../utils/log";
import { Result } from "../../../../../common/Result";
import { ResultCodeEnum, ResultMessageEnum } from "../../../../../enums/ResultEmums";
import { IResponse } from "../../../../../types";

// 这是基本的接口学习【常见传参方式】

// 认证模块

// 通过认证获取用户管理服务

const user = express.Router();

user.get("/",
    // 验证参数
    function (req: Request, res: Response, next: NextFunction) {
        // 参数验证
        // if (!req.query.pagenum || req.query.pagenum <= 0) return res.send(null, 400, "pagenum 参数错误");
        // if (!req.query.pagesize || req.query.pagesize <= 0) return res.sendResult(null, 400, "pagesize 参数错误");
        log.info(`/user`);
        next();
    },

    function (req: Request, res: Response, next: NextFunction) {
        res.send(new Result<string>(ResultCodeEnum.SUCCESS, ResultMessageEnum.SUCCESS).toString());
    }
);

// http://localhost:1347/user/list?aaa=ccc
user.get("/list",
    function (req: Request, res: Response, next: NextFunction) {
        // 参数验证
        // if (!req.query.pagenum || req.query.pagenum <= 0) return res.send(null, 400, "pagenum 参数错误");
        // if (!req.query.pagesize || req.query.pagesize <= 0) return res.sendResult(null, 400, "pagesize 参数错误");
        log.info(`/user/info ${JSON.stringify(req.query)} ${JSON.stringify(req.body)}`);
        next();
    },

    function (req: Request, res: IResponse, next: NextFunction) {
        // res.json(new Result<string>(ResultCodeEnum.QUERY_SUCCESS, ResultMessageEnum.QUERY_SUCCESS, req.query));
        res.sendResult(new Result<string>(ResultCodeEnum.QUERY_SUCCESS, ResultMessageEnum.QUERY_SUCCESS, req.query))
    }
);

// http://localhost:1347/api/private/v1/user/3
user.get("/:id",
    function (req: Request, res: Response, next: NextFunction) {
        // 参数验证
        // if (!req.query.pagenum || req.query.pagenum <= 0) return res.send(null, 400, "pagenum 参数错误");
        // if (!req.query.pagesize || req.query.pagesize <= 0) return res.sendResult(null, 400, "pagesize 参数错误");
        log.info(`/user/info ${JSON.stringify(req.query)} ${JSON.stringify(req.params.id)} ${JSON.stringify(req.body)}`);
        next();
    },

    function (req: Request, res: Response, next: NextFunction) {
        res.json(new Result<string>(ResultCodeEnum.UPDATE_SUCCESS, ResultMessageEnum.UPDATE_SUCCESS, req.params.id));
    }
)

user.post("/body",
    function (req: Request, res: Response, next: NextFunction) {
        // 参数验证
        // if (!req.query.pagenum || req.query.pagenum <= 0) return res.send(null, 400, "pagenum 参数错误");
        // if (!req.query.pagesize || req.query.pagesize <= 0) return res.sendResult(null, 400, "pagesize 参数错误");
        log.info(`/user/body ${JSON.stringify(req.query)} ${JSON.stringify(req.params.id)} ${JSON.stringify(req.body)}`);
        next();
    },

    function (req: Request, res: Response, next: NextFunction) {
        res.json(new Result<string>(ResultCodeEnum.UPDATE_SUCCESS, ResultMessageEnum.UPDATE_SUCCESS, req.params.id));
    }
)

// http://localhost:1347/api/private/v1/user/list/all
user.get("/list/all",
    async function (req: Request, res: IResponse, next: NextFunction) {
        const result = { 
            id: 1231,
            username: "cccc",
            password: 'ddddd'
        };
        res.sendResult(new Result<object>(ResultCodeEnum.QUERY_SUCCESS, ResultMessageEnum.QUERY_SUCCESS, result));
    }
)

const routes: Array<IRouterConf> = [{
    path: "/user",
    router: user
}];

export = routes;