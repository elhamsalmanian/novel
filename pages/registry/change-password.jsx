import React, {useContext, useEffect} from "react";
import {Alert, Col, Container, FormFeedback, FormGroup} from "reactstrap";
import {Button, Input, message} from "antd";
import {useForm} from "react-hook-form";
import context from "../../context/context";
import {Request} from "../../fetch/request";
import {RECOVERY_START, RECOVERY_FAIL, RECOVERY_SUCCESS} from "../../context/actions/registry.action";

export default function ChangePassword() {
  const {loading, error, dispatch} = useContext(context);
  const {setValue, setError, clearErrors, reset, errors, register, handleSubmit} = useForm();
  const submit = data => {
    if (data.new_password.length < 8) return setError("new_password", {message: "password should be longer than 8"});
    if (data.new_password !== data.confirm_new_password)
      return setError("confirm_new_password", {message: "new password and confirm new password is not match"});

    dispatch({type: RECOVERY_START});
    Request("POST", "/api/change-password", {...data, email: "mahan@gmail.com"})
      .then(res => {
        console.log(res);
        if (res.data.success) {
          dispatch({type: RECOVERY_SUCCESS});
          message.success("password changed");
        } else {
          dispatch({type: RECOVERY_FAIL, payload: {message: res.data.message}});
        }
      })
      .catch(err => {
        dispatch({type: RECOVERY_FAIL, payload: {message: "somthing is wrong"}});
        console.log(err);
      });
  };
  const handleChange = ({target: {name, value}}) => setValue(name, value);
  useEffect(() => {
    register("old_password");
    register("new_password");
    register("confirm_new_password");
  }, [register]);
  useEffect(() => {
    return () => {
      clearErrors();
      reset();
    };
  }, []);
  return (
    <Container fluid className="h-100">
      <Col xs={12} md={9} sm={12} xl={6} className="d-flex flex-column p-2 px-md-5 h-100 align-items-center mx-auto justify-content-center">
        <div className="w-50 mx-auto d-flex justify-content-center mb-5">
          <img className="w-75 h-100" src={"/assets/images/logo.png"} alt="logo" />
        </div>
        <FormGroup className="my-3">{error?.active && <Alert color="danger"> {error?.message} </Alert>}</FormGroup>
        <form onSubmit={handleSubmit(submit)} className={"px-3 px-md-5 w-100 pb-2"}>
          <FormGroup className="mb-3">
            <Input.Password
              style={{height: "35px"}}
              className="py-2 hov-purple"
              onChange={handleChange}
              placeholder="Old Password"
              name="old_password"
            />
            <FormFeedback className="d-block"> {errors?.old_password?.message} </FormFeedback>
          </FormGroup>
          <FormGroup className="mb-3">
            <Input.Password
              style={{height: "35px"}}
              className="py-2 hov-purple"
              onChange={handleChange}
              placeholder="New Password"
              name="new_password"
            />
            <FormFeedback className="d-block"> {errors?.new_password?.message} </FormFeedback>
          </FormGroup>
          <FormGroup className="mb-3">
            <Input.Password
              style={{height: "35px"}}
              className="py-2 hov-purple"
              onChange={handleChange}
              placeholder="Confirm New Password"
              name="confirm_new_password"
            />
            <FormFeedback className="d-block"> {errors?.confirm_new_password?.message} </FormFeedback>
          </FormGroup>
          <FormGroup className={"mt-5"}>
            <Button loading={loading} style={{height: "40px"}} htmlType="submit" className="btn-purple hov-purple btn-block text-white">
              Change
            </Button>
          </FormGroup>
        </form>
      </Col>
    </Container>
  );
}
