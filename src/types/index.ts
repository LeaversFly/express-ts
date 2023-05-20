/**
 * @Author CodingGorit
 * @Date 2022年9月20日
 * @abstract 定义 type 和 interface
 */ 
import { Response } from 'express';
import { Result } from '../common/Result';

// 通用结果集
// export type Result<T> = {
//     code: number,
//     msg: string,
//     data?: T | string,
// }

export interface INacosEnvConfig {
    host: string,
    nacosServer: string,
    namespace: string
}

export interface IResponse<T = any> extends Response {
    sendResult(result: Result<T>): void;
}

// mysql 配置
export interface IDBConfig {
    protocol?: string,
    host: string,
    database?: string,
    user: string,
    password: string,
    port: number,
    connectionLimit: number
}