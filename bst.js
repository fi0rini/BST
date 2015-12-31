var d3 = d3 || {};

function BST(data) {
  var type = 'BST';
  var root = data ? new BSTNode(data) : null;
  var size = data ? 1 : 0;
  var height = 0;

  this.size = function () {
    return size;
  };

  this.height = function () {
    return height;
  };

  this.root = function () {
    return root;
  };

  this.type = function () {
    return type;
  };
}

BST.prototype = (function () {
// super private scope

  // walk graph and callback node in pre-order
  function _preOrderWalk(node, level, callback) {
    callback(node, level);

    if ( node.isLeaf() ) {
      return 0;
    }

    else if ( node.left() && node.right() ) {
      return Math.max(
        _preOrderWalk (node.left(), level + 1, callback),
        _preOrderWalk (node.right(), level + 1, callback)
      ) + 1;
    }

    else if ( node.left() ) {
      return _preOrderWalk(node.left(), level + 1, callback) + 1;
    }

    return _preOrderWalk(node.right(), level + 1, callback) + 1;

  }

  // walk graph and callback node in-order
  function _inOrderWalk(node, level, callback) {
    if ( node.left() ) {
      _inOrderWalk (node.left(), level + 1, callback);
    }

    callback(node, level);

    if ( node.right() ) {
      _inOrderWalk(node.right(), level + 1, callback);
    }

  }

  // insert nodes into graph
  function _insert(node, data) {
    if (node.isLeaf() && node.data() >= data) {
      node.left( new BSTNode(data) );
    }

    else if (node.isLeaf() && node.data() < data) {
      node.right( new BSTNode(data) );
    }

    else if (node.data() >= data) {

      if (!node.left()) {
        node.left( new BSTNode(data) );
      }

      else {
        _insert(node.left(), data);
      }
    }

    else {
      if (!node.right()) {
        node.right( new BSTNode(data) );
      }

      else {
        _insert(node.right(), data);
      }
    }
  }

// actual prototype, reference to trigger helpers inside;
  return {
    insert: function (data) {
      _insert(this.root(), data);
    },

    inOrderWalk: function (callback) {
      return _inOrderWalk(this.root, 0, callback);
    },

    preOrderWalk: function (callback) {
      return _preOrderWalk(this.root, 0, callback);
    }
  };
}());

function BSTNode(data) {
  if (!data) throw new Error('missing data');

  var type = 'BSTNode';
  var left = null;
  var right = null;

  this.type = function () {
    return type;
  };

  this.data = function () {
    return data;
  };

  this.left = function (node) {
    if (node && node.type() === this.type()) {
      left = node;
      return left;
    }
    return left;
  };

  this.right = function (node) {
    if (node && node.type() === this.type()) {
      right = node;
      return node;
    }
    return right;
  };
}

BSTNode.prototype = {
  isLeaf: function () {
    return this.left() === null && this.right() === null;
  },

  toString: function () {
    return this.data();
  }
};

var bst = new BST(22);
bst.insert(12);
bst.insert(2);
bst.insert(8);
bst.insert(18);
bst.insert(24);
bst.insert(20);
bst.insert(30);
bst.insert(4);

bst.inOrderWalk(function (node, height) {});

var Canvas = (function () {
// super private stuff

  var width = document.body.offsetWidth;
  var height = document.body.offsetHeight;

  var radius = 24;

  var svg = d3.select('body').append('svg')
    .attr('width', width)
    .attr('height', height);

  // draw a single node
  function _drawNode(node, position) {
    var _height = position.height;
    var x = width/(2 * (_height + 1)) + (radius/2);
    var y = (_height + 1) * (radius/2);

    var group = svg.append('g')
    .attr('transform', 'translate(' + x + ',' + y + ')');

    group.append('circle')
      .attr('r', radius)
      .attr('stroke', 'black')
      .attr('fill', 'white');

    group.append('text').text(node.data);

  }

  function _drawSubTree(graph) {

  }

  return {

    DrawBSTGraph: function (graph) {
      _drawSubTree(graph.root, 0);
      _drawNode();
    }
  };

}());


Canvas.DrawBSTGraph(bst);
