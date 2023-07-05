import * as fs from "fs";

function someCondition() {
  return true;
}

export function doSomeWork() {
  const path = ".some_temp_file";
  const file = fs.openSync(path, "w+");

  try {
    // use file...

    if (someCondition()) {
      // do some more work...
      console.log("do some more work...");
      return;
    }
  } finally {
    // Close the file and delete it.
    console.log("Close the file and delete it.");
    fs.closeSync(file);
    fs.unlinkSync(path);
  }
}

(() => {
  doSomeWork();
})();
