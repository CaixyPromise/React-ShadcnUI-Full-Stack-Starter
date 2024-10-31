import {modifyPasswordUsingPost1, resetEmailUsingPost1, updateMeProfileUsingPost1} from "@/api/userController";
import {sendEmailUsingPost1} from "@/api/emailController";
import {uploadFileUsingPost1} from "@/api/fileController";

export const queryServer = {
    updateUserInfo: async (data: API.UserUpdateProfileRequest) => {
        const {code} = await updateMeProfileUsingPost1(data);
        return code === 0;
    },
    fetchEmailCode: async (data: API.SendEmailRequest) => {
        const {code} = await sendEmailUsingPost1(data);
        return code === 0;
    },
    modifyEmail: async (data: API.UserResetEmailRequest) => {
        const {code} = await resetEmailUsingPost1(data);
        return code === 0;
    },
    resetPassword: async (data: API.UserModifyPasswordRequest) => {
        const {code} = await modifyPasswordUsingPost1(data);
        return code === 0;
    },
    uploadAvatar: async (file: File)=> {
        if (file) {
            return await uploadFileUsingPost1(
                null,
                {
                    biz: "user_avatar"
                },
                file)
        }
    }
}
