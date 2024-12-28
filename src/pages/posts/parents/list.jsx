import { UploadOutlined } from "@ant-design/icons";
import { useCreate } from "@refinedev/core";
import { Button, Form, Input, InputNumber, Modal, Upload } from "antd";
import React, { useState } from "react";
import { ParentList } from "./parentlist";
// import { DashboardTempleList } from "./templelist";
export const CreateParent = () => {
  const [allTemplesList, setAllTemplesList] = useState(true);

  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const { mutate: createAddress } = useCreate();
  const { mutate: createParent } = useCreate();
  
  const showModal = () => {
    setVisible(true);
  };
  
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        console.log("Inside CreateParent", values);
        createAddress(
          {
            resource: "parents",
            values: {
            //   addresstype: values.addresstype,
            //   district: values.district,
            //   housename: values.housename,
            //   landmark: values.landmark,
            //   latitude: values.latitude,
            //   longitude: values.longitude,
            //   pincode: values.pincode,
            //   state: values.state,
            //   tehsil: values.tehsil,
            //   village: values.village,
                 name : values.name,
                 mobile: values.mobile,
                 studentname:values.studentname,
                 class:values.class,
                //  pickuppeople:values.pickuppeople
            },
          },
        //   {
        //     onSuccess: (data, variables, context) => {
        //       console.log("l41", data);
        //       console.log("l42 id", data.data.id);
        //       values = {
        //         name: values.name,
        //         address: data?.data?.data?.id,
        //         // logo: values?.logo?.file?.response[0]?.id,
        //       };
        //       console.log("l47", data, values);
        //       createParent(
        //         { resource: "parents", values },
        //         {
        //           onError: (error) => {},
        //           onSuccess: (data) => {
        //             console.log(data);
        //             setAllTemplesList(true);
        //           },
        //         }
        //       );
        //     },
        //   }
        );
        console.log("l61");
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };


  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Create Parents
      </Button>

      <Modal
        title="Create Parents"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        forceRender
      >
        <Form form={form} layout="vertical" name="form_in_modal">
          <Form.Item
            name="name"
            label="Parents Name"
            rules={[
              {
                required: true,
                message: "Please input the name of the temple!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          
          <Form.Item
            name="mobile"
            label="Mobile"
            rules={[{ required: true, message: "Please input the village!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="studentname"
            label="Student Name"
            rules={[{ required: true, message: "Please input the village!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="class"
            label="class"
            rules={[{ required: true, message: "Please input the village!" }]}
          >
            <Input />
          </Form.Item>
      
        </Form>
      </Modal> 
      <ParentList></ParentList>
    </div>
  );
};

