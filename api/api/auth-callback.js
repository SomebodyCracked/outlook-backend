import axios from "axios";

export default async function handler(req, res) {
  const code = req.query.code;

  try {
    const tokenRes = await axios.post(
      `https://login.microsoftonline.com/${process.env.TENANT_ID}/oauth2/v2.0/token`,
      new URLSearchParams({
        client_id: process.env.CLIENT_ID,
        code: code,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: "authorization_code",
        client_secret: process.env.CLIENT_SECRET,
        scope: "offline_access Mail.Send User.Read"
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    );

    res.status(200).json({
      ok: true,
      access_token: tokenRes.data.access_token,
      refresh_token: tokenRes.data.refresh_token || null
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      error: err.response?.data || err.message
    });
  }
}
