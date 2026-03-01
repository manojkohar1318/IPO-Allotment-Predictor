import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

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

  app.post("/api/contact", (req, res) => {
    console.log(`[SERVER] Received POST request to /api/contact`);
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      console.log(`[SERVER] Missing required fields:`, { name, email, message });
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }
    
    // In a real app, you'd use a service like Resend, SendGrid, or Nodemailer here.
    // For this demo, we'll log it and return success.
    // The user can connect this to a real service.
    console.log(`\n--- NEW CONTACT MESSAGE ---`);
    console.log(`To: earnrealcashnepal@gmail.com`);
    console.log(`From: ${name} (${email})`);
    console.log(`Message: ${message}`);
    console.log(`---------------------------\n`);
    
    // Simulate success
    res.json({ success: true, message: "Message sent successfully!" });
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
