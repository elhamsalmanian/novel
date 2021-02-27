import React from "react";
import {Container, Row, Col, FormGroup, InputGroup, InputGroupAddon, InputGroupText , Button} from "reactstrap";
import { Avatar } from "antd";
import { useHistory } from "react-router-dom";
const information = [
    { name : "First name" , value : "john" } ,
    { name : "Last name" , value : "didi kardo" },
    { name : "Email" , value : "didi@gmail.com" } ,
    { name : "Phone number" , value : "1234568765" },
    { name : "Clinic name" , value : "eureaka" },
    { name : "Clinic number" , value : "32467432" },
    { name : "Clinic address" , value : "USA , California , LA , Street 256" },
];
const pushtoEditPage= ()=> push("/home/profile/change-info")

export default function Information (){
    const { push } = useHistory();
    return (
        <Container className="w-100 h-100">
            <Row className="w-100 h-100">
                <Col className="mx-auto d-flex align-items-center justify-content-center py-3">

                    <div className="bg-white shadow mr-5 mb-5 rounded-circle text-center">
                       <Avatar size={100} src={"/assets/images/avatar.svg"} />
                    </div>

                    <div className="d-flex flex-column ml-5 align-items-start justify-content-center">
                    {
                        information.map(item => (
                            <FormGroup className="m-2">
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText className="text-black rounded text-white"> { item.name } </InputGroupText>
                                    </InputGroupAddon>
                                    <p className="mb-0 text-center ml-5 d-flex align-items-center">
                                        { item.value }
                                    </p>
                                </InputGroup>
                        </FormGroup>
                        ))
                    }
                    <div className="mt-3 w-100">
                        <Button onClick={pushtoEditPage} block className="bg-purple text-white rounded">
                            Edit
                        </Button>
                    </div>
                            </div>
                </Col>
            </Row>
        </Container>
    )
}