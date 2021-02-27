import React, {useEffect, useContext} from "react";
import {Col, Container, FormFeedback, FormGroup, Alert} from "reactstrap";
import {Button, Input , message} from "antd";
import {useForm} from "react-hook-form";
import Link from "next/link";
import {VALID_EMAIL} from "../../global";
import {Request} from "../../fetch/request";
import context from "../../context/context";
import {RECOVERY_START, RECOVERY_SUCCESS, RECOVERY_FAIL} from "../../context/actions/registry.action";

export default function ForgotPassword() {
    const {dispatch, loading, error} = useContext(context);
    console.log(error);
    const {errors, register, handleSubmit, setValue, setError} = useForm();
    const submit = async (data = {email: ""}) => {
        if (!data.email.match(VALID_EMAIL)) {
            return setError("email", {message: "Email is not Valid !"});
        }
        dispatch({type: RECOVERY_START});
        await Request("POST", "/api/forgot-password", data) // request to server ( backend )
            .then(res => {
                if(res.data.success){

                console.log(res);
                message.success(res.data.message);
                dispatch({type: RECOVERY_SUCCESS});
                }else{
                    message.error(res.data.message);
                    dispatch({ type : RECOVERY_FAIL , payload : { message : res.data.message } })
                }
            })
            .catch(err => {
                console.log(err);
                dispatch({type: RECOVERY_FAIL, payload: {message: "Network Error"}});
            });
    };

    const handleChange = e => {
        setValue(e.target.name, e.target.value);
    };
    useEffect(() => {
        register("email");
    }, [register]);

    return (
        <Container fluid className="h-100">
            <Col xs={12} md={9} sm={12} xl={6} className="d-flex flex-column p-2 px-md-5 h-100 align-items-center mx-auto justify-content-center">
                    <div className="w-50 mx-auto d-flex justify-content-center mb-5">
                        <img className="w-75 h-100" src={"/assets/images/logo.png"} alt="logo" />
                    </div>
                    <FormGroup className="my-3">{error.active && <Alert color="danger"> {error.message} </Alert>}</FormGroup>
                    <form onSubmit={handleSubmit(submit)} className={"px-3 px-md-5 w-100 pb-2"}>
                        <FormGroup className="mb-3">
                            <Input style={{ height : '35px' }} className="py-2 hov-purple" onChange={handleChange} placeholder="Email" name="email" />
                            <FormFeedback className="d-block"> {errors?.email?.message} </FormFeedback>
                        </FormGroup>
                        <FormGroup className={"mt-5"}>
                            <Button loading={loading} style={{height: "40px"}} htmlType="submit" className="btn-purple hov-purple btn-block text-white">
                                Recovery
                            </Button>
                        </FormGroup>
                        <FormGroup className="mr-auto text-left mt-5 link-gray">
                            <Link href="/registry/login" className="txt-gray">
                                Remember Password?
                            </Link>
                        </FormGroup>
                    </form>
            </Col>
        </Container>
    );
}
