import React, {useContext, useEffect} from "react";
import Context from "../../context/context";
import {Container, Row, Col, FormGroup, FormFeedback, Alert} from "reactstrap";
import {useForm} from "react-hook-form";
import {Button, Input , message} from "antd";
import { useRouter } from "next/router"
import * as A from "../../context/actions/registry.action";
import {Request} from "../../fetch/request";
import Link from "next/link";
import {EyeTwoTone, EyeInvisibleOutlined} from "@ant-design/icons";

export default function Login() {
    const {errors, handleSubmit, register, setError, reset, setValue} = useForm();
    const {loading, dispatch, error} = useContext(Context);
    const { push } = useRouter()
    console.log(errors);
    const handleChange = e => {
        setValue(e.target.name, e.target.value);
    };
    const submit = async data => {
        if (!data.email) return setError("email", {message: "email is required"});
        if (!data.password) return setError("password", {message: "password is required"});
        if(data.password.length <= 7) return setError("password" , { message : "password length must be greater than 7" })
        dispatch({type: A.LOGIN_START});
        await Request("POST", "/api/login", data)
            .then(res => {

                if(res.data.success){
                    message.success(res.data.message);
                    localStorage.setItem("bearer" , res.data.bearer);
                    dispatch({type: A.LOGIN_SUCCESS, payload: res.data.info});
                    push("/home/users");
                }else{
                    message.error(res.data.message);
                    dispatch({type: A.LOGIN_FAIL, payload: {message: res.data.message}});
                }
            })
            .catch((err) => {
                
                dispatch({type: A.LOGIN_FAIL, payload: {message: "Error While Sending"}});
            });
    };
    useEffect(() => {
        register("email");
        register("password");
    }, [register]);
    useEffect(() => {
        return () => {
            reset();
            dispatch({type: A.FORM_RESET});
        };
    }, []);
    return (
        <Container fluid className="h-100">
            <Col xs={12} md={9} sm={12} xl={6} className="d-flex flex-column p-2 p-md-5 h-100 align-items-center mx-auto justify-content-center">
                <FormGroup className="w-50 mx-auto d-flex justify-content-center mb-5">
                    <img src={"/assets/images/logo.png"} className="h-100 mx-auto w-75" />
                </FormGroup>
                <FormGroup>{error.active && <Alert color="danger">{error.message}</Alert>}</FormGroup>
                <form onSubmit={handleSubmit(submit)} className={"px-3 px-md-5 w-100 pb-2"}>
                    <FormGroup>
                        <Input style={{ height : '35px' }} id={"email"} name={"email"} className={"hov-purple"} onChange={handleChange} placeholder={"Email"} />
                        <FormFeedback className={"d-block"}>{errors.email?.message}</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Input.Password
                            style={{ height : '35px' }}
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            className={"hov-purple"}
                            id={"password"}
                            name={"password"}
                            onChange={handleChange}
                            placeholder={"Password"}
                        />
                        <FormFeedback className={"d-block"}>{errors.password?.message}</FormFeedback>
                    </FormGroup>

                    <FormGroup className={"mt-5"}>
                        <Button
                            style={{height: "40px"}}
                            className={"d-block w-100 btn-purple text-white font-weight-bold"} htmlType={"submit"} loading={loading}>
                            Login
                        </Button>
                    </FormGroup>
                    <FormGroup className={"d-flex mt-5 align-items-center w-100 link-gray"}>
                        <Link href={"/registry/forgot-password"}>
                            Forgot Password!
                        </Link>
                    </FormGroup>
                    <FormGroup className={"d-flex mt-1 align-items-right w-25 link-gray"}>
                        <Link href={"/"}>
                            sign up
                        </Link>
                    </FormGroup>
                    <FormGroup className={"d-flex mt-1 align-items-right w-25 link-gray"}>
                        <Link href={"/home/users"}>
                            users
                        </Link>
                    </FormGroup>
                </form>
            </Col>
        </Container>
    );
}
