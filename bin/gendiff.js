#!/usr/bin/env node

import { Command } from 'commander';
import getParseFile from '../src/index.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1');

program.command('first', 'second', 'option')
  .argument('<first>', 'path to file 1')
  .argument('<second>', 'path to file 2')
  .option('-f, --format <type>', 'output format')
  .action((first, second, option = 'JSON') => {
    const parsedFile1 = getParseFile(first);
    console.log(parsedFile1);
    const parsedFile2 = getParseFile(second);
    console.log(parsedFile2);
    console.log(option);
  });

program.parse();
