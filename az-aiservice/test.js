function foo(){
  const x = 1;
  function bar() {
    console.log(x, "클로저임");
  }
  return bar;
}
const bar = foo();
bar();


function fooo(){
  const x = 1;
  function barr() {
    console.log(x, "클로저 아님");
  }
  barr();
}
fooo();



function outerFunction(outerVariable) {
  return function innerFunction(innerVariable) {
    console.log(`Outer variable: ${outerVariable}`);
    console.log(`Inner variable: ${innerVariable}`);
  };
}

const newFunction = outerFunction('outside');
newFunction('inside');
