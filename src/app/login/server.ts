import {getCaptchaUsingGet1} from "@/api/captchaController";
import {userLoginUsingPost1} from "@/api/authController";


export const queryServer = {
    captchaImage: async () =>
    {
        const {code, data} = await getCaptchaUsingGet1();

        if (code === 0)
        {
            return data
        }
        return null;
    },
    userLogin: async ({username, password, captcha, captchaId}: {
        username: string,
        password: string,
        captcha: string,
        captchaId: string
    }) =>
    {
        const response = await userLoginUsingPost1({
            userAccount: username,
            userPassword: password,
            captcha: captcha,
            captchaId: captchaId
        });
        return response as API.BaseResponseLoginUserVO_;
    }
}
