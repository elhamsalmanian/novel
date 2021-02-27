import React, {useEffect} from "react";
import {Container, Col, FormGroup, FormFeedback , Label} from "reactstrap";
import {useForm} from "react-hook-form";
import {Input, Button} from "antd";

const information = [
    { name : "First name" , value : "john" , key : "name" , editable : true } ,
    { name : "Last name" , value : "didi kardo" , key : "last_name" , editable : true },
    { name : "Email" , value : "didi@gmail.com" , key : "email" } ,
    { name : "Phone number" , value : "1234568765" , key : "phone_number" , editable : true },
    { name : "Clinic name" , value : "eureaka" , key : "clinic_name" },
    { name : "Clinic number" , value : "32467432" , key : "clinic_number" },
    { name : "Clinic address" , value : "USA , California , LA , Street 256" , key: "clinic_address" },
];

export default function ChangeInfo() {
    const {errors, register, handleSubmit, setValue, setError} = useForm();
    console.log(errors);
    const submit = data => {
        if (!data.name || !data.last_name || data.phone_number) {
            let currentWrong = !data.name ? "name" : !data.last_name ? "last_name" : "phone_number";
            return setError(currentWrong, {message: "required"});
        }
        console.log(data);
    };
    const handleChange = e => setValue(e.target.name, e.target.value);
    useEffect(() => {
        register("name");
        register("last_name");
    }, [register]);
    return (
        <Container className="h-100">
            <Col xs={12} md={6} className="mx-auto h-100 w-100 d-flex flex-column align-items-center justify-content-center">
                <div className="mt-3 mb-2 shadow rounded-circle p-3 bg-purple text-center">
                    <h4 className="m-0 text-white"> EM </h4>
                </div>
                <form onSubmit={handleSubmit(submit)} className="w-100">
                    {
                        information.map(item => {
                            return (
                                <FormGroup>
                                    <Label htmlFor={item.key}> { item.name } </Label>
                                    <Input disabled={!item.editable} id={item.key} defaultValue={item.value}
                                           className="hov-purple p-2"
                                           name={item.key}
                                           placeholder={ item.name }
                                           onChange={handleChange} />
                                    <FormFeedback className="d-block"> {errors[item.key]?.message} </FormFeedback>
                                </FormGroup>
                            )
                        })
                    }

                    <FormGroup className="w-100 text-center">
                        <Button htmlType="submit" className="btn-purple text-white px-5 mx-auto" style={{height: "40px"}}>
                            Save
                        </Button>
                    </FormGroup>
                </form>
            </Col>
        </Container>
    );
}
