import React , { useState , useEffect } from "react";
import { Layout , Menu } from "antd";
import AppRoute from "../../../components/app.routes";
import dynamic from "next/dynamic";
import NLink from "next/link";
import {HomeOutlined, UserOutlined} from "@ant-design/icons"

const { Sider , Content ,Header } = Layout;
const Router = dynamic(()=> import("react-router-dom").then(res => res.BrowserRouter) , { ssr : false });
const Link = dynamic(()=> import("react-router-dom").then(res => res.Link) , { ssr : false });

export default function Profile (){
    const [collapsed , setCollapsed] = useState(false);
    const changeCollapsed = ()=> setCollapsed(!collapsed);
    return (
                    <Router>
        <Layout className="h-100 w-100">
                <Header className="bg-white border-bottom-purple px-2">
                    <div className="w-100 d-flex">
                    <Logo />
                    <Menu mode="horizontal" >
                        <Menu.Item icon={<HomeOutlined style={{ fontSize : "20px" }} />} className="text-purple px-2 header-item text-center" key="1">
                            <NLink href={"/home/users"}> Home </NLink> </Menu.Item>
                    </Menu>
                    </div>
                </Header>
                <Layout>
                    <Sider collapsible collapsed={collapsed} onCollapse={changeCollapsed}  width={"250px"} className="bg-white border-right-purple">
                        <Menu className="h-100 mt-3 sider-links" mode={"inline"} defaultSelectedKeys={['1']}>
                            <Menu.Item className="text-purple bg-white" icon={<UserOutlined style={{ fontSize : "20px" }} />} key={"1"}>
                                <Link to={"/home/profile"} > Information </Link>
                            </Menu.Item>
                            <Menu.Item className="bg-white text-purple" icon={<UserOutlined style={{ fontSize : "20px" }} />} key={"1"}>
                                <Link to={"/home/profile/change-info"} > Edit Profile </Link>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                <Content className="bg-white">
                        <AppRoute />
                </Content>
                </Layout>
        </Layout>
                    </Router>
    )
}

const Logo = ()=> (
    <div className="col-2 h-100 overflow-hidden bg-white logo">
        <img className="w-100 h-100" src={"/assets/images/logo.png"} alt={"logo"} />
    </div>
)