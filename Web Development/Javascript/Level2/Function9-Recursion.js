// Recursion itself uses a stack: the function stack. The stack-like behavior can be seen in the following example

function foo(i) {
    if (i < 0) {
      return;
    }
    console.log(`begin: ${i}`);
    foo(i - 1);
    console.log(`end: ${i}`);
}
foo(3);