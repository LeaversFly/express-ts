import { ResultCodeEnum, ResultMessageEnum } from "../enums/ResultEmums";

export class Result<T> {
    private code: ResultCodeEnum;
    private msg: ResultMessageEnum | string;
    private data: T | object | string;

    constructor(code: number, msg: ResultMessageEnum | string, data?: T | object) {
        this.code = code;
        this.msg = msg;
        this.data = data ?? "";
    }

    set setCode(code: number) {
        this.code = code;
    }

    set setData(data: T) {
        this.data = data;
    }

    set setMsg(msg: ResultMessageEnum | string) {
        this.msg = msg;
    }

    public static success<T>(data: T) {
        return new Result(ResultCodeEnum.SUCCESS, ResultMessageEnum.SUCCESS, data);
    }

    public static error(errMsg: ResultMessageEnum | string) {
        return new Result(ResultCodeEnum.ERROR, errMsg);
    }

    public static paramsError() {
        return new Result(ResultCodeEnum.REQUEST_PARAMS_ERROR, ResultMessageEnum.REQUEST_PARAMS_ERROR);
    }

    public toString() {
        return {
            code: this.code,
            msg: this.msg,
            data: this.data
        }
    }
}
