interface NodeDatum {
  id: string;
  label: string;
}

interface NodePos {
  id: string;
  label: string;
  x: number;
  y: number;
  isActive: boolean;
}

interface LinkDatum {
  source: NodeDatum;
  target: NodeDatum;
}

interface LinkPos {
  source: NodePos;
  target: NodePos;
}

export { NodeDatum, NodePos, LinkDatum, LinkPos };
