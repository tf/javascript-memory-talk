/*global jQuery, SyntaxHighlighter*/

jQuery(function($) {
  $.deck('.slide');
});

SyntaxHighlighter.defaults.toolbar = false;

SyntaxHighlighter.all();

// Demo

function Person() {}
function Address() {}
function Dog() {}
function Cat() {}
function Rabbit() {}

// GC Roots and Retaining Paths

function simpleExample() {
  window.person = new Person();
  window.person.address = new Address();
}

function simpleExampleRelease() {
  window.person = null;
}

// Closures and Retaining Paths

function closurePath() {
  window.obj = {};

  (function() {
    var person = new Person();

    window.obj.callback = function() {
      person.save();
    };
  }());
}

// Dom elements are GC Roots

function domRoot() {
  var link = document.getElementById('the_link'),
      dog = new Dog();

  link.addEventListener('click', function() {
    dog.bark();
  });
}

function domRootRelease() {
  var link = document.getElementById('the_link');
  link.parentNode.removeChild(link);
}


// Dom elements and circular references

function domRootCircular() {
  function Dog(element) {
    this._element = element;

    element.addEventListener('click', function() {
      this.bark();
    }.bind(this));
  }

  var dog = new Dog(document.getElementById('another_link'));
}

function domRootCircularRelease() {
  var link = document.getElementById('another_link');
  link.parentNode.removeChild(link);
}

// Closure subtleties

function closureSubtleties() {
  var dog = new Dog(),
      cat = new Cat(),
      rabbit = new Rabbit(),
      link = document.getElementById('yet_another_link');

  link.addEventListener('click', function() {
    dog.bark();
  });

  document.addEventListener('online', function() {
    cat.wakeUp();
  });
}

function closureSubtletiesRelease() {
  var link = document.getElementById('yet_another_link');
  link.parentNode.removeChild(link);
}

// jQuery

function jQueryWTF() {
  var dog = new Dog();

  jQuery('#demo_link').click(function() {
    dog.bark();
  });
}

function jQueryWTFRelease() {
  var link = document.getElementById('demo_link');
  link.parentNode.removeChild(link);
}

function jQueryWTFReleaseRight() {
  jQuery('#demo_link').remove();
}