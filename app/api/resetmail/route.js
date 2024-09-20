import { resetMail } from "@/app/utils/resetmail.utils";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ID: 1,
    nombre: "franklim",
    telefono: "3183797686",
    status: true,
  });
}

//reset password resetMail
export async function POST(req) {
  try {
    // Parse the request body
    const { email, codigo } = await req.json();

    // Options for the email
    const mailOptions = {
      from: '"Portafolio franklim 👻" <maddison53@ethereal.email>', // Sender's email
      to: [email, "1107050440f@gmail.com"], // Recipient(s)
      subject: "Reset Password", // Subject
      text: `Bienvenidos a nuestra pagina web`, // Plain text email content
      html: `<div>Tu codigo es :<br/>
      Email: ${email} . <br/>
      Codigo: ${codigo} . <br/> 
      <p>Digita el codigo el pa pagina para actualizar tu contraseña. </p> <br/>
      <img src="https://icons.iconarchive.com/icons/custom-icon-design/pretty-office-12/512/mail-message-send-icon.png" width="150px" />

      </div>`, // HTML email content
    };

    // Send the email
    const result = await resetMail(mailOptions);

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
    console.error("Error sending code:", error);

    // Return error response
    return new Response(
      JSON.stringify({
        message: "Failed to send the code",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
