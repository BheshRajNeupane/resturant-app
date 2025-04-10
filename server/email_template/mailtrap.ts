import {MailtrapClient} from "mailtrap";

 
export const client = new MailtrapClient({token: process.env.MAILTRAP_API_KEY as string});

export const sender = {
  email: "hello@demomailtrap.co",
  name: "Bhesh Raj Restaurant",
};