import React, { useState } from 'react';
import { Modal, Form, Input, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

function UploadModal({ visible, onCancel, onUpload }) {
  const [fileList, setFileList] = useState([]);

  const props = {
    beforeUpload: file => {
      setFileList([file]);
      return false; // Ngăn không cho upload tự động
    },
    onRemove: () => {
      setFileList([]);
    },
    fileList,
  };

  const handleOk = () => {
    if (fileList.length === 0) {
      message.error('Please select a file to upload');
      return;
    }
    // Gọi hàm onUpload với dữ liệu form
    form.submit();
  };

  const [form] = Form.useForm();

  const onFinish = values => {
    const { caption } = values;
    const file = fileList[0];
    onUpload({ caption, file });
    setFileList([]);
    form.resetFields();
  };

  return (
    <Modal
      title="Upload Post"
      visible={visible}
      onCancel={onCancel}
      onOk={handleOk}
      okText="Upload"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Select Image/Video"
          required
        >
          <Upload {...props} listType="picture">
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          label="Caption"
          name="caption"
          rules={[{ required: true, message: 'Please enter a caption!' }]}
        >
          <Input.TextArea rows={4} placeholder="Write a caption..." />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default UploadModal;
