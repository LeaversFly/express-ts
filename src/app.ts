// src/app.ts
import express from 'express';
import bootstrap from './middleware';

// 实例化app对象
const app = express();

// 挂载中间件
bootstrap(app);

