import { Express } from 'express';
import routes from '../routes';
import log from '../utils/log';
import Utils from '../utils/Utils';
import registerExpressConfig from './registereeExpressConfig';
import initNacosClient from './registerNacosClient';

const PORT = Utils.getInstance().getConfig<number>("port");

async function bootstrap(app: Express) {

    // 有 nacos 的使用需求，可以将其打开
    // await initNacosClient();

    // 加载相关配置信息
    registerExpressConfig(app);

    // 启动
    app.listen(PORT, async () => {
        log.info(`App is running at http://localhost:${PORT}`);
        routes(app);
    })
}

export default bootstrap;