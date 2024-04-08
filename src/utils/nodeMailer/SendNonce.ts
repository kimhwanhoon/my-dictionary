import { render } from "@react-email/components";
import { transporter } from "./nodeMailer";
import { SendingOTPForm } from "./SendingOTPForm";

interface SendNonceProps {
  nonce: string;
  recipient: string;
}

export const sendNonce = async ({ nonce, recipient }: SendNonceProps) => {
  const title = "Your One-Time Password (OTP)";

  const emailHtml = render(SendingOTPForm(nonce));

  try {
    const mailOption = {
      from: `'김환훈⭐️' <${process.env.SMTP_USER}>`,
      to: recipient,
      subject: title,
      html: emailHtml,
    };

    const info = await transporter.sendMail(mailOption);

    // if email is accepted by the server
    if (info.accepted.length > 0) {
      return { error: false };
    } else {
      throw new Error("Failed to send email.");
    }
  } catch (error) {
    return { Error };
  }
};
