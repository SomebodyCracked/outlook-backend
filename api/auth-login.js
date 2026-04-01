export default function handler(req, res) {
  const url = `https://login.microsoftonline.com/${process.env.TENANT_ID}/oauth2/v2.0/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=${process.env.REDIRECT_URI}&response_mode=query&scope=offline_access%20Mail.Send%20User.Read`;

  res.redirect(url);
}
