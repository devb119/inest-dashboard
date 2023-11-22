import { Dropdown, Button, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const authInfo = useAuth();
  const { user, isLoggedIn, logout } = authInfo
    ? authInfo
    : { isLoggedIn: false, logout: () => {} };
  const handleMenuClick = (e) => {
    switch (e.key) {
      case "1":
        break;
      case "2":
        logout();
        break;
      default:
        break;
    }
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
        {isLoggedIn ? (
          <Dropdown menu={menuProps}>
            <Button className="border-0 flex items-center p-2">
              <Space>
                <img src="/user.png" alt="user" width={32} height={32}></img>
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        ) : (
          <Link
            to="/login"
            className="bg-[#0e64d2] text-white rounded-lg px-4 py-2"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
};
export default Header;
