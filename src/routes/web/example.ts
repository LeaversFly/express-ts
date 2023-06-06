const express = require('express');
import { IRouterConf } from "../index";
import { Request, NextFunction } from 'express';
import { ResultCodeEnum, ResultMessageEnum } from "../../enums/ResultEmums";
import { Result } from "../../common/Result";
import { IResponse } from "../../types";
import log from "../../utils/log";
import { getStudentById } from "../../service/ExampleService";

const examples = express.Router();

// Example 根据 ID 查询学生信息
examples.get("/student/:id", function (req: Request, res: IResponse, next: NextFunction) {
    getStudentById(req.params.id as unknown as number, (val: any, msg?: string) => {
        if (!val) {
            if (msg) {
                return res.sendResult(new Result(ResultCodeEnum.QUERY_FAILED, msg));
            }
            return res.sendResult(new Result(ResultCodeEnum.QUERY_FAILED, ResultMessageEnum.QUERY_FAILED));
        } else {
            return res.sendResult(new Result(ResultCodeEnum.QUERY_SUCCESS, ResultMessageEnum.QUERY_SUCCESS, val));
        }
    });
});

examples.get("/",
    // 验证参数
    function (req: Request, res: IResponse, next: NextFunction) {
        // 参数验证
        // if (!req.query.pagenum || req.query.pagenum <= 0) return res.send(null, 400, "pagenum 参数错误");
        // if (!req.query.pagesize || req.query.pagesize <= 0) return res.sendResult(null, 400, "pagesize 参数错误");
        log.info(`/user`);
        next();
    },
    function (req: Request, res: IResponse, next: NextFunction) {
        res.send(new Result<string>(ResultCodeEnum.SUCCESS, ResultMessageEnum.SUCCESS).toString());
    }
);

const routes: Array<IRouterConf> = [{
    path: "/examples",
    router: examples
}];

export = routes;