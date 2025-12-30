# Claude Snippets Manager

Visual interface for managing VSCode snippets with auto-copy functionality. Perfect for Claude Code users managing command snippets and personal code templates.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)

## Features

- **Two-layer snippet system**:
  - 🔒 **VSCode Snippets** - Read-only snippets from `.vscode/prompts.code-snippets`
  - 📝 **User Snippets** - Editable snippets from `.vscode/user-snippets.json`

- **Auto-copy on interaction** - Click anywhere on a snippet card to copy
- **Visual editing** - Edit snippet names, prefixes, descriptions, and bodies inline
- **Search & filter** - Find snippets by name, prefix, description, or body content
- **Source filtering** - Filter by VSCode/User/All snippets
- **Import/export** - Backup and restore your snippets as JSON
- **Dark/Light themes** - Toggle between themes
- **Responsive grid** - Adjust columns (1/2/4) based on your screen size
- **Height-optimized cards** - More space for code, less for descriptions

## Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/claude-snippets-manager.git
cd claude-snippets-manager

# Install dependencies
npm install

# Start the server
npm start
```

The server will start at `http://localhost:3456`

## Usage

### Run from Your Project Root

```bash
# Navigate to your project root (where .vscode/ folder is)
cd /path/to/your/project

# Run the snippets manager
npx claude-snippets-manager
```

### Keyboard Shortcuts

- `Ctrl/Cmd + N` - Add new snippet
- `/` - Focus search
- `Ctrl/Cmd + F` - Focus search
- `Escape` - Close modal or clear search
- `Enter` (in editable field) - Save and close field
- Click anywhere on card - Copy snippet body

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `GET /api/snippets` | GET | Load VSCode snippets (readonly) |
| `GET /api/user-snippets` | GET | Load user snippets (editable) |
| `PUT /api/user-snippets` | PUT | Save user snippets |
| `GET /api/health` | GET | Health check |

## File Structure

```
claude-snippets-manager/
├── server.js              # Express API server
├── public/
│   └── index.html        # Snippet viewer UI
├── package.json           # Dependencies
└── README.md              # This file
```

## Data Files

The manager looks for these files in your project's `.vscode/` folder:

- **VSCode Snippets**: `.vscode/prompts.code-snippets` (readonly)
- **User Snippets**: `.vscode/user-snippets.json` (editable)

If these files don't exist, the manager will create them automatically.

## Features in Detail

### Two-Layer System

The snippet manager merges two data sources:

1. **VSCode Snippets** (`.vscode/prompts.code-snippets`)
   - Displayed with orange 🔒 badge
   - Read-only (cannot edit or delete)
   - Can be duplicated to create editable copies
   - Perfect for Claude Code command snippets

2. **User Snippets** (`.vscode/user-snippets.json`)
   - Displayed with green 📝 badge
   - Fully editable (name, prefix, description, body)
   - Can be deleted
   - Auto-saved on every change

### Auto-Copy Functionality

Every interaction with a snippet card copies the body to your clipboard:

- Click anywhere on the card (except duplicate/delete buttons)
- Focus on any editable field
- Hover shows "📋 Auto-copy" hint
- Success shows "✓ Copied!" overlay

This makes it impossible to miss copying a snippet.

### Visual Editing

For user snippets, click any field to edit inline:

- **Name** - Click title to rename
- **Prefix** - Click badge to change prefix
- **Description** - Click italic text to edit
- **Body** - Click code block to edit content

Press `Enter` to save, changes auto-sync to file.

### Height Optimization

Snippet cards are optimized for content visibility:

- **Description**: Max 2 lines with ellipsis overflow
- **Body**: 220px height to show more code
- **Result**: ~7x more code visible than description text

### Bulk Actions

Select multiple snippets (click checkbox on hover) to:

- Delete multiple snippets at once
- Clear selection

### Import/Export

- **Export** - Downloads all snippets as JSON (includes both layers)
- **Import** - Adds snippets from JSON file (won't override existing)

## Development

### Watch mode

```bash
npm run dev  # Uses nodemon for auto-reload
```

### Custom Port

```bash
PORT=8080 npm start
```

## Use Cases

### Claude Code Users

Perfect for managing your custom Claude commands:

1. Store read-only Claude commands in `.vscode/prompts.code-snippets`
2. Create editable personal variations in user snippets
3. Quick-copy any command with a single click
4. Search across all your commands instantly

### VSCode Snippet Management

Ideal for developers who want a visual interface for VSCode snippets:

1. Visual editing instead of JSON files
2. Auto-copy for quick insertion
3. Search and filter across all snippets
4. Import/export for sharing with team

## Troubleshooting

**Issue: "Error loading"**
- Ensure server is running on port 3456
- Check that you're in a directory with a `.vscode/` folder
- Check browser console for errors

**Issue: Changes not saving**
- Check that you're editing User snippets (green badge), not VSCode snippets (orange badge)
- Check server logs for save errors
- Verify `.vscode/user-snippets.json` is writable

**Issue: Port already in use**
- Use custom port: `PORT=8080 npm start`
- Or kill existing process: `lsof -i :3456` then `kill -9 <PID>`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Credits

Built for the Claude Code community. Enhances the developer experience when managing VSCode snippets and Claude commands.
