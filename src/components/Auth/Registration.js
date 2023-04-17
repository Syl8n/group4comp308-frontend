import React, { useEffect, useState } from 'react'
import { Form, Button, ToggleButton, ButtonGroup, Card, Spinner } from "react-bootstrap"
import { useNavigate } from 'react-router-dom';
import { ADD_MEMBER } from '../../graphql/mutation'
import { useMutation } from "@apollo/client";
//import { useDispatch } from "react-redux";
//import { setUserInfo, setToken } from '../../redux/auth-redux';

const Registration = (props) => {
    const navigate = useNavigate()
    // const dispatch = useDispatch()
    const [userState, setState] = useState({
        firstname: "",
        lastname: "",
        password: "",
        role: "",
        username: "",

    })
    const [addMember, { loading, error }] = useMutation(ADD_MEMBER);

    /*useEffect(() => {
        // const loggedInUser = auth.getToken();
        // if (loggedInUser === "") {
        //   window.location.href = `/login`;
        // }
        if(loading){
            return <Spinner animation="border" role="status" />
        }
        if(data){
            dispatch(setUserInfo(data?.registration))
            console.log(data)
            if(userState.usertype==='Patient'){
                navigate(`/patient/${data.registration.userId}`)
            }
            else{
                navigate(`/nurse/${data.registration.userId}`)
            }
        }
      }, data)*/

    const setFirstname = (input) => {
        setState({ ...userState, firstname: input })
    }

    const setLastname = (input) => {
        setState({ ...userState, lastname: input })
    }

    const setPassword = (passwordInput) => {
        setState({ ...userState, password: passwordInput })
        console.log(userState)
    }

    const setRadioValue = (input) => {
        setState({ ...userState, role: input })
    }

    const setEmail = (input) => {
        setState({ ...userState, username: input })
    }

    const formSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await addMember({
                variables: {
                    input: userState,
                },
            });
            console.log(data.addMember);
            // Redirect to the appropriate page based on the user's role
            if (data.addMember.role === 'Patient') {
                navigate(`/patient/${data.addMember._id}`);
            } else {
                navigate(`/nurse/${data.addMember._id}`);
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Card border="primary" className='m-auto mt-3 w-50'>
            <Card.Body>
                <Card.Title>
                    <div className="text-center"><span className="text-dark">Register</span></div>
                </Card.Title>
                <Form onSubmit={e => formSubmit(e)}>
                    <Form.Group controlId="firstname" className='mb-3'>
                        <Form.Control type="text" placeholder="First name" onChange={e => setFirstname(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="lastname" className='mb-3'>
                        <Form.Control type="text" placeholder="Last name" onChange={e => setLastname(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="email" className='mb-3'>
                        <Form.Control type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="password" className='mb-3'>
                        <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                    </Form.Group>

                    <ButtonGroup>
                        <ToggleButton style={{ marginTop: "10px" }} variant={userState.role === "PATIENT" ? "success" : "outline-success"} id='tb-patient' type='radio' name='radio' value='PATIENT' onChange={(e) => setRadioValue(e.currentTarget.value)}>Patient</ToggleButton>
                        <ToggleButton style={{ marginTop: "10px" }} variant={userState.role === "NURSE" ? "success" : "outline-success"} id='tb-nurse' type='radio' name='radio' value='NURSE' onChange={(e) => setRadioValue(e.currentTarget.value)}>Nurse</ToggleButton>
                    </ButtonGroup>
                    <div className='mt-2'>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    )
}
export default Registration;