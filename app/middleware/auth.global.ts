import { authClient } from "~~/lib/auth-client";
export default defineNuxtRouteMiddleware(async (to, from) => {
	const session = authClient.useSession(); 
	if (!session.value?.data) {
		if (to.path === "/drafts" || to.path === "/create") {
			return navigateTo("/");
		}
	}
});