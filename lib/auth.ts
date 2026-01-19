import { betterAuth } from "better-auth";
import { phoneNumber } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from '~~/prisma/db'


export const auth = betterAuth({
    user: {
        additionalFields: {
            icsid: { type: 'string', optional: true },
        }
    },
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    plugins: [ 
        phoneNumber({ 
            sendOTP: ({ phoneNumber, code }, ctx) => { 
                console.log("Sending OTP to phone number:", phoneNumber, "with code:", code);
                // Implement sending OTP code via SMS
                // fetch(`http://dev.konsoftech.in:8080/ics/api/ah?oper=GENOTP&phone=${phoneNumber}&code=${code}`);
            },
            verifyOTP(data, ctx) {
                console.log("Verifying OTP for phone number:", data.phoneNumber, "with code:", data.code);
                // console.log("verifyOTP called for contezxt:", ctx);
                // Implement any additional verification logic if needed
                return true;
            }, 
            signUpOnVerification: {
                getTempEmail: (phoneNumber) => {
                    return `${phoneNumber}@my-site.com`
                },
                //optionally, you can also pass `getTempName` function to generate a temporary name for the user
                getTempName: (phoneNumber) => {
                    return phoneNumber //by default, it will use the phone number as the name
                }
            },
            sendPasswordResetOTP(data, ctx) {
                console.log("Sending Password Reset OTP to phone number:", data.phoneNumber, "with code:", data.code);
                // Implement sending OTP code via SMS for password reset
                // fetch(`http://dev.konsoftech.in:8080/ics/api/ah?oper=GENOTP&phone=${data.phoneNumber}&code=${data.code}`);
            },
            callbackOnVerification: async ({ phoneNumber, user }, ctx) => { 
                // Implement callback after phone number verification
                console.log("callbackOnVerification: Phone number verified:", phoneNumber, "for user:", user);
            }             

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