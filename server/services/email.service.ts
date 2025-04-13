import e from "express";
import { generatePasswordResetEmailHtml, generateResetSuccessEmailHtml, generateWelcomeEmailHtml, htmlContent } from "../email_template/htmlEmail";
import { client, sender } from "../email_template/mailtrap";

class EmailService{
  
 async sendVerificationEmail(email: string, verificationToken: string){
    const recipient = [{ email }];
    try {
        const res = await client.send({
            from: sender,
            to: recipient,
            subject: 'Verify your email',
            html:htmlContent.replace("{verificationToken}", verificationToken),
            category: 'Email Verification'
        });
    } catch (error) {
        console.log(error);
        throw new Error("Failed to send email verification")

    }
}

async sendWelcomeEmai(email: string, name: string){
    const recipient = [{ email }];
    const htmlContent = generateWelcomeEmailHtml(name);
    try {
        const res = await client.send({
            from: sender,
            to: recipient,
            subject: 'Welcome to our restaurant',
            html:htmlContent,
            template_variables:{
                company_info_name:"BheshRajEats",
                name:name
            }
        });
    } catch (error) {
        console.log(error);
        throw new Error("Failed to send welcome email")
    }

}

async sendPasswordResetEmail(email: string, resetURL: string){
    const recipient = [{ email }];
    const htmlContent = generatePasswordResetEmailHtml(resetURL);
  
    try {
        const res = await client.send({
            from: sender,
            to: recipient,
            subject: 'Reset your password',
            html:htmlContent,
            category:"Reset Password"
        });
    } catch (error) {
        console.log(error);
        throw new Error("Failed to reset password")
    }
}


async sendResetSuccessEmail(email:string) {
    const recipient = [{ email }];
    const htmlContent = generateResetSuccessEmailHtml();
    try {
        const res = await client.send({
            from: sender,
            to: recipient,
            subject: 'Password Reset Successfully',
            html:htmlContent,
            category:"Password Reset"
        });
    } catch (error) {
        console.log(error);
        throw new Error("Failed to send password reset success email");
    }
}
}
export default  EmailService;



