import PropTypes from "prop-types";

import { Layout } from "antd";
import AppBar from "./AppBar";
const { Header, Content } = Layout;

function PageLayout({ children }) {
  return (
    <Layout>
      <Header style={{ padding: 0, backgroundColor: "#fff" }}>
        <AppBar />
      </Header>
      <Content children={children} style={{ padding: "1rem 3rem" }} />
    </Layout>
  );
}

PageLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default PageLayout;
