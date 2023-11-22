import { Dropdown, Button, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
const Header = () => {
  const handleMenuClick = (e) => {
    // alert(e.key);
  };
  const items = [
    {
      label: "Profile",
      key: "1",
    },
    {
      label: "Logout",
      key: "2",
    },
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };
  return (
    <header className="border flex justify-between shadow-lg p-2">
      <div className="flex items-center justify-center gap-4 ml-4">
        <img src="/logo.png" alt="logo" width={64} height={64}></img>
        <h1 className="font-extrabold uppercase text-xl">Inest</h1>
      </div>
      <div className="flex items-center justify-center gap-4 mr-4">
        <Dropdown menu={menuProps}>
          <Button className="border-0 flex items-center p-2">
            <Space>
              <img src="/user.png" alt="user" width={32} height={32}></img>
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </div>
    </header>
  );
};
export default Header;
