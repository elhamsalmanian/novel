import React, {useEffect, useContext} from "react";
import {Col, Container, FormGroup, FormFeedback, Alert} from "reactstrap";
import {Input, Button , message} from "antd";
import {useForm} from "react-hook-form";
import context from "../../context/context";
import {RECOVERY_START, RECOVERY_SUCCESS, RECOVERY_FAIL} from "../../context/actions/registry.action";
import {Request} from "../../fetch/request";

export default function PasswordReset() {
    const {dispatch, error, loading , user : { email }} = useContext(context);
    const {errors, handleSubmit, setValue, setError, register} = useForm();

    const submit = async data => {
        if (data.confirm_password !== data.password) {
            return setError("confirm_password", {message: "Password and Confirm password is not match"});
        }
        dispatch({type: RECOVERY_START});
        await Request("PUT", "/api/reset-password", {password : data.password , email : email || "elham.salmanian@gmail.com"}) // request to server ( backend )
            .then(res => {
                console.log(res);
                if(res.data.success){
                    message.success(res.data.message);
                dispatch({type: RECOVERY_SUCCESS});
                }else{
                    message.error(res.data.message);
                    dispatch({ type : RECOVERY_FAIL , payload : { message : res.data.message }})
                }
            })
            .catch(err => {
                dispatch({type: RECOVERY_FAIL, payload: {message: "error happened"}});
            });
    };

    const handleChange = e => {
        setValue(e.target.name, e.target.value);
    };
    useEffect(() => {
        register("password");
        register("confirm_password");
    }, [register]);
    return (
        <Container fluid className="h-100">
            <Col xs={12} md={9} sm={12} xl={6} className="d-flex h-100 p-2 p-md-5 flex-column align-items-center mx-auto justify-content-center">
                    <div className="w-50 mx-auto d-flex justify-content-center mb-5">
                        <img className="w-75 h-100" src={"/assets/images/logo.png"} alt="logo" />
                    </div>
                    <FormGroup className="my-3">{error.active && <Alert color="danger"> {error.message} </Alert>}</FormGroup>
                    <form onSubmit={handleSubmit(submit)} className={"px-3 px-md-5 w-100 pb-2"}>
                        <FormGroup>
                            <Input.Password style={{ height : '35px' }} className="py-2 hov-purple" name="password" placeholder="New Password" onChange={handleChange} />
                            <FormFeedback className="d-block"> {errors?.password?.message} </FormFeedback>
                        </FormGroup>
                        <FormGroup className={"mt-3"}>
                            <Input.Password style={{ height : '35px' }} className="py-2 hov-purple" name="confirm_password" placeholder="Confirm Password" onChange={handleChange} />
                            <FormFeedback className="d-block"> {errors?.confirm_password?.message} </FormFeedback>
                        </FormGroup>
                        <FormGroup className={"mt-5"}>
                            <Button loading={loading} style={{height: "40px"}} className="btn-purple hov-purple btn-block text-white" htmlType="submit">
                                Confirm
                            </Button>
                        </FormGroup>
                    </form>
            </Col>
        </Container>
    );
}
