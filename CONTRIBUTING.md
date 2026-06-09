# Contributing to glsl-helpers-react

Thank you for helping improve **glsl-helpers-react**. This project is a maintained fork of [mvilledieu/shadertoy-react](https://github.com/mvilledieu/shadertoy-react); upstream 1.x history belongs to Morgan Villedieu. Fork maintenance and 2.x work are by Henrique Stelzer de Oliveira.

## Before you start

- Read the [README](README.md) and [roadmap](docs/roadmap.md) for scope.
- For bug reports, see [ISSUES.md](ISSUES.md).
- Package license: MIT — see [LICENSE](LICENSE). Shader examples in `examples/src/shaders/` may carry **separate** licenses (e.g. CC BY-NC-SA from Shadertoy); those do not change the npm package license.

## Development setup

```bash
git clone https://github.com/HenriqueStelzer/glsl-helpers-react.git
cd glsl-helpers-react
npm install
npm start          # local demo grid
```

## Branch naming

Use descriptive prefixes:

| Prefix | Use for |
|--------|---------|
| `feat/` | New features or API additions |
| `fix/` | Bug fixes |
| `docs/` | Documentation only |
| `chore/` | Tooling, deps, repo hygiene |

Target `main` unless coordinating a release branch (e.g. `2.0.1`).

## Commit style

Use [Conventional Commits](https://www.conventionalcommits.org/) as on `main`:

- `feat:` — new behavior
- `fix:` — bug fix
- `docs:` — documentation
- `chore:` — maintenance

Example: `docs: add CONTRIBUTING workflow for 2.0.1`

## Before opening a PR

1. **`npm run transpile`** — rebuild `lib/glsl-helpers-react.min.js`
2. **`npm run build`** — rebuild examples when `examples/` changes
3. **`npm run changelog`** — when bumping `package.json` version
4. **TypeScript defs** — update `src/index.d.ts` (copied to `lib/index.d.ts` on transpile) when props or exports change
5. **Manual check** — run `npm start` and verify affected demos in the browser

## PR checklist

- [ ] Scope matches an open issue or roadmap item (or explain why not)
- [ ] `npm run transpile` passes; `lib/` updated if `src/` changed
- [ ] `npm run build` passes if examples changed
- [ ] `lib/index.d.ts` reflects any public API changes
- [ ] Docs updated when behavior or props change
- [ ] No unrelated drive-by refactors

## Documentation vault (Obsidian)

The `docs/` folder is configured as an Obsidian vault (`docs/.obsidian/`). You can:

- **Obsidian Desktop:** Open `docs/` as a vault for graph view and wikilinks.
- **Cursor:** The [Obsidian Preview](https://marketplace.visualstudio.com/items?itemName=px39n.obsidianpreview) extension previews markdown with vault-aware links when `obsidianPreview.vaultPath` points at `docs/`.
- **Agents (MCP):** A global Cursor MCP server (`@istrejo/obsidian-mcp`) can read and search notes in `docs/`. Example `~/.cursor/mcp.json` entry:

```json
{
  "mcpServers": {
    "obsidian": {
      "command": "npx",
      "args": ["-y", "@istrejo/obsidian-mcp"],
      "env": {
        "OBSIDIAN_VAULT_PATH": "/absolute/path/to/glsl-helpers-react/docs"
      }
    }
  }
}
```

Replace the path with your local clone. Reload MCP in Cursor Settings after editing.

## License and attribution

- **Package:** MIT — [LICENSE](LICENSE) (dual copyright: Morgan Villedieu + Henrique Stelzer de Oliveira).
- **Shaders:** Example fragment shaders may be CC BY-NC-SA or other licenses noted in file headers; do not assume MIT applies to shader source text.

## Questions

Open a [GitHub Discussion](https://github.com/HenriqueStelzer/glsl-helpers-react/discussions) or a [feature request](.github/ISSUE_TEMPLATE/feature_request.md) for design questions before large PRs.
