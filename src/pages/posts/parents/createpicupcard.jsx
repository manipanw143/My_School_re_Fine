import { useCreate, useNotification, useSelect } from "@refinedev/core";
import { getValueProps } from "@refinedev/strapi-v4";
import { Button, Form, Input, Upload, Modal, Select } from "antd";
import React from "react";

const API_URL = import.meta.env.VITE_APP_UPLOAD_ENDPOINT;

export const CreatePickupModal = ({ parentId, visibleUser, setVisibleUser, setStatus }) => {
  const { open } = useNotification();
  const [form] = Form.useForm();
  const { mutate: createPickUpPerson } = useCreate();

  const handleCancel = () => {
    setVisibleUser(false);
    form.resetFields();
  };
 
  const {selectProps : peonsProps} = useSelect({
    resource:"peons",
    optionLabel: "name",
    optionValue: "id",
  });
  
  const handleRequest = () => {
    setStatus((prevStatus) => ({ ...prevStatus, [parentId]: 'pending' }));
  };
  
  const handleFormSubmit = (values) => {
    createPickUpPerson({
      resource: 'pickuppeople',
      values: {
        name: values.name,
        mobile: values.mobile,
        parent: parentId,
      },
    });
  };

  return (
    <>
      <Modal
        title="Create Pickup Person"
        open={visibleUser}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          onFinish={handleFormSubmit}
          colon={false}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
        >
          <div
            style={{
              marginBottom: "0.8rem",
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Form.Item
              name="photo"
              valuePropName="fileList"
              getValueProps={(data) => getValueProps(data, API_URL)}
              noStyle
              style={{ position: "absolute", right: 0, width: "50%" }}
            >
              <Upload.Dragger
                name="files"
                listType="picture-card"
                action={API_URL + `/api/upload`}
                itemRender={(originNode, file) => <div>{originNode}</div>}
                headers={{
                  Authorization: `Bearer ${localStorage.getItem(
                    "strapi-jwt-token"
                  )}`,
                }}
                accept="*"
              >
                <p className="ant-upload-text">Upload Photo</p>
              </Upload.Dragger>
            </Form.Item>
          </div>
         
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                type: "name",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mobile Number"
            name="mobile"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input maxLength={30} />
          </Form.Item>

          <Form.Item
            label="Available Peon"
            name="peons"
          >
          <Select {...peonsProps} mode="multiple" style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              onClick={handleRequest}
            >
              Submit
            </Button>
          </Form.Item>
          
        </Form>
      </Modal>
    </>
  );
};
