import { Express } from 'express';
import express from 'express';
import responseHeader from './responseHeader';
import rateLimit from 'express-rate-limit';
const log = global.log;

const TAG = "registerExpressConfig:";

const limiter = rateLimit({
    max: 200,
    windowMs: 60 * 60 * 1000,
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: "Too many request from this IP"
});

function registerExpressConfig(app: Express) {
    log.info(`${TAG} init`);

    // For parsing application/json 
    app.use(express.json());

    // For parsing application/x-www-form-urlencoded 
    app.use(express.urlencoded({ extended: true }));

    // 所有接口限制请求次数
    app.use(limiter);

    // cors config
    app.all("*", responseHeader);
}


export default registerExpressConfig;