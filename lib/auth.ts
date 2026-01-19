import { betterAuth } from "better-auth";
import { phoneNumber } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from '~~/prisma/db'


export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    plugins: [ 
        phoneNumber({ 
            sendOTP: ({ phoneNumber, code }, ctx) => { 
                // Implement sending OTP code via SMS
                fetch(`http://dev.konsoftech.in:8080/ics/api/ah?oper=GENOTP&phone=${phoneNumber}&code=${code}`);
            },
            verifyOTP(data, ctx) {
                console.log("Verifying OTP for phone number:", data.phoneNumber, "with code:", data.code);
                // Implement any additional verification logic if needed
                return true;
            }, 
        }) 
    ] ,    
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
    },
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
    },
})