import PropTypes from "prop-types";
import { Layout } from "antd";
import { AppBar } from ".";
import { Footer } from "antd/lib/layout/layout";
const { Header, Content } = Layout;

function PageLayout({ children }) {
  return (
    <Layout>
      <Header style={{ padding: 0, backgroundColor: "#fff" }}>
        <AppBar />
      </Header>
      <Content children={children} style={{ padding: "1rem 3rem" }} />
      <Footer style={{ textAlign: "center" }}>
        Created as a part of the CSCU9YQ - NoSQL Databases module assignment at
        the University of Stirling in spring semester 2022. Student number
        2944806.
        <br />
        This website uses data from Wikipedia, which is released under the{" "}
        <a
          href="https://creativecommons.org/licenses/by-sa/3.0/"
          target="_blank"
          rel="noreferrer"
        >
          Creative Commons Attribution-Share-Alike License 3.0
        </a>
        .
      </Footer>
    </Layout>
  );
}

PageLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default PageLayout;
