class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  addVertices(vertexArray) {
    for (const vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }

  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  removeVertex(vertex) {
    this.nodes.delete(vertex);
    for (const v of this.nodes) {
      v.adjacent.delete(vertex);
    }
  }

  depthFirstSearch(start) {
    const visited = new Set();
    const result = [];

    function dfs(vertex) {
      if (!vertex) return;
      visited.add(vertex);
      result.push(vertex.value);

      for (const neighbor of vertex.adjacent) {
        if (!visited.has(neighbor)) {
          dfs(neighbor);
        }
      }
    }

    dfs(start);
    return result;
  }

  breadthFirstSearch(start) {
    const visited = new Set();
    const result = [];
    const queue = [start];
    visited.add(start);

    while (queue.length) {
      const current = queue.shift();
      result.push(current.value);

      for (const neighbor of current.adjacent) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    return result;
  }
}

module.exports = { Graph, Node };