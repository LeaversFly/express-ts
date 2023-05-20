/**
 * Created Date: Thursday, November 3rd 2022, 12:46:47 am
 * Author: CodingGorit
 * -----
 * Last Modified: Sat Nov 05 2022
 * Modified By: CodingGorit
 * -----
 * Copyright (c) 2022 fmin-courses
 * ------------------------------------
 * Javascript will save your soul!
 */

import Utils from "../utils/Utils"


/**
 * Get random string code
 * @param len min is 4
 * @returns a string with alpha and number
 */
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