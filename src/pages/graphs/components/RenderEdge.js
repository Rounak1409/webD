import React from 'react';
import Edge from '../classes/Edge';
import {modEdge} from '../../../redux/graphActions';
import {InputNumber} from 'antd';

const RenderEdge = props => {
  const [edge, edges, setEdges, dispatch] = props.value;

  return (
    <div>
      <h3>
        Edge: ({edge.nodeA.id}, {edge.nodeB.id}), Weight:{' '}
        <InputNumber
          min={1}
          max={Number.MAX_SAFE_INTEGER}
          defaultValue={edge.weight}
          onChange={e => {
            const newEdges = [];
            for (let i = 0; i < edges.length; i++) {
              const newEdge = new Edge(
                edges[i].nodeA,
                edges[i].nodeB,
                edges[i].weight,
              );
              if (
                newEdge.nodeA === edge.nodeA &&
                newEdge.nodeB === edge.nodeB
              ) {
                // modify this edge's weight
                newEdge.weight = e;
                dispatch(modEdge(newEdge));
              }
              newEdges.push(newEdge);
            }
            setEdges(newEdges);
          }}
        />
      </h3>
    </div>
  );
};

export default RenderEdge;
