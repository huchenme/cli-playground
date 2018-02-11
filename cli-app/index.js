#!/usr/bin/env node

"use strict";

const program = require("commander");
const { exec } = require("child_process");
const chalk = require("chalk");
const pkg = require("./package.json");

let list = (directory, options) => {
  const cmd = "ls";
  let params = [];

  if (options.all) params.push("a");
  if (options.long) params.push("l");
  let fullCommand = params.length ? `${cmd} -${params.join("")}` : cmd;
  if (directory) fullCommand += " " + directory;

  exec(fullCommand, (error, stdout, stderr) => {
    if (error) console.log(chalk.red.bold.underline("exec error: ") + error);
    if (stdout) console.log(chalk.green.bold.underline("Result: ") + stdout);
    if (stderr) console.log(chalk.red("Error: ") + stderr);
  });
};

program
  .version(pkg.version)
  .command("list [directory]")
  .description("List files and folders")
  .option("-a, --all", "List all files and folders")
  .option("-l, --long", "Long list format")
  .action(list);

program.parse(process.argv);

if (program.args.length === 0) {
  program.help();
}
