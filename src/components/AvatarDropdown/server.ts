import {userLogoutUsingPost1} from "@/api/authController";

export const queryServer = {
    logOut: async () => {
        return await userLogoutUsingPost1();
    }
}
