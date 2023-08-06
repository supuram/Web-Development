function merge(a, b){
    if (a && b) {
      for (var key in b) {
        console.log(a,b,key)
        a[key] = b[key];
        console.log(a,b)
      }
    }
    return a;
}
var a = { foo: 'bar' }
        , b = { bar: 'baz' };
(merge(a,b))