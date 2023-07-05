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

export function doSomeWork() {
  const file = new TempFile(".some_temp_file");

  try {
    // ...
  } finally {
    file[Symbol.dispose]();
  }
}

(() => {
  doSomeWork();
})();
