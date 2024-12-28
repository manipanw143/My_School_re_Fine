import { useMany } from "@refinedev/core";

import {
  List,
  TextField,
  useTable,
  EditButton,
  ShowButton,
} from "@refinedev/antd";

import { Table, Space } from "antd";

export const PuneList = () => {
  const { tableProps } = useTable({
    resource:"peons"
  });
  console.log(tableProps);
  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column
          dataIndex="name"
          title="Name"
          render={(value) => <TextField value={value} />}
        />
        <Table.Column
          dataIndex="status"
          title="Available"
          render={(value) => <TextField value={value} />}
        />
      </Table>
    </List>
  );
};
