import React, {useState} from 'react';
import {Modal, Button} from 'antd';

const DijkstraDescription = props => {
  const [visible, setVisible] = useState(false);
  return (
    <div style={{textAlign: 'center'}}>
      <Button type="primary" onClick={e => setVisible(true)}>
        Dijkstra Algorithm Description
      </Button>
      <Modal
        title="Dijkstra Description"
        visible={visible}
        onOk={e => setVisible(false)}
        onCancel={e => setVisible(false)}>
        <p>
          Dijkstra is a shortest path algorithm that works on graphs with
          non-negative edge weights
        </p>
        <p>
          The basic idea is that it uses a priorityQueue to keep track of edge
          weights. At each iteration, extract-min is performed on the
          priorityQueue.
        </p>
        <p>
          The invariant here is that the edge that was just extracted from the
          priorityQueue has the shortest path from the source vertex
        </p>
        <pre>PseudoCode</pre>
        <pre>Dijkstra(G, s): </pre>
        <pre>{'  '}init()</pre>
        <i>
          // set all node's delta value to be infinite and source node's delta
          value as 0
        </i>
        <pre>{'  '}PQ.add(s)</pre>
        <pre>{'  '}while (!PQ.isEmpty()):</pre>
        <pre>{'    '}v = PQ.extractMin()</pre>
        <pre>{'    '}for u in v.neighbors:</pre>
        <pre>{'      '}relax(u, v)</pre>
        <i>
          // relaxes delta value of u if delta(v) + w(v,u) is less than
          delta(u), then add u to PQ
        </i>
      </Modal>
    </div>
  );
};

export default DijkstraDescription;
