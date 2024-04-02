import { Command } from "@codemonument/cliffy/command";
import { Confirm } from "@codemonument/cliffy/prompt"
import * as path from "@std/path";
import {copy} from "@std/fs";

await new Command()
  .description(
    `
    A command line utility for managing your project default files.
  `
  )
  .version("1.0.0")
  .name("dph")
  .action(async function() {
    console.log(import.meta.dirname);
    if (!await exists(path.normalize(Deno.cwd() + '/deno.json'))) {
      console.log("Project does not exists");
    }
    const result = await Confirm.prompt("Do you want to sync default files");

    if (result) {
      console.log("Replacing default files");
      await copy(path.normalize(import.meta.dirname+'/project-commons/.editorconfig'), Deno.cwd(), {overwrite: true});
    }
  })
  .parse(Deno.args)


/*
 * Check if file or directory existing in given path.
 */
export async function exists(filePath: string): Promise<boolean> {
  try {
    await Deno.stat(filePath);
    // successful, file or directory must exist
    return true;
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      // file or directory does not exist
      return false;
    } else {
      // unexpected error, maybe permissions, pass it along
      throw error;
    }
  }
}