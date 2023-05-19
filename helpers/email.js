import nodemailer from 'nodemailer';

export const emailRegistro = async (datos) => {
  const { email, nombre, token } = datos;
  var transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER,
      pass: process.env.PASS
    } 
  });

  const info = await transport.sendMail({
    from: 'dinaelaragon@agos.mx',
    to: email,
    subject: "TimeApp - Comprueba tu cuenta",
    text: "Comprueba tu cuenta en el TimeApp",
    html: `<p>Hola: ${nombre} Comprueba tu cuenta en TimeApp</p>
          <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace: </p>
          <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar cuenta</a>
          
          <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
          `
  })
}


export const emailOlvidePassword = async (datos) => {
  const { email, nombre, token } = datos;
  var transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER,
      pass: process.env.PASS
    }
  });


  const info = await transport.sendMail({
    from: 'dinaelaragon@agos.mx',
    to: email,
    subject: "TimeApp - Reestablece tu password",
    text: "Reestablece tu password",
    html: `<p>Hola: ${nombre} Restablece tu password</p>
        <p>Sigue el siguiente enlace para generar un nuevo password: </p>
        <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer password</a>
        <p>Si tu no solicitaste este email, ignoralo</p>
        `,
  })
}