import React, {useState} from 'react';
import {Modal, Button} from 'antd';

const Legend = props => {
  const [visible, setVisible] = useState(false);
  return (
    <div style={{textAlign: 'center'}}>
      <Button type="primary" onClick={e => setVisible(true)}>
        Legend
      </Button>
      <Modal
        title="Legend"
        visible={visible}
        onOk={e => setVisible(false)}
        onCancel={e => setVisible(false)}>
        <p>
          Bars that are in the search range: <font color="blue">BLUE</font>
        </p>
        <p>
          Bars that are not in the search range: <font color="grey">GREY</font>
        </p>
        <p>
          Bar at current mid position: <font color="green">GREEN</font>
        </p>
      </Modal>
    </div>
  );
};

export default Legend;
