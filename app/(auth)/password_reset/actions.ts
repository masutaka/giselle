"use server";

import { createClient } from "@/lib/supabase";
import { AuthError } from "@supabase/auth-js";
import { redirect } from "next/navigation";

export const sendPasswordResetEmail = async (
	prevState: AuthError | null,
	formData: FormData,
): Promise<AuthError | null> => {
	const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
	if (siteUrl == null) {
		throw new Error("NEXT_PUBLIC_SITE_URL is not set");
	}
	const email = formData.get("email");
	if (email == null || typeof email !== "string") {
		return new AuthError("invalid_email");
	}
	const supabase = createClient();
	const { error } = await supabase.auth.resetPasswordForEmail(email, {
		redirectTo: `${siteUrl}/password_reset/new_password`,
	});
	if (error) {
		return error;
	}
	redirect("/password_reset/sent");
	return null;
};
