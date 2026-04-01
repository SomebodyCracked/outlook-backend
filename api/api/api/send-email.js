import axios from "axios";

export default async function handler(req, res) {
  const { to, subject, body, token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "Missing access token" });
  }

  try {
    await axios.post(
      "https://graph.microsoft.com/v1.0/me/sendMail",
      {
        message: {
          subject: subject,
          body: {
            contentType: "Text",
            content: body,
          },
          toRecipients: [
            {
              emailAddress: {
                address: to,
              },
            },
          ],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json({ success: true });

  } catch (err) {
    res.status(500).json({
      error: err.response?.data || err.message
    });
  }
}
