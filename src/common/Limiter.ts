// 接口限制配置

import rateLimit from 'express-rate-limit';
import { ResultCodeEnum, ResultMessageEnum } from '../enums/ResultEmums';

const response = {
	code: ResultCodeEnum.REPEAT_REQUEST,
	msg: ResultMessageEnum.REPEAT_REQUEST
};

// 获取随机验证码最大为 1分钟 15 次
export const getVerifyCodeLimit = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minute
	max: 15, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	message: response
})