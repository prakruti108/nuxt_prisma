import {auth} from '~~/lib/auth'
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    console.log("Register POST body:", body);

    const session = await auth.api.getSession({headers: event.headers});
    if(!session){
        throw createError({ statusCode: 401, statusMessage: "Unauthorized" });
    }
    await auth.api.setPassword({
        body: {
            newPassword: body.password ? body.password : 'harekrishna',
        },
        headers: event.headers,
        
    });
    return { message: "User registered successfully", data: body };
});