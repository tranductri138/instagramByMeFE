import React, { useState } from 'react';
import { Form, Input, Button, Upload, Typography, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

function UploadPost() {
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate();

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

  const onFinish = values => {
    const { caption } = values;
    const file = fileList[0];
    if (!file) {
      message.error('Please select a file to upload');
      return;
    }

    // Gọi API để tải lên file và lưu thông tin bài viết
    // Ở đây chỉ là ví dụ đơn giản
    console.log('Uploading:', { caption, file });
    message.success('Post uploaded successfully!');
    navigate('/');
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', paddingTop: '50px' }}>
      <Title level={2}>Upload Post</Title>
      <Form
        name="upload"
        onFinish={onFinish}
        layout="vertical"
        style={{ marginTop: '20px' }}
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

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Upload
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default UploadPost;
