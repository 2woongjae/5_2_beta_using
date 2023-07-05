import "core-js/proposals/explicit-resource-management";

class ErrorA extends Error {
  name = "ErrorA";
}
class ErrorB extends Error {
  name = "ErrorB";
}

function throwy(id: string) {
  return {
    [Symbol.dispose]() {
      throw new ErrorA(`Error from ${id}`);
    },
  };
}

export function func() {
  using a = throwy("a");
  throw new ErrorB("oops!");
}

(() => {
  try {
    func();
  } catch (e: any) {
    console.log(e.name); // SuppressedError
    console.log(e.message); // An error was suppressed during disposal.

    console.log(e.error.name); // ErrorA
    console.log(e.error.message); // Error from a

    console.log(e.suppressed.name); // ErrorB
    console.log(e.suppressed.message); // oops!
  }
})();
