import React, {useState} from 'react';
import {Modal, Button} from 'antd';

const BellmanFordDescription = props => {
  const [visible, setVisible] = useState(false);
  return (
    <span style={{margin: '0 1em'}}>
      <Button type="primary" onClick={e => setVisible(true)}>
        Bellman-Ford Algorithm Description
      </Button>
      <Modal
        title="Bellman-Ford Description"
        visible={visible}
        onOk={e => setVisible(false)}
        onCancel={e => setVisible(false)}>
        <p>
          Bellman-Ford is a shortest path algorithm that works on directed
          graphs with negative edge weights without any negative weight cycles
        </p>
        <p>
          It does |V|-1 iterations of |E| relaxations, since at the ith
          iteration the node at the ith hop will have converged on its delta
          value.
        </p>
        <p>
          If after |V|-1 iterations, there exists an edge that can be relaxed,
          it indicates the presence of negative weight cycles.
        </p>
        <pre>PseudoCode</pre>
        <pre>BellmanFord(G, s): </pre>
        <pre>{'  '}init()</pre>
        <i>
          // set all node's delta value to be infinite and source node's delta
          value as 0
        </i>
        <pre>{'  '}for i in 1 ... |V|-1:</pre>
        <pre>{'    '}for j in 1 ... |E|:</pre>
        <pre>{'      '}relax(E[j])</pre>
        <i>
          // relaxes delta value of u if delta(v) + w(v,u) is less than
          delta(u), then set u's parent as v
        </i>
      </Modal>
    </span>
  );
};

export default BellmanFordDescription;
