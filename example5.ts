import "core-js/proposals/explicit-resource-management";
import * as fs from "fs";

class TempFile implements Disposable {
  #path: string;
  #handle: number;

  constructor(path: string) {
    this.#path = path;
    this.#handle = fs.openSync(path, "w+");
  }

  // other methods

  [Symbol.dispose]() {
    // Close the file and delete it.
    console.log(`Disposing TempFile`);
    fs.closeSync(this.#handle);
    fs.unlinkSync(this.#path);
  }
}

function someCondition() {
  return true;
}

export function doSomeWork() {
  using file = new TempFile(".some_temp_file");

  // use file...

  if (someCondition()) {
    // do some more work...
    return;
  }
}

(() => {
  doSomeWork();
})();
