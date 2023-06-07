import execute from "../utils/DBUtils";
import log from "../utils/log";

const TAG = "ExampleService"
const db = "bt_user";

// Example 根据 ID 查询学生信息，写法二，使用异步传参 【推荐】
export const getStudentById = (id: number, callback = (val: any, msg?: string) => { }) => {
    if (id < 0 || !id) {
        id = 0;
    }

    const sql = `select * from ${db}`

    execute(sql).then(result => {
        log.info(`${TAG} query result is => ${result}, type ${typeof result}`);
        if (Array.isArray(result) && result.length > 0) {
            callback(result);
        } else {
            log.info(`${TAG} query result is empty`);
            callback(0, "Student not found!");
        }
    }).catch(err => {
        log.error(err);
        callback(0);
    });
}

export const getAllUsers = (callback = (val: any, msg?: string) => { }) => {
    const sql = `select * from ${db}`

    execute(sql).then(result => {
        log.info(`${TAG} query result is => ${result}, type ${typeof result}`);
        callback(result);
    }).catch(err => {
        log.error(err);
        callback(0);
    });
}
