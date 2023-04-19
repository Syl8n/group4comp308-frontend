import React from 'react';
import { useQuery } from '@apollo/client';
import { Row, Col, Button, Card, Container } from 'react-bootstrap';
import { GET_MOTIVATIONAL_TIPS } from '../../graphql/query';

const DailyTips = () => {
    const memberId = localStorage.getItem('userId')
    const patientName = localStorage.getItem('firstname')
    console.log('patientId: ', memberId)
    const { loading, error, data } = useQuery(GET_MOTIVATIONAL_TIPS, {
        variables: { memberId },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
      <h2 style={{ marginLeft: '25px' }}>
        Daily Health Tips for {patientName}
      </h2>
      <Container style={{ width: '1000px', margin: 'auto' }}>
        <Row xs={1} sm={2} md={3} lg={3} className="g-4">
          {data.getTipsByMemberId.map((tip, index) => {
            const formattedTitle = tip.title.replace(/\s/g, '%20')
            console.log(tip)
            return (
              <Col key={tip._id}>
                <Card
                  className="hover-inflate"
                  style={{ width: '300px', height: '400px', margin: '25px' }}
                >
                  <Card.Header
                    className="text-muted font-italic"
                    style={{ fontSize: '15px' }}
                  >
                    Created on {new Date(tip.createdAt).toLocaleString()}
                  </Card.Header>
                  <Card.Img
                    variant="bottom"
                    src={`https://source.unsplash.com/random/300x180/?${formattedTitle}=${index}`}
                  />
                  <Card.Body>
                    <Card.Title>{tip.title}</Card.Title>
                    <Card.Text>{tip.tip}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>
      </Container>
    </div>
);
};

export default DailyTips;
