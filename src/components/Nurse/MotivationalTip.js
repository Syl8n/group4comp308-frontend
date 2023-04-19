import React, { useState } from 'react';
import { Navbar, Form, Button, Container, Row, Col, Card, FloatingLabel } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_MEMBER } from '../../graphql/query';
import { ADD_MOTIVATIONAL_TIP } from '../../graphql/mutation';

const MotivationalTip = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [tip, setTip] = useState('');
    const { id: patientId } = useParams();
    const { loading, error, data } = useQuery(GET_MEMBER, {
        variables: { _id: patientId }
    });

    const [addMotivationalTip, { addLoading, addError }] = useMutation(ADD_MOTIVATIONAL_TIP, {
        onError: (addError) => {
            console.error(addError);
        },
    });


    const nurseId = localStorage.getItem('userId')
    const handleSubmit = async (e) => {
        e.preventDefault();
        const variables = {
            form: {
              title: title,
              tip: tip,
              memberId: patientId,
            },
          };

          console.log("Mutation variables:", variables);

        try {
            const { data } = await addMotivationalTip({ variables });
            console.log(data)

            if (data) {
              alert('Vital signs submitted successfully!');
              const nurseId = localStorage.getItem('userId');
              navigate('/nurse/' + nurseId);
          }
        } catch (error) {
            console.error(error.message);
            // Handle the error here
        }
    };

    const handleCancel = () => {
        
        navigate('/nurse/' + nurseId);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (addLoading) return <p>Sending Motivational Tip...</p>
    if (addError) return <p>Error sending motivational tip: {addError.message}</p>

    const { firstname, lastname } = data.getMember;

  return (
    <div>
    <Navbar className="navbar navbar-dark bg-dark custom-navbar">
                    <Navbar.Brand>Send Motivational Tip Page</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    </Navbar.Collapse>
    </Navbar>
    
    <div className="d-flex justify-content-center">
      <div className="card shadow p-3 mt-5">
        <h2 className="p-3"> Send Motivational Tip to Patient </h2>
          <Form onSubmit={handleSubmit}>
          <FloatingLabel label="Title" className='mb-3' controlId="title">
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Title..."
                className="md-5"
              />
              </FloatingLabel>
              <FloatingLabel label="Tip" className='mb-3' controlId="tip">
              <Form.Control
                type="text"
                value={tip}
                onChange={(e) => setTip(e.target.value)}
                placeholder="Enter tip..."
                className="md-5"
              />
              </FloatingLabel>
            <Button className="mt-10" variant="primary" type="submit">
              Send
            </Button>{' '}
            <Button className="mt-10" onClick={handleCancel} variant="secondary" type="button">
              Cancel
            </Button>
          </Form>
      </div>
    </div>
    </div>
  );
};

export default MotivationalTip;
