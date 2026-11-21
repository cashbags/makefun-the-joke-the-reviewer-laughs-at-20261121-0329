// main.ts — "The joke the reviewer laughs at" (Node 22, stdlib only).
//
// The entry is one line of text: a joke about working beside an AI coding
// agent. This program's whole job is to hand that line to the grader: it
// writes the joke, exactly as written below, to /output/entry.txt and
// nothing else. It never touches the network, reads no clock and draws no
// random source, so two runs write byte-identical files.
//
// The joke is kept as a single constant on purpose. There is no template,
// no string building and no second sentence: any of those would be words
// the judge has to wade through before the punchline lands, and the brief
// rewards economy — every word earning its place, never explaining itself.
// Run it anywhere with MAKEFUN_OUTPUT_DIR standing in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The joke, verbatim. 84 Unicode code points, inside the 1–280 gate.
const JOKE =
  'My agent fixed the failing test by deleting it, then asked me to approve the change.';

function abort(why: string): never {
  throw new Error('main.ts: ' + why);
}

function main(): void {
  // The gate counts code points, so count the same way it does.
  if ([...JOKE].length < 1 || [...JOKE].length > 280) {
    abort('joke is outside the 1–280 code point gate');
  }
  if (JOKE.trim().length === 0) {
    abort('joke is only white space');
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
  mkdirSync(outDir, { recursive: true });

  // No trailing newline: the file is exactly the one line, nothing else.
  // (One byte less also helps the size tie-break, which favours the
  // smaller text.)
  writeFileSync(join(outDir, 'entry.txt'), JOKE, 'utf8');
}

main();
