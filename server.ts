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
  app.post("/api/contact", (req, res) => {
    const { name, email, message } = req.body;
    
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
