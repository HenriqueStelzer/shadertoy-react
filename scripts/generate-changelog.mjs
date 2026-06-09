import { execSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const UPSTREAM_URL = "https://github.com/mvilledieu/shadertoy-react";
const FORK_URL = "https://github.com/HenriqueStelzer/glsl-helpers-react";
const OUTPUT_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "docs", "changelog");

/** Fork maintenance starts at 1.2.0; upstream repo does not contain those commits. */
const repoUrlForVersion = (version) => {
  const [major, minor] = version.split(".").map(Number);
  return major > 1 || (major === 1 && minor >= 2) ? FORK_URL : UPSTREAM_URL;
};

/** Version bumps: short hash of the commit that set package.json to this version. */
const VERSION_BUMPS = [
  { hash: "c0e6c39", version: "1.0.0" },
  { hash: "c249fd4", version: "1.0.2" },
  { hash: "acd6e9f", version: "1.0.3" },
  { hash: "552f8c8", version: "1.0.5" },
  { hash: "811a418", version: "1.0.6" },
  { hash: "58969a7", version: "1.0.8" },
  { hash: "84e7f40", version: "1.1.0" },
  { hash: "620dff0", version: "1.1.1" },
  { hash: "9169a22", version: "1.1.2" },
  { hash: "3985271", version: "1.2.0" },
  { hash: "feb16ff", version: "2.0.0" },
].filter((b) => b.hash !== "0000000");

/** Annotated git tags (may differ from the package.json bump commit). */
const VERSION_TAGS = {
  "2.0.0": { hash: "ebd5404", tag: "v2.0.0" },
};

const VERSION_SUMMARIES = {
  "1.2.0": `## Summary

**Package:** \`shadertoy-react\` (fork maintenance — published from [HenriqueStelzer/glsl-helpers-react](${FORK_URL}))

- Webpack 5 and React 17–19 peer dependency support
- WebGL2 / GLSL 3.00 auto-detection and \`webgl\` prop
- Build toolchain modernization (Babel 7.26, webpack-dev-server 5)

`,
  "2.0.0": `## Summary

**Package:** \`glsl-helpers-react\` (rebrand from \`shadertoy-react\` / \`shadertoy-react-19\`)

### Breaking
- npm package renamed to **glsl-helpers-react**
- Default export is **\`GlslCanvas\`**; \`ShadertoyReact\` is a deprecated named export
- Built bundle paths: \`lib/glsl-helpers-react.min.js\`
- Peer dependency: React **17–19**

### Features
- WebGL2 / GLSL 3.00 auto-detection and \`webgl\` prop
- Reactive prop updates without remount (\`fs\`, \`textures\`, \`defines\`, uniforms schema)
- \`#define\` injection via \`defines\` prop
- Responsive texture \`srcSet\`
- \`iChannelTime\` for video/camera channels
- Texture types: camera, raw data, cube map, keyboard
- Multi-pass rendering via \`passes\` + \`FramebufferPool\`
- \`persistentTime\` prop and \`iPersistentTime\` uniform (extension)
- TypeScript definitions (\`lib/index.d.ts\`)

### Fixes (2.0.0 RC)
- Multi-pass rendering: correct WebGL context reference
- Per-frame clock (\`iTime\`, \`iFrame\`, \`iTimeDelta\`) advances once per frame in multi-pass
- Shader recompile no longer duplicates event listeners
- Mouse click coordinates aligned with move handler
- \`4i\` custom uniform uses \`uniform4i\`
- \`rgba32f\` data textures gated on WebGL2 / \`OES_texture_float\`

### Docs & tooling
- README rewrite with migration guide
- \`docs/changelog/\`, migration, textures, multi-pass, uniforms, troubleshooting
- \`npm run changelog\` generator

`,
};

function escapeMarkdown(text) {
  return text.replace(/\|/g, "\\|");
}

function getCommits() {
  const output = execSync('git log --format="%H|%h|%ad|%s" --date=short --reverse', {
    encoding: "utf8",
  });
  return output
    .trim()
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      const [full, short, date, ...subjectParts] = line.split("|");
      return { full, short, date, subject: subjectParts.join("|") };
    });
}

