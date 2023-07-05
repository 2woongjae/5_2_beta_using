import "core-js/proposals/explicit-resource-management";

function loggy(id: string): Disposable {
  console.log(`Creating ${id}`);

  return {
    [Symbol.dispose]() {
      console.log(`Disposing ${id}`);
    },
  };
}

export function func() {
  using a = loggy("a");
  using b = loggy("b");
  {
    using c = loggy("c");
    using d = loggy("d");
  }
  using e = loggy("e");
  return;
  
  // Unreachable.
  // Never created, never disposed.
  using f = loggy("f");
}

(() => {
  func();
})();
// Creating a
// Creating b
// Creating c
// Creating d
// Disposing d
// Disposing c
// Creating e
// Disposing e
// Disposing b
// Disposing a
