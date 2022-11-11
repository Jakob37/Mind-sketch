interface Node {
  id: string;
  label: string;
}

interface NodePos {
  id: string;
  label: string;
  x: number;
  y: number;
}

interface Link {
  source: Node;
  target: Node;
}

interface LinkPos {
  source: NodePos;
  target: NodePos;
}

export { Node, NodePos, Link, LinkPos };
