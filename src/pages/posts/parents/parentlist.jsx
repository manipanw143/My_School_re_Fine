import { List, useTable, ShowButton } from "@refinedev/antd";
import { Table, Space, Button, Input } from "antd";
import { useState } from "react";
import { CreatePickupModal } from "./createpicupcard";
import "./statusicon.css";

export const ParentList = () => {
  const [visibleUser, setVisibleUser] = useState(false);
  const [currentParentId, setCurrentParentId] = useState(null);
  const [status, setStatus] = useState({});
  const { tableProps } = useTable({
    resource: "parents",
  });
  console.log(tableProps);
  return (
    <>
      <List>
        <Table {...tableProps} rowKey="id">
          <Table.Column dataIndex="id" title={"ID"} />
          <Table.Column dataIndex="name" title={"Name"} />
          <Table.Column dataIndex="mobile" title={"Parent Mobile"} />
          <Table.Column dataIndex="studentname" title={"Student Name"} />
          <Table.Column dataIndex="class" title={"Student Class"} />
          <Table.Column
            title="See Details"
            dataIndex="actions"
            render={(_, record) => (
              <Space>
                <ShowButton
                  hideText
                  size="large"
                  onClick={() => {
                    // setCurrentTemple(record);
                    // setShowAdminList(true);
                  }}
                />
              </Space>
            )}
          />
          <Table.Column
            title="Create Pickup Person"
            dataIndex="actions"
            render={(_, record) => (
              <Space>
                <Button
                  onClick={() => {
                    setCurrentParentId(record.id);
                    setVisibleUser(true);
                  }}
                >
                  Create Pickup Person
                </Button>
              </Space>
            )}
          />
          <Table.Column
            title="Status"
            render={(_, record) => (
              <Space>
                <div className={`icon-container ${status[record.id]}`}>
                  {status[record.id] === "pending" && (
                    <div className="pending-icon">
                      <div className="spinner"></div>
                      <p>Pending...</p>
                    </div>
                  )}
                  {status[record.id] === "approved" && (
                    <div className="approved-icon">
                      <div className="checkmark"></div>
                      <p>Approved!</p>
                    </div>
                  )}
                </div>
              </Space>
            )}
          />
          <Table.Column
          title="HYY"
              
          render={(_, record) => (
              <Space>
                <div className={`icon-container ${status[record.id]}`}>
                 <input type="text" value={status[record.id]}/>
                </div>
              </Space>
            )}
          />
          
        </Table>
      </List>
      {visibleUser && (
        <CreatePickupModal
          parentId={currentParentId}
          visibleUser={visibleUser}
          setVisibleUser={setVisibleUser}
          setStatus={setStatus}
          onClose={() => setVisibleUser(false)}
        />
      )}
    </>
  );
};
