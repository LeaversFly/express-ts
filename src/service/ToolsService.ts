import Utils from "../utils/Utils"

export const getRandomVerifyCode = (len = 8) => {
    const opt = {
        verifyCode: "0000"
    }
    if (len <= 4) {
        opt.verifyCode = Utils.getInstance().getRandomVerfiyCode(4);
    } else {
        opt.verifyCode = Utils.getInstance().getRandomVerfiyCode(len);
    }
    return opt;
}