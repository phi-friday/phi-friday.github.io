#!/usr/bin/env bun
// oxlint-disable no-console

import { readdir, rm } from "node:fs/promises";
import path from "node:path";

const PROJECT_ROOT = path.resolve(import.meta.dir, "..", "..");
const SHADCN_ADD = ["bunx", "shadcn-svelte@latest", "add"] as const;

const component_base = path.join(PROJECT_ROOT, "src/lib/components/ui");

async function listComponentNames(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  return entries
    .filter(entry => entry.isDirectory() && !entry.name.startsWith("."))
    .map(entry => entry.name)
    .sort();
}

async function removePath(targetPath: string): Promise<void> {
  await rm(targetPath, { recursive: true, force: true });
}

async function main(): Promise<void> {
  const component_names = await listComponentNames(component_base);

  if (component_names.length === 0) {
    console.error("No ui components found to update.");
    process.exit(0);
  }

  await removePath(path.join(PROJECT_ROOT, "src/lib/hooks"));

  await Promise.all(
    component_names.map(componentName => removePath(path.join(component_base, componentName)))
  );

  const commands = [...SHADCN_ADD, ...component_names, "--overwrite", "--yes"].join(" ");
  console.info(`Running command: ${commands}`);
  const proc = Bun.spawn([...SHADCN_ADD, ...component_names, "--overwrite", "--yes"], {
    cwd: PROJECT_ROOT,
    stdio: ["inherit", "inherit", "inherit"],
  });

  const exitCode = await proc.exited;

  if (exitCode !== 0) {
    process.exit(exitCode);
  }
}

if (import.meta.main) {
  await main();
}
