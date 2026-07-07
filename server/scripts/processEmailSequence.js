#!/usr/bin/env node
import { runDueEmailSequence } from "../lib/emailSequence.js";

try {
  const result = await runDueEmailSequence();
  console.log(`Processed scheduled emails. Checked ${result.checked} lead(s), sent ${result.sent}.`);
  process.exit(0);
} catch (error) {
  console.error("Failed to process scheduled emails:", error.message);
  process.exit(1);
}
