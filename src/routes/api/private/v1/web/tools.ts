const express = require('express');
import { IRouterConf } from "../../../..";
import { Request, Response, NextFunction } from 'express';
import log from "../../../../../utils/log";
import { Result } from "../../../../../common/Result";
import { ResultCodeEnum, ResultMessageEnum } from "../../../../../enums/ResultEmums";
import { IResponse } from "../../../../../types";
import { getRandomVerifyCode } from "../../../../../service/ToolsService";

const tools = express.Router();

// http://localhost:1347/api/private/v1/tools/verifycode
tools.get("/verifycode", function (req: Request, res: IResponse, next: NextFunction) {
    res.sendResult(Result.success<object>(getRandomVerifyCode()));
});

// 获取指定长度的验证码
tools.get("/verifycode/:code",
    function (req: Request, res: IResponse, next: NextFunction) {
        const code = req.params.code as unknown as number;
        if (code > 0) {
            res.sendResult(Result.success<object>(getRandomVerifyCode(code)));
        } else {
            res.sendResult(Result.paramsError());
        }
    }
);

// 错误反馈上报
tools.post("/mini/error/feedback",

    // 插入一条数据
);

const routes: Array<IRouterConf> = [{
    path: "/tools",
    router: tools
}];

export = routes;

