import React, {useState} from 'react';
import {Modal, Button} from 'antd';

const BellmanFordLegend = props => {
  const [visible, setVisible] = useState(false);
  return (
    <span style={{textAlign: 'center'}}>
      <Button type="primary" onClick={e => setVisible(true)}>
        Legend
      </Button>
      <Modal
        title="Legend"
        visible={visible}
        onOk={e => setVisible(false)}
        onCancel={e => setVisible(false)}>
        <p>
          Source Node: <font color="black">Black</font>
        </p>
        <p>
          Destination Node: <font color="red">RED</font>
        </p>
        <p>
          Node u of edge (u,v): <font color="green">GREEN</font>
        </p>
        <p>
          Node v of edge (u,v): <font color="darkgoldenrod">YELLOW</font>
        </p>
      </Modal>
    </span>
  );
};

export default BellmanFordLegend;
