import "core-js/proposals/explicit-resource-management";
import * as fs from "fs";

function someCondition() {
  return true;
}

export function doSomeWork() {
  const path = ".some_temp_file";
  const file = fs.openSync(path, "w+");

  using cleanup = new DisposableStack();
  cleanup.defer(() => {
    console.log(`Disposing doSomeWork`);
    fs.closeSync(file);
    fs.unlinkSync(path);
  });

  // use file...

  if (someCondition()) {
    // do some more work...
    return;
  }

  // ...
}

(() => {
  doSomeWork();
})();
