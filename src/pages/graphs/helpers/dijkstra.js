const dijkstra = async (
  nodes,
  startEndNodePair,
  setShortestPath,
  setCurrentNode,
  setNeighborNode,
  readOnlyState,
  helperDelay,
) => {
  const helperSort = () => {
    // 'PRIORITY QUEUE'
    nodesQueue.sort((nodeA, nodeB) => {
      if (nodeA.costToReach > nodeB.costToReach) {
        return 1;
      } else {
        return -1;
      }
    });
  };

  // Make copy of all nodes, set source node cost as 0, rest of node
  // by default has cost of infinity
  const nodesMap = [];
  const nodesQueue = [];
  const isVisited = [];
  for (let i = 0; i < nodes.length; i++) {
    const newNode = Object.assign({}, nodes[i]);
    if (startEndNodePair[0] === nodes[i]) {
      newNode.costToReach = 0; // other nodes are set to costToReach = MAXSAFEINTEGER by default
    }
    nodesQueue.push(newNode);
    nodesMap.push(newNode);
  }

  const dest = startEndNodePair[1];
  while (nodesQueue.length > 0) {
    helperSort();
    const nextNode = nodesQueue.shift();
    await helperDelay(500);
    if (nextNode.id === dest.id) {
      // construct shortest path
      let pair;
      const path = [];
      let currentNode = nextNode;
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
      setCurrentNode(null);
      setNeighborNode(null);
      break;
    } else {
      isVisited.push(nextNode.id);
    }

    //mark nextNode as current node (styling purposes)
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].id === nextNode.id) {
        setCurrentNode(nodes[i]);
        setNeighborNode(null);
        break;
      }
    }

    // get neighbors from Redux store
    const nextNodeNeighbors = readOnlyState[nextNode.id];
    for (let i = 0; i < nextNodeNeighbors.length; i++) {
      await helperDelay(500);
      let curr;
      const neighborId = nextNodeNeighbors[i].other;

      // mark neighborNode
      for (let j = 0; j < nodes.length; j++) {
        if (nodes[j].id === neighborId) {
          setNeighborNode(nodes[j]);
          break;
        }
      }

      // find the actual Node object in nodesMap
      for (let j = 0; j < nodesMap.length; j++) {
        if (nodesMap[j].id === neighborId) {
          curr = nodesMap[j];
          break;
        }
      }

      //relaxx
      if (isVisited.includes(curr.id)) {
        continue;
      } else {
        const tempCostToReach =
          nextNodeNeighbors[i].weight + nextNode.costToReach;
        if (tempCostToReach < curr.costToReach) {
          curr.costToReach = tempCostToReach;
          curr.parent = nextNode;
        }
      }
    }
  }
};

export default dijkstra;
