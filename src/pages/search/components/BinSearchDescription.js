import React, {useState} from 'react';
import {Modal, Button} from 'antd';

const BinSearchDescription = props => {
  const [visible, setVisible] = useState(false);
  return (
    <div style={{textAlign: 'center'}}>
      <Button type="primary" onClick={e => setVisible(true)}>
        Binary Search Description
      </Button>
      <Modal
        title="Binary Search Description"
        visible={visible}
        onOk={e => setVisible(false)}
        onCancel={e => setVisible(false)}>
        <p>
          Binary search is a very useful searching algorithm on special types of
          arrays
        </p>
        <p>
          Either the array has to be monotonically sorted, or a function that is
          monotonically increasing / decreasing when used on the array
        </p>
        <pre>PseudoCode</pre>
        <pre>BinSearch(arr, low, high, func)</pre>
        <pre> if (low > high) return</pre>
        <pre> if (low == high) return arr[low]</pre>
        <pre> mid = low + (high - low) / 2</pre>
        <pre> if (func(arr[mid])) recurse (left OR right)</pre>
        <pre> else recurse (right OR left)</pre>
        <p>
          <i>If recurse left, set low = low and high = mid</i>
        </p>
        <p>
          <i>If recurse right, set low = mid and high = high</i>
        </p>
      </Modal>
    </div>
  );
};

export default BinSearchDescription;
