'use server'

import { UserAuthService } from "@/services/user-auth.service";
import { OnboardingType, OnboardingData } from "@/types/onboarding";
import { auth } from "@/auth";

export const createData = async (type: OnboardingType, data: OnboardingData) => {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return { success: false, error: "Unauthorized" }
        }

        const userId = parseInt(session.user.id);
        const result = await UserAuthService.completeOnboarding(type, data, userId)

        return { success: true, data: result }
    } catch (e: unknown) {
        console.error("Onboarding error:", e);
        const errorMessage = e instanceof Error ? e.message : "Internal Server Error";
        return { success: false, error: errorMessage };
    }
}

export const getParentByCode = async (code: string) => {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return { success: false, error: "Unauthorized" }
        }

        const result = await UserAuthService.findParentByCode(code);

        if (!result) {
            return { success: false, error: "Kode tidak ditemukan" }
        }

        return { success: true, data: result }
    } catch (e: unknown) {
        console.error("Get parent error:", e);
        const errorMessage = e instanceof Error ? e.message : "Internal Server Error";
        return { success: false, error: errorMessage };
    }
}