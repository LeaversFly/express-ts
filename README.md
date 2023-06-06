## 介绍

> 自定义 express + ts 脚手架

body-parser 使用
qs

# 原项目地址

[Gitee](https://gitee.com/CodingGorit/express-ts)

## 逻辑链路

```ts

middleware -> routes(api) —> service —> mysql

```

基础开发 CRUD 开发

1. db/studentManagementSystemAdvance.sql 导入你的本地数据库中
2. 见 src\routes\web\examples.ts 的接口【主要用于接受参数】
3. 见 src\service\ExamplesService.ts 【业务逻辑层，主要用来判断】,使用异步写法

## 代码结构

```
-config # 配置目录
-db # 数据库模型层
-src 
    -common # 公共类目录 *
        -Result.tx # 统一返回类型
    -enums # 枚举类型目录
        -ResultEnum # 返回的状态码和信息枚举
    -middleware # 中间件 *
        - index.ts # 项目启动类定义
        - registerExperssConfig.ts # 挂载express框架
        - registerNacosClient.ts # 挂载nacos clinet（注册中心 和 配置中心）
        - responseHeader.ts # 设置返回头（跨域配置）
    -models # 数据模型层
    -routes  # 请求路由
        -index.ts # 路由挂载
        -web #路由模块
    -service # 业务代码（具体逻辑实现）
    -types # 类型目录
    -utils # 工具类目录
        -DBUtils.ts 数据库连接工具类
        -log # 日志工具类 *
        -utils.ts # 配置加载工具 * 
    -app.ts # 主启动
```
代码启动过程：
在`middleware\index`中调用`middleware\registerExperssConfig`和`middleware\registerNacosClient`来创建启动类`bootstrap`,最后在`app.ts`中启动。
注意：

- config的json文件中可切换`"env"`对应字段切换环境
- 文件中打了`*`的文件或目录不要轻易修改
- 代码开发一般于请求路径文件夹下开发，并且于routes\index.ts中注册

### 支持

1. typescript 支持
2. nacos client 支持
3. mysql 支持（默认 mysql5.7，如果有需要 mysql8 的，见 error.md） v1 接口基于 mysql，后续 v2 会集成
4. config 支持（使用配置文件）
5. 跨域支持
6. 覆盖全路径
7. 新增接口请求限制

### TODO

1. [] 异常处理机制
2. 集成 mail 服务
3. ORM 集成

### 配置

1. 根据自己的需要 再 config/default.json 中配置的自己的开发环境 dev（是本地环境，
2. 修改 config 修改 naocs 的配置，为你的公网 ip 等配置，不然你连接不了

```json
{
    "serviceName":"nacos's serviceName",
    "localIp":"127.0.0.1",
    "nacosServer":"xxx.com:8848",
    "namespace":"nacos's namespace",
}

// mysql 根据自己需要修改环境
```
## 运行项目

devlopment

```typescript

// use npm
npm install

npm run dev

// use yarn
npm install -g yarn

yarn

yarn dev

// use pnpm recommend
npm i -g pnpm

pnpm i

pnpm run dev
```

production

```typescript
npm run prod

// or

yarn prod
```

### 部分内容参考如下博文

- https://juejin.cn/post/7069770431871320078

## 问题记录

## 1. node 连接 MySQL 问题记录

- 默认只能连接 mysql5.7， mysql8 由于插件缘故，导致密码加密方式变化，需要将 mysql8 的密码设置为 native_password 即可, 如下

```sql

ALTER USER ‘root’@‘localhost’ IDENTIFIED WITH mysql_native_password BY ‘password’; # 更改新的密码，可以将密码设置为简单类型

FLUSH PRIVILEGES;

```