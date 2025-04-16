import nodemailer from "nodemailer";

export const sendEmail = async ({to, subject, text}) => {

  try {
    if (!to) {
      throw new Error("No recipient defined");
    }

    // Define transport configuration (Gmail example, replace with your own if different)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        // eslint-disable-next-line no-undef
        user: process.env.SMTP_USERNAME,
        // eslint-disable-next-line no-undef
        pass: process.env.SMTP_PASSWORD,
      },
     
    });

    const mailOptions = {
        // eslint-disable-next-line no-undef
        from: process.env.SMTP_USERNAME,
        to: to,
        subject: subject,
        text: text,
    }
    const info = await transporter.sendMail(mailOptions)
    // // Send email
    // const info = await transporter.sendMail({
    //   // eslint-disable-next-line no-undef
    //   from: process.env.SMTP_USERNAME, // Sender email address
    //   to: to.to, // Recipient email address
    //   subject: to.subject, // Subject
    //   text: `Message sent sucessfully: ${to.text}`,
    // });

    console.log("Email sent successfully:", info);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Could not send email: " + error.message);
  }
};
