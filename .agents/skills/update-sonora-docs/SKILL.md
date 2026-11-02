---
name: update-sonora-docs
description: Update the Sonora website documentation from published stable releases since the last verified docs sync. Use when asked to refresh Sonora docs, reconcile them with a released build, or document newly released behavior.
---

# Update Sonora docs

Maintain the website's user documentation against a published stable Sonora release. Document only behavior available in released builds. Track the last fully reviewed release and its source commit so subsequent runs cover exactly the released changes since the last successful update. These instructions use shared Markdown, Git, and shell commands and work in both Claude Code and Codex.

## Locate the repositories

Use paths supplied by the user. Otherwise locate the website from the current directory or its ancestors: its `package.json` is named `sonora-website`. The default local checkout is `/home/nolight/Projects/personal/website`. Look for the application in the sibling `sonora` directory, whose upstream is `sonorahq/sonora`.

Read applicable `AGENTS.md` and `CLAUDE.md` instructions in each repository. Inspect both working trees before editing; preserve existing work. Change the website documentation and its sync record, leaving the application checkout untouched.

Select the release before inspecting source. By default, query `https://api.github.com/repos/sonorahq/sonora/releases/latest` and use its `tag_name`. If the user supplies a version, verify its published release through `/releases/tags/<tag>`. Require a published release with `draft: false` and `prerelease: false`; a local tag alone does not prove a build was released. If release metadata is unavailable, report the blocker and leave the checkpoint unchanged rather than guessing from tag order or branch history.

If no source checkout is available, clone `https://github.com/sonorahq/sonora.git` into a temporary directory. Resolve the selected upstream release tag to its full peeled commit SHA and call that `TARGET`; fetch the tag into an isolated temporary checkout if it is missing locally or differs from upstream. Report the release tag and SHA. Do not switch or reset an existing checkout.

Read source at `TARGET`, using `git show "$TARGET:path"`, a Git archive, or a temporary detached worktree. Never use branch `HEAD`, `main`, an `Unreleased` changelog section, or uncommitted source as evidence of released behavior. Development changes are excluded even when they are already merged. Use the changelog, defaults, UI labels, packaging and dependency revisions at the release tag.

## Establish the review range

The checkpoint is `.sonora-docs-sync.json` at the website root. It belongs with the docs changes in version control. Its format is:

```json
{
	"schema_version": 2,
	"source_repository": "https://github.com/sonorahq/sonora",
	"release_tag": "<verified published stable release tag>",
	"source_commit": "<full verified release commit SHA>",
	"updated_at": "<UTC ISO 8601 timestamp>"
}
```

Do not create this file merely by loading the skill or selecting a target. Its release and commit mean all documentation-relevant released changes through that revision have been reviewed.

- If a version 2 record exists, validate its repository and published stable `release_tag`, verify that the tag's peeled commit equals `source_commit`, resolve that commit as `BASE`, and verify that it is an ancestor of `TARGET` with `git merge-base --is-ancestor "$BASE" "$TARGET"`.
- Treat a legacy version 1 record without a release tag, or a checkpoint from unreleased source, as unverified for this workflow. Perform a full audit against the selected release, remove development-only guidance, and replace the record with version 2 only after validation. A corrected checkpoint may move back from a development commit to the released commit; explain that this is a baseline repair.
- If it refers to an unavailable commit, fetch enough source history to resolve it. If it still cannot be resolved, or the history diverged, explain the issue and perform a full audit against `TARGET` before replacing the baseline. Never silently use the merge base as the last docs update.
- On the first run, use an explicit last-documented published stable release supplied by the user if available, verifying its tag and commit. Otherwise audit every existing docs page and the FAQ against `TARGET` to establish a trustworthy baseline. Website commit dates and the latest docs edit are clues, not proof of a documented release.
- If `BASE` equals `TARGET`, check for pending user docs work or an explicitly requested audit; otherwise report that there are no new source commits and leave the checkpoint unchanged.

For an incremental run, inspect the full range, including merge results:

```sh
git -C "$SONORA" log --oneline "$BASE..$TARGET"
git -C "$SONORA" diff --stat "$BASE" "$TARGET"
git -C "$SONORA" diff --name-status "$BASE" "$TARGET"
git -C "$SONORA" diff "$BASE" "$TARGET" -- CHANGELOG.md
```

Review relevant patches and their surrounding implementation at `TARGET`. The changelog helps discover changes; code and its call sites establish actual behavior. Do not limit the range to commits whose messages contain `feat` or `docs`.

## Map source changes to user documentation

