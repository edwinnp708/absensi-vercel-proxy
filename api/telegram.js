export default async function handler(req, res) {
  const { method, body, query } = req;

  // URL Web App kamu dari Google Apps Script
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwpGQ9ij8Ft00p47a-CT2IyIhICC2tUVW_y71B1MnroyffZSHQvlKHciLdaSSMnzrzm/exec";

  try {
    if (method === "POST") {
      const forward = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
      });

      const result = await forward.text();
      return res.status(200).send(result);

    } else if (method === "GET") {
      const qs = new URLSearchParams(query).toString();
      const forward = await fetch(`${GOOGLE_SCRIPT_URL}?${qs}`);
      const result = await forward.text();
      return res.status(200).send(result);

    } else {
      return res.status(405).send("Method not allowed");
    }

  } catch (error) {
    console.error("Proxy error:", error);
    return res.status(500).send("Internal Server Error");
  }
}
