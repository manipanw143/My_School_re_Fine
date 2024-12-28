import { useMany } from "@refinedev/core";

import {
  List,
  TextField,
  useTable,
  EditButton,
  ShowButton,
} from "@refinedev/antd";

import { Table, Space, Select } from "antd";
import { PuneList } from "./addpune/list";
import { table } from "@uiw/react-md-editor";

export const SecurityList = () => {
  const { tableProps } = useTable(
    {
        resource:"securities",
    }
  );
  console.log("SECURITY : ",tableProps)
  const categoryIds =
    tableProps?.dataSource?.map((item) => item.category.id) ?? [];
  const { data, isLoading } = useMany({
    resource: "categories",
    ids: categoryIds,
    queryOptions: {
      enabled: categoryIds.length > 0,
    },
  });

  return (
    <>
    <PuneList/>
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="name"
          title="ParentName"
          render={(value) => <TextField value={value} />}
        />
        <Table.Column
          dataIndex="name"
          title="StudentName"
          render={(value) => <TextField value={value} />}
        />
        <Table.Column
          dataIndex="name"
          title="PickupName"
          render={(value) => <TextField value={value} />}
        />
        {/* <Table.Column
          dataIndex="title"
          title="Title"
          render={(value) => <TextField value={value} />}
        /> */}
        {/* <Table.Column
          dataIndex={["category", "id"]}
          title="Category"
          render={(value) => {
            if (isLoading) {
              return <TextField value="Loading..." />;
            }

            return (
              <TextField
                value={data?.data.find((item) => item.id === value)?.title}
              />
            );
          }}
        /> */}
        <Table.Column
          dataIndex={"a"}
          title="Decision"
          render={(value) => {
            if (isLoading) {
              return <TextField value="Loading..." />;
            }

            return (
              <Select>
                <Option>Accept</Option>
                <Option>Reject</Option>
              </Select>
            );
            
          }}
          
        />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
    </>
  );
};