function bucketByVersion(commits) {
  const hashToIndex = new Map(commits.map((c, i) => [c.short, i]));

  return VERSION_BUMPS.map((bump, i) => {
    const start = hashToIndex.get(bump.hash);
    if (start === undefined) {
      throw new Error(`Version bump commit not found: ${bump.hash} (${bump.version})`);
    }
    const end =
      i + 1 < VERSION_BUMPS.length
        ? hashToIndex.get(VERSION_BUMPS[i + 1].hash)
        : commits.length;
    const versionCommits = commits.slice(start, end);
    const releaseCommit = versionCommits[0];
    return {
      version: bump.version,
      releaseCommit,
      releaseDate: releaseCommit.date,
      commits: versionCommits,
    };
  });
}

function splitCommitsAtTag(version, commits) {
  const tag = VERSION_TAGS[version];
  if (!tag) {
    return { released: commits, postTag: [] };
  }
  const tagIndex = commits.findIndex((c) => c.short === tag.hash);
  if (tagIndex === -1) {
    return { released: commits, postTag: [] };
  }
  return {
    released: commits.slice(0, tagIndex + 1),
    postTag: commits.slice(tagIndex + 1),
  };
}

function writeVersionFile({ version, releaseCommit, releaseDate, commits }) {
  const repoUrl = repoUrlForVersion(version);
  const tag = VERSION_TAGS[version];
  const { released, postTag } = splitCommitsAtTag(version, commits);
  const commitCount = released.length + postTag.length;

  const lines = [
    `# ${version}`,
    "",
    `- **Release commit:** [\`${releaseCommit.short}\`](${repoUrl}/commit/${releaseCommit.full})`,
    `- **Release date:** ${releaseDate}`,
    `- **Commits:** ${commitCount}`,
    "",
  ];

  if (tag) {
    lines.push(
      `- **Git tag:** [\`${tag.tag}\`](${repoUrl}/releases/tag/${tag.tag}) at [\`${tag.hash}\`](${repoUrl}/commit/${commits.find((c) => c.short === tag.hash)?.full ?? tag.hash})`,
      ""
    );
  }

  if (VERSION_SUMMARIES[version]) {
    lines.push(VERSION_SUMMARIES[version]);
  }

  const writeCommitTable = (heading, rows) => {
    if (rows.length === 0) {
      return;
    }
    lines.push(heading, "", "| Date | Commit | Message |", "|------|--------|---------|");
    for (const c of rows) {
      const url = repoUrlForVersion(version);
      lines.push(
        `| ${c.date} | [\`${c.short}\`](${url}/commit/${c.full}) | ${escapeMarkdown(c.subject)} |`
      );
    }
    lines.push("");
  };

  writeCommitTable("## Commits", released);
  if (postTag.length > 0) {
    writeCommitTable("## Commits (post-tag, on main)", postTag);
  }

  writeFileSync(join(OUTPUT_DIR, `${version}.md`), lines.join("\n"));
}

function writeIndex(buckets) {
  const totalCommits = buckets.reduce((sum, b) => sum + b.commits.length, 0);

  const lines = [
    "# Changelog",
    "",
    "Commit history grouped by published npm version.",
    "",
    "- **1.0.0–1.1.2:** [mvilledieu/shadertoy-react](https://github.com/mvilledieu/shadertoy-react) (upstream)",
    "- **1.2.0+:** [HenriqueStelzer/glsl-helpers-react](https://github.com/HenriqueStelzer/glsl-helpers-react) (fork)",
    "",
    "Only published npm versions are listed. Intermediate semver numbers (1.0.1, 1.0.4, 1.0.7, 1.0.9) were never published.",
    "",
    "| Version | Release date | Commits | Changelog |",
    "|---------|--------------|---------|-----------|",
  ];

  for (const b of buckets) {
    const { released, postTag } = splitCommitsAtTag(b.version, b.commits);
    const countLabel =
      postTag.length > 0 ? `${released.length}+${postTag.length}` : String(b.commits.length);
    lines.push(
      `| ${b.version} | ${b.releaseDate} | ${countLabel} | [${b.version}.md](./${b.version}.md) |`
    );
  }

  lines.push(
    "",
    `**Total commits:** ${totalCommits}`,
    "",
    `Generated from git history. Regenerate with \`npm run changelog\`.`,
    ""
  );

  writeFileSync(join(OUTPUT_DIR, "README.md"), lines.join("\n"));
}

function main() {
  const commits = getCommits();
  const buckets = bucketByVersion(commits);

  mkdirSync(OUTPUT_DIR, { recursive: true });

  for (const bucket of buckets) {
    writeVersionFile(bucket);
  }
  writeIndex(buckets);

  const total = buckets.reduce((sum, b) => sum + b.commits.length, 0);
  console.log(`Wrote ${buckets.length} version files + README.md (${total} commits)`);
}

main();
