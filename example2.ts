import * as fs from "fs";

function someCondition() {
  return true;
}

export function doSomeWork() {
  const path = ".some_temp_file";
  const file = fs.openSync(path, "w+");

  // use file...
  if (someCondition()) {
    // do some more work...

    // Close the file and delete it.
    fs.closeSync(file);
    fs.unlinkSync(path);
    return;
  }

  // Close the file and delete it.
  fs.closeSync(file);
  fs.unlinkSync(path);
}
