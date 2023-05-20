/**
 * @Author Gorit
 * @Date 2022年9月19日
 */

import config from 'config';
import { isPlainObject } from './ObjectUtils';

const REGEXP = {
    Mail: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
}

class Utils {
    private static instance: Utils;
    private randomString = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789";

    public static getInstance() {
        if (!this.instance) {
            this.instance = new this();
        }
        return this.instance;
    }

    public getConfig<T>(setting: string) {
        if (config.has(setting)) {
            return config.get<T>(setting);
        }
        return {};
    }

    // 下滑线转驼峰
    public static underLineToUpperChar(data: object) {
        if (!data) {
            return {};
        }

        let result = {};
        for (const key in data) {
            const value = key.replace(/\_(\w)/g, function (match, letter) {
                return letter.toUpperCase();
            });
            result[value] = data[key];
        }
        return result;
    }

    // 驼峰转下划线
    public static upperCharToUnderLine (data: object) {
        if (!data) {
            return {};
        }
        let result = {};
        for (const key in data) {
            const value = key.replace(/[A-Z]/g, function (match, letter) {
                return "_" + letter.toUpperCase();
            });
            result[value] = data[key];
        }
        return result;
    }

    public getRandomVerfiyCode (len = 8) {
        if (len <= 0) {
            len = 6;
        }
        let str = "";
        const randomStrLength = this.randomString.length;
        for (let i = 0; i < len; i++) {
            let randomIndex = Math.floor(Math.random() * (randomStrLength - 1));
            if (i % 2 === 0) {
                randomIndex = - randomIndex;
            }
            str += this.randomString.at(randomIndex);
        }
        return str;
    }

    // 正则表达式检查邮箱是否合法
    public static isMail (mail: string) {
        if (!mail) {
            return false;
        }
        return REGEXP.Mail.test(mail);
    }

    public static isObjectValid(obj: any): boolean {
        return Object.values(obj).every((item) => {
            if (typeof item === 'object' || isPlainObject(item)) {
                if (Object.getOwnPropertyNames(item).length === 0) {
                    return false;   // {}
                } else {
                    Utils.isObjectValid(item);
                }
            } else if (typeof item === 'number') {
                // 0 will return false
                if (item === 0) {
                    return true;
                }
            } else if (typeof item === 'string') {
                return item.length !== 0;
            } else if (typeof item === 'undefined' || typeof item === null) {
                return false;
            } else {
                return true;
            }
        });
    }

    private constructor() {
    }
}

export default Utils;