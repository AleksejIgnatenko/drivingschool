import Layout, { Content, Footer, Header } from "antd/es/layout/layout";
import "./globals.css";
import { Menu } from "antd";
import Link from "next/link";

const items = [
  { key: "home", label: <Link href={"/"}>Home</Link> },
  { key: "signIn", label: <Link href={"/signIn"}>Sign In</Link> }
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Layout style={{ minHeight: "100vh" }}>
          <Header>
            <Menu
              theme="dark"
              mode="horizontal"
              items={items}
              style={{ flex: 1, justifyContent: "flex-end" }}
            />
          </Header>
          <Content style={{ padding: "0 0px" }}>
            {children}
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Driving School
          </Footer>
        </Layout>
      </body>
    </html>
  );
}