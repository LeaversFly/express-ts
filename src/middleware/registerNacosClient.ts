'use strict';
import Utils from '../utils/Utils';
import { INacosEnvConfig } from '../types';
const log = global.log;
const { NacosNamingClient, NacosConfigClient } = require('nacos')

const utils = Utils.getInstance();

const TAG = "registerNacosClient:";
const SERVERNAME = utils.getConfig<string>("serviceName");
const PORT = utils.getConfig<number>("port");

const ENV = utils.getConfig<string>("env") as unknown as string;
const NACOSCONFIG = utils.getConfig<object>(ENV) as unknown as INacosEnvConfig;

// 连接nacos
const client = new NacosNamingClient({
    logger: log,
    serverList: NACOSCONFIG.nacosServer,
    namespace: NACOSCONFIG.namespace,
});

// 新建配置实例，接收推送
const config = new NacosConfigClient({
    serverAddr: NACOSCONFIG.nacosServer,
    namespace: NACOSCONFIG.namespace
});


async function initNacosClient() {
    log.info(`${TAG} initNacosClientServiceDiscovery`);
    await registerServiceDiscovery(client);
}

/**
 * ServiceDiscovery
 */
async function registerServiceDiscovery(client: any) {
    await client.ready();

    // 开始注册
    log.info(`${TAG} register ${SERVERNAME} client SUCCESS`);
    await client.registerInstance(SERVERNAME, {
        ip: NACOSCONFIG.host,
        port: PORT,
    });


    // subscribe instance
    // client.subscribe(SERVERNAME, hosts => {
    // log.warn(`${TAG} subscribe hosts => ${JSON.stringify(hosts)}`);
    // });


}

async function unregisterServiceDiscovery(client: any) {
    await client.deregisterInstance(SERVERNAME, {
        ip: NACOSCONFIG.host,
        port: PORT,
    });
}

export default initNacosClient;
