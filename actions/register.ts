'use server'
import { UserAuthService } from "@/services/user-auth.service";
import { RegisterUserData } from "@/types/auth";

export const register = async (data: RegisterUserData) => {
    try {
        const user = await UserAuthService.createUser(data);

        return { success: true, data: user }
    } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : "Internal Server Error";
        return { error: errorMessage }
    }
}