import { Col, Menu, Row } from "antd";
import { Link, NavLink, useLocation } from "react-router-dom";

import { route } from "../Routes";

function AppBar() {
  const location = useLocation();
  const { pathname } = location;
  const items = [
    {
      name: "Movies",
      link: route.moviesList(),
    },
  ];
  return (
    <>
      <Row>
        <Col>
          <span style={{ padding: "0 1rem", fontSize: "1.25rem" }}>
            <Link to={"/"} style={{ color: "#000" }}>
              Netflix-like app
            </Link>
          </span>
        </Col>
        <Col>
          <Menu theme="light" mode="horizontal" selectedKeys={[pathname]}>
            {items.map((item) => {
              return (
                <Menu.Item key={item.link}>
                  <NavLink to={item.link}>{item.name}</NavLink>
                </Menu.Item>
              );
            })}
          </Menu>
        </Col>
      </Row>
    </>
  );
}

export default AppBar;
