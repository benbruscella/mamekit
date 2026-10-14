import type { KnowledgeGraph, KGNode, KGEdge } from './types.ts';

export class Graph {
  private byId: Map<string, KGNode>;
  private readonly outgoing = new Map<string, KGEdge[]>();
  private readonly labels = new Map<string, KGNode[]>();
  constructor(g: KnowledgeGraph) {
    this.byId = new Map(g.nodes.map(n => [n.id, n]));
    for (const edge of g.edges) {
      const edges = this.outgoing.get(edge.from) ?? [];
      edges.push(edge);
      this.outgoing.set(edge.from, edges);
    }
    for (const node of g.nodes) {
      const nodes = this.labels.get(node.label) ?? [];
      nodes.push(node);
      this.labels.set(node.label, nodes);
    }
  }
  node(id: string): KGNode | undefined { return this.byId.get(id); }
  out(id: string, rel?: string) {
    return (this.outgoing.get(id) ?? [])
      .filter(e => !rel || e.rel === rel)
      .map(e => ({ edge: e, node: this.byId.get(e.to)! }))
      .filter(x => x.node);
  }
  byLabel(label: string): KGNode[] { return [...(this.labels.get(label) ?? [])]; }
}

