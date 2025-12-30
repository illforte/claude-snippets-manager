# Repository Origin

This is the **PUBLIC STANDALONE** version of the Claude Snippets Manager.

## Source

Originally developed as an internal tool in the weretrade infrastructure:
- **Private repo**: https://github.com/illforte/weretradeInfantrie_1.0
- **Original path**: `tools/dev-tools/snippets-manager/`
- **Extracted**: December 30, 2025
- **Purpose**: Share with Claude Code community as open-source tool

## Relationship to Private Repo

This public repo is **independent and standalone**:
- ✅ Can be used in any project
- ✅ No weretrade-specific dependencies
- ✅ Generic path handling (uses `process.cwd()`)
- ✅ MIT licensed

The private repo version:
- Uses weretrade-specific paths (`../../..` to reach project root)
- Integrated with weretrade infrastructure
- UNLICENSED (internal use only)

## Updates

Updates to this public repo do NOT automatically sync with the private repo and vice versa.

If a bug fix or feature should be shared:
1. Apply to one repo
2. Manually port to the other repo
3. Keep repos independent

## Key Differences

| Aspect | This Public Repo | Private Repo |
|--------|-----------------|--------------|
| Package name | `claude-snippets-manager` | `@weretrade/dev-snippets-manager` |
| License | MIT | UNLICENSED |
| Path handling | `process.cwd()` | `join(__dirname, '../../..')` |
| Terminology | "VSCode snippets" | "Claude command snippets" |

---

**This is the standalone, community version.**
