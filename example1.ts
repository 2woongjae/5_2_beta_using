import * as fs from "fs";

export function doSomeWork() {
  const path = ".some_temp_file";
  const file = fs.openSync(path, "w+");

  // use file...

  // Close the file and delete it.
  fs.closeSync(file);
  fs.unlinkSync(path);
}
