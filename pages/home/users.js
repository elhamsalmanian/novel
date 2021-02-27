import React, {useState} from "react";
import {Container, Row, Col} from "reactstrap";
import { useRouter } from "next/router";
import {Table, Avatar, Input, Dropdown, Menu} from "antd";
import Link from "next/link";
import { DownloadOutlined } from "@ant-design/icons";

const months = [
    { name : "JAN" , isActive : true },
    { name : "FEB" , isActive : true },
    { name : "MAR" , isActive : true },
    { name : "APR" , isActive : false },
    { name : "MAY" , isActive : false },
    { name : "JUN" , isActive : false },
    { name : "JUL" , isActive : false },
    { name : "AUG" , isActive : false },
    { name : "SEP" , isActive : false },
    { name : "OCT" , isActive : false },
    { name : "NOV" , isActive : false },
    { name : "DEC" , isActive : false },
]

const MonthMenu = ()=>{
    return(
        <Menu className="shadow">
                   {
                    months.map((item , i) => (
                        <Menu.Item key={i}>
                            <div className={`d-flex shadow bg-white rounded-circle flex-column align-items-center 
                            ${item.isActive ? "text-white bg-purple" : "text-gray bg-white"}`}>
                                <span className={"m-1"}>{ item.name }</span>
                            </div>
                        </Menu.Item>
                    ))
                   }
        </Menu>
    )
}


export default function Users() {
const { push } = useRouter();
    const [ openDropdown , setDropdown ] = useState({ id : null , isOpen : false })
    const Menus = () => (
        <Menu className="shadow users-dropdown">
            <Menu.Item key={"1"} >
                <Link href="/home/profile"> Profile </Link>
            </Menu.Item>
            <Menu.Item key={"2"}>
                <Link href="/registry/change-password"> Change Password </Link>
            </Menu.Item>
            <Menu.Item key={"3"} onClick={logout}>
                LogOut
            </Menu.Item>
        </Menu>
    );
    const [data, setData] = useState([
        {
            key: 1,
            patient: "John Brown",
            start_date: "2020-10-3",
            pdf_report : { id : 1 , link : "https://sample.com" }
        },
        {
            key: 2,
            patient: "Pooriya Peyvand",
            start_date: "2020-10-3",
            pdf_report : { id : 2 , link : "https://sample.com" }
        },
        {
            key: 3,
            patient: "Elham kermany",
            start_date: "2020-10-3",
            pdf_report : { id : 3 , link : "https://sample.com" }
        },
        {
            key: 4,
            patient: "didi karado",
            start_date: "2020-10-3",
            pdf_report : { id : 4 , link : "https://sample.com" }
        },
    ]);

    const columns = [
        {
            title: "Patient",
            dataIndex: "patient",
            key: "patient",
            render: value => {
                return (
                    <div className=" w-100 d-flex justify-content-start">
                        <Avatar src={"https://i.stack.imgur.com/l60Hf.png"} size={35} />
                        <span className="ml-2"> {value} </span>
                    </div>
                );
            },
        },
        {title: "Start Date", dataIndex: "start_date", key: "start_date"},
        {title: ()=> (<span className="w-100 text-center"> PDF Report </span>) , dataIndex: "pdf_report", key: "pdf_report" ,
            render : value => {
                return (
                    (
                        <Dropdown onVisibleChange={flag => handleDropdown(value.id,flag)} visible={openDropdown.id === value.id && openDropdown.isOpen}
                                  placement={"topCenter"}
                                   overlay={MonthMenu}>
                            <div style={{ cursor : "pointer" }} className="w-100 mr-3 text-center">
                                <DownloadOutlined style={{ fontSize : "20px" }} />
                            </div>
                        </Dropdown>
                    )
                )
            }
        },
    ];

    const handleDropdown = (id , flag) => setDropdown({ id : id  , isOpen: flag });
    const handleSearch = e => {
        setData(prev => prev.filter(item => item.patient[0].trim().toLowerCase() === e.target.value.trim().toLowerCase()));
    };
    const [active, setActive] = useState(false);
    const handleChange = flag => setActive(flag);
    const logout = () => {
        localStorage.clear();
        push("/");
    };
    return (
        <Container className="w-100 h-100">
            <Row className="w-100 h-100">
                <Col className="w-100 h-100 py-3 mx-auto d-flex flex-column align-items-center" xs={12} md={9} lg={10}>
                    <div className="mb-5 mx-auto d-flex align-items-center justify-content-center w-50">
                        <img src="/assets/images/logo.png" alt={"logo"} className="w-50 h-100" />
                    </div>
                    <div className="p-3 shadow m-auto w-100">
                        <div className="my-3 w-100 d-flex justify-content-between">
                            <div>
                                <Input className="hov-purple" onChange={handleSearch} placeholder="Search" />
                            </div>
                            <div>
                                <Dropdown placement="bottomCenter" overlay={Menus} onVisibleChange={handleChange} visible={active}>
                                    <h5 className="shadow bg-purple p-2 text-white rounded-circle" style={{cursor: "pointer"}}>
                                        ES
                                    </h5>
                                    {/*    fill with first letter of user name and user last name  */}
                                </Dropdown>
                            </div>
                        </div>
                        <div>
                            <Table columns={columns} dataSource={data} />
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}
