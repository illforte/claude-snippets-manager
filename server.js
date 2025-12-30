#!/usr/bin/env node

/**
 * Snippets Manager API Server
 *
 * Local development tool that serves:
 * - VSCode snippets from .vscode/prompts.code-snippets (readonly)
 * - User snippets from .vscode/user-snippets.json (editable)
 *
 * Usage:
 *   npm start              # Start server on port 3456
 *   npm start -- --port 8080  # Custom port
 */

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, writeFileSync, existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = process.cwd(); // Use current working directory

const app = express();
const PORT = process.env.PORT || 3456;

// Middleware
app.use(express.json());
app.use(express.static(join(__dirname, 'public')));

// CORS for local development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// API: Get VSCode snippets (readonly)
app.get('/api/snippets', (req, res) => {
  try {
    const filePath = join(projectRoot, '.vscode/prompts.code-snippets');

    if (!existsSync(filePath)) {
      return res.json({});
    }

    const data = JSON.parse(readFileSync(filePath, 'utf8'));
    res.json(data);
  } catch (err) {
    console.error('Error reading VSCode snippets:', err);
    res.status(500).json({ error: 'Failed to read VSCode snippets' });
  }
});

// API: Get user snippets (editable)
app.get('/api/user-snippets', (req, res) => {
  try {
    const filePath = join(projectRoot, '.vscode/user-snippets.json');

    if (!existsSync(filePath)) {
      // Create empty file if it doesn't exist
      const emptyData = {
        "Example User Snippet": {
          "prefix": "user-example",
          "description": "This is an editable user snippet - you can modify or delete this",
          "body": [
            "This is your personal snippet library.",
            "Feel free to add, edit, or delete these snippets.",
            "VSCode snippets are read-only and shown separately."
          ]
        }
      };
      writeFileSync(filePath, JSON.stringify(emptyData, null, 2));
      return res.json(emptyData);
    }

    const data = JSON.parse(readFileSync(filePath, 'utf8'));
    res.json(data);
  } catch (err) {
    console.error('Error reading user snippets:', err);
    res.status(500).json({ error: 'Failed to read user snippets' });
  }
});

// API: Save user snippets
app.put('/api/user-snippets', (req, res) => {
  try {
    const filePath = join(projectRoot, '.vscode/user-snippets.json');
    writeFileSync(filePath, JSON.stringify(req.body, null, 2));
    res.json({ success: true });
  } catch (err) {
    console.error('Error saving user snippets:', err);
    res.status(500).json({ error: 'Failed to save user snippets' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    version: '1.0.0',
    endpoints: {
      vscode_snippets: '/api/snippets',
      user_snippets: '/api/user-snippets',
      viewer: '/'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n✅ Snippets Manager running at http://localhost:${PORT}`);
  console.log(`   - Viewer: http://localhost:${PORT}`);
  console.log(`   - API: http://localhost:${PORT}/api/health\n`);
});
