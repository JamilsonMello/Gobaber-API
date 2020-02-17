export default {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.MAIL_SECURE,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  },
  default: {
    from: 'Equipe GoBarber <noreply@gobarber.com>',
  },
};

// Amazon SES
// Mailgun
// Sparkpost
// Mandril para quem usa Mailchimp

// aqui iremos usar o Mailtrap para ambiente de desenvolvimento(apenas);
