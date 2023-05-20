import { IUser } from "../models";
import execute from "../utils/DBUtils";

// 查询用户 test，由于数据库资源丢失，此数据不可查询
export const getUser = async () => {
    const sql = 'select * from bm_user';

    // 异步改成同步
    const result = await execute(sql);

    return result as Array<IUser>;
}