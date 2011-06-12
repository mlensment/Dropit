var Foo = function(){
  // if(!(this instanceof Foo)){
    // return new Foo(arguments);
  // }
  this.asd = 'asdfas';
  console.log(this.asd);
};

Foo.prototype.asd = '12345';



Foo.start = function(){
  return new Foo();
};
Foo.prototype.test = function(){
  alert('test');
};

$(document).ready(function(){
  Foo.start();
});