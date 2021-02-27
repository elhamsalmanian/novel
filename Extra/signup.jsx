
/*
import React, {useContext, useEffect} from "react";
import {Container, Row, Col, Form, FormGroup, FormFeedback, Alert} from "reactstrap";
import {Button, Input} from "antd";
import Context from "../context/context";
import {useForm} from "react-hook-form";
import {Request} from "../fetch/request";
import * as A from "../context/";
import {Link} from "react-router-dom";
import {EyeTwoTone, EyeInvisibleOutlined} from "@ant-design/icons";
import logo from "../../assets/images/logo.png"


export default function Signup() {
  const {errors, register, handleSubmit, setError, reset, setValue} = useForm();
  const {loading, error, dispatch} = useContext(Context);
console.log(errors)
  const handleChange = e => {
    setValue(e.target.name, e.target.value);
  };
  const submit = data => {
    if (!data.username) {
      return setError("username", {message: "username is required"});

    }
    if (!data.email) return setError("email", { message : "email is required" });
    if (data?.password !== data?.repeat_password) {
      setError("password", {message: ""});
      setError("repeat_password", {message: "The Password and Confirmation Password is not match!"});
      return false
    } else if (data?.password?.length < 8) {
      setError("password", {message: "Password length is less than eight"});
      return false
    } else {
      console.log(data);
      dispatch({type: A.SIGN_UP_START});
      Request("POST", "/signup", data)
        .then(res => {
          console.log(data);
          dispatch({type: A.SIGN_UP_SUCCESS, payload: res.data});
        })
        .catch(err => {
          console.log(err);
          dispatch({type: A.SIGN_UP_FAIL, payload: {message: err.message}});
        });
    }
  };
  useEffect(()=>{
    register("username");
    register("email");
    register("password");
    register("repeat_password");
    },[register])
  useEffect(() => {
    return () => {
      reset();
      dispatch({type: A.FORM_RESET});
    };
  }, []);
  return (
    <Container fluid>
      <Row className={"flex align-items-center pt-5"}>
        <Col sm={12} md={6} xl={5} className={"m-auto py-5 shadow px-5 rounded-10"}>
          <FormGroup className={"w-50 mx-auto"}>
            <img src={logo} className="w-100 h-100 w-100" />
          </FormGroup>
          <FormGroup>{error.active && <Alert color="danger">{error.message}</Alert>}</FormGroup>
          <form onSubmit={handleSubmit(submit)}>
          <FormGroup>
              <Input onChange={handleChange} name={"clinicname"} placeholder={"Clinic Name"} className={"hov-purple"} />
              <FormFeedback className={"d-block"}> {errors.clinicname?.message} </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Input onChange={handleChange} name={"email"} placeholder={"Email"} className={"hov-purple"} />
              <FormFeedback className={"d-block"}> {errors.email?.message} </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Input onChange={handleChange} name={"username"} placeholder={"Username"} className={"hov-purple"} />
              <FormFeedback className={"d-block"}> {errors.username?.message} </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Input.Password
                onChange={handleChange}
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                name={"password"}
                type={"password"}
                placeholder={"Password"}
                className={"hov-purple"}
              />
              <FormFeedback className={"d-block"}> {errors.password?.message} </FormFeedback>
            </FormGroup>
            <FormGroup>
              <Input.Password
                onChange={handleChange}
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                name={"repeat_password"}
                type={"password"}
                placeholder={"Confirm Password"}
                className={"hov-purple"}
              />
              <FormFeedback className={"d-block"}> {errors.repeat_password?.message} </FormFeedback>
            </FormGroup>
            <FormGroup className={"d-flex align-items-center w-100"}>
              <Link to={"/login"} className={"txt-gray"}>Already Have an Account!</Link>
            </FormGroup>
            <FormGroup>
              <Button htmlType={"submit"} loading={loading} className={"btn-block btn-purple text-white"}>
                Sign Up
              </Button>
            </FormGroup>
          </form>
        </Col>
      </Row>
    </Container>
  );
}*/
