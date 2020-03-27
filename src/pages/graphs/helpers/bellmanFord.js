import Edge from '../classes/Edge';

const bellmanFord = async (
  nodes,
  startEndNodePair,
  setShortestPath,
  setCurrentNode,
  setNeighborNode,
  readOnlyState,
  helperDelay,
) => {
  console.log('bellmanford-ing...');
  // Make copy of all nodes, set source node cost as 0, rest of node
  // by default has cost of infinity
  const nodesMap = [];
  for (let i = 0; i < nodes.length; i++) {
    const newNode = Object.assign({}, nodes[i]);

    if (startEndNodePair[0] === nodes[i]) {
      newNode.costToReach = 0;
    }
    nodesMap.push(newNode);
  }

  const edgesMap = [];
  for (let i = 0; i < nodesMap.length; i++) {
    const neighborsArr = readOnlyState[nodesMap[i].id];
    for (let j = 0; j < neighborsArr.length; j++) {
      const neighborId = neighborsArr[j].other;
      const neighborNode = nodesMap.find(node => node.id === neighborId);
      const wt = neighborsArr[j].weight;
      const edge = new Edge(nodesMap[i], neighborNode, wt);
      edgesMap.push(edge);
    }
  }

  const dest = startEndNodePair[1];
  // do |V| - 1 steps of |E| relaxations
  for (let i = 0; i < nodesMap.length - 1; i++) {
    for (let j = 0; j < edgesMap.length; j++) {
      // relax edge[j]
      await helperDelay(500);
      const edge = edgesMap[j];
      const u = edge.nodeA;
      const v = edge.nodeB;
      // mark u and v
      setCurrentNode(nodes.find(node => node.id === u.id));
      setNeighborNode(nodes.find(node => node.id === v.id));
      const wt = edge.weight;
      const d = u.costToReach + wt;
      if (d < v.costToReach) {
        v.costToReach = d;
        v.parent = u;
      }
    }
  }

  setCurrentNode(null);
  setNeighborNode(null);
  // construct shortest path
  let pair;
  const path = [];
  let currentNode = nodesMap.find(node => node.id === dest.id);
  while (true) {
    if (currentNode.parent === null) {
      //means source node already
      break;
    }
    let parentNode = currentNode.parent;
    pair = [parentNode, currentNode];
    path.push(pair);
    currentNode = parentNode;
  }

  setShortestPath(path);

  console.log(
    `cost from src to dst: ${
      nodesMap.find(node => node.id === dest.id).costToReach
    }`,
  );
  console.log('finish bellmanford');
};

export default bellmanFord;
