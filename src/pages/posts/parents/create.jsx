import React, { useState } from "react";
import { Create, useForm, useSelect } from "@refinedev/antd";

import { Form, Input, Select } from "antd";

import MDEditor from "@uiw/react-md-editor";

export const ParentCreate = () => {
  const { formProps, saveButtonProps } = useForm();

  const { selectProps: categorySelectProps } = useSelect({
    resource: "parents",
  });
  
  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mobile"
          name="mobile"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        
      </Form>
    </Create>
  );
};
