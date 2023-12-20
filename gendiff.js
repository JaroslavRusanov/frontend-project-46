#!/usr/bin/env node

import { program } from "commander";

const gendiff = (first, second, format) => null;

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .argument('<first>', 'path to file 1')
  .argument('<second>', 'path to file 2')
  .option('-f, --format <type>', 'output format');

program.parse();