Build a compact checklist of changed behavior, source evidence, and affected pages. Cover additions, removals, changed defaults, platform/provider restrictions, setup steps, menu labels, persisted settings, shortcuts, and fixes that make an existing workaround obsolete. Internal refactors need no prose unless they change observable behavior.

Use these starting points, discovering exact files with `rg` as needed:

| Documentation                             | Source evidence                                                                                                                 |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `src/routes/docs/providers/+page.svelte`  | `crates/music/`, provider registration in `crates/sonora/src/main.rs`, login UI and auth in `crates/views/` and `crates/state/` |
| `src/routes/docs/shortcuts/+page.svelte`  | `crates/input/`, action bindings and platform conditions in `crates/sonora/` and `crates/views/`                                |
| `src/routes/docs/scrobbling/+page.svelte` | `crates/music/src/scrobble/`, `crates/state/src/scrobble.rs`, settings UI                                                       |
| `src/routes/docs/settings/+page.svelte`   | `crates/state/src/settings.rs`, `crates/views/src/screens/settings.rs`, `crates/storage/`, `nix/modules/hm/`, `flake.nix`       |
| `src/routes/docs/themes/+page.svelte`     | `crates/ui/src/theme.rs`, theme loading and overrides, settings UI                                                              |
| `src/routes/docs/logs/+page.svelte`       | `crates/sonora/src/logging.rs`, `crates/state/src/logging.rs`, storage paths                                                    |
| `src/routes/faq/+page.svelte`             | Auth, playback, platform initialization, packaging, and error paths supporting each answer                                      |
| `src/routes/docs/roadmap/+page.svelte`    | Implemented features at `TARGET` and release sections in `CHANGELOG.md`                                                         |
| Introduction, help, vision                | Changed onboarding, support links, or explicit project policy                                                                   |

Trace settings through serialization, defaults, and UI rather than inferring their names from display labels. Verify shortcut contexts and platform guards. Check concrete error messages, ports, environment variables, paths, and provider limitations where the docs mention them.

Do not add unreleased feature instructions, availability notes, or development-build sections to the docs or FAQ. Remove any such material encountered during the audit. Existing roadmap plans may remain, but development commits do not make an item shipped and should not introduce new plans. Mark items as shipped only when the selected release or an earlier published release supports that status. Preserve the existing `Entry.done` convention: a release string when known, `true` only for verified shipped work whose release is unknown. Do not invent release numbers, plans, or project policy.

## Edit the website

Update existing pages where possible, using short, plain American English and practical instructions. Remove outdated advice and reconcile duplicate claims across the docs and FAQ. Preserve existing anchor IDs when possible; update links when an anchor must change.

These are Svelte pages, not Markdown documents. Follow existing structure: `<svelte:head>` title, `<h1>`, `.summary`, and headings with stable IDs. Reuse `src/lib/components/docs/Code.svelte`, `MenuPath.svelte`, and `AppButton.svelte` where they help explain commands or interface steps. Follow existing handling of braces in code examples.

For a new page, add its slug, title, summary, and group to `src/lib/data/docs.ts`. That registry drives navigation, the introduction, and search. Search indexes rendered `article.prose` content by `h2[id]`, so keep useful headings and content in that structure. Preserve FAQ question IDs and its existing component structure.

Review installation data in `src/lib/data/platforms.ts` when packaging or setup changes affect docs claims. Adjust it only where needed for accuracy. The changelog page already reads the application's `CHANGELOG.md` through `src/lib/changelog.ts`; do not duplicate release notes into a new static changelog. Update the interactive mock only if requested, and do not redesign the site as part of a docs sync.

## Validate and save the checkpoint

From the website root, format only edited files with the installed Prettier CLI. Run `bun run check` and `bun run build`. The build may fetch upstream content: distinguish a network failure from a documentation failure. Inspect the diff, internal links, heading IDs, page registration, and examples. When rendered inspection is available, check affected pages, especially new routes, tables, code examples, and search visibility.

Finish the checklist: every relevant source change must be reflected in the docs, already accurately documented, or explicitly identified as needing no user documentation. If evidence is missing or a relevant change remains unresolved, keep the old checkpoint and report what is pending. On a first run, that means leaving the checkpoint absent.

Only after the review and required checks succeed, write schema version 2, the verified release tag, full `TARGET` SHA and current UTC timestamp to `.sonora-docs-sync.json`. A fully reviewed release range with no necessary prose changes may advance the checkpoint. Never advance it for a partial update or failed validation. Keep the selected release fixed during the run even if a newer release appears.

Report the reviewed release range (or full release audit), pages changed, validation results, and whether the checkpoint advanced or was repaired. Leave the changes ready for review; commit, push, or deploy only when requested.
