export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  // For JWT, signout is handled client-side by deleting the token.
  res.status(200).json({ message: "Signed out" });
}
