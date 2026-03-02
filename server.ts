import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { Resend } from "resend";
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  const resend = new Resend(process.env.RESEND_API_KEY);

  // API routes
  app.get("/robots.txt", (req, res) => {
    res.type("text/plain");
    res.send("User-agent: *\nAllow: /\nSitemap: https://ais-pre-juqdc7qwq7yawob6ij2axa-289326504495.asia-east1.run.app/sitemap.xml");
  });

  app.get("/sitemap.xml", (req, res) => {
    res.type("application/xml");
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://ais-pre-juqdc7qwq7yawob6ij2axa-289326504495.asia-east1.run.app/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`);
  });

  app.post("/api/contact", async (req, res) => {
    console.log(`[SERVER] Received POST request to /api/contact`);
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      console.log(`[SERVER] Missing required fields:`, { name, email, message });
      return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("[SERVER] RESEND_API_KEY is not configured");
      return res.status(500).json({ success: false, error: "Email service not configured" });
    }
    
    try {
      const { data, error } = await resend.emails.send({
        from: 'IPO Predictor Contact <onboarding@resend.dev>',
        to: 'earnrealcashnepal@gmail.com',
        subject: 'New Contact Message - IPO Predictor Nepal',
        html: `
          <h3>New Contact Message</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      });

      if (error) {
        console.error("[SERVER] Resend error:", error);
        return res.status(400).json({ success: false, error: error.message });
      }

      console.log("[SERVER] Email sent successfully:", data);
      res.json({ success: true });
    } catch (err) {
      console.error("[SERVER] Unexpected error sending email:", err);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
