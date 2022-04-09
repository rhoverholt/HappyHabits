import React, {  } from 'react';
import { useQuery } from '@apollo/client';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import {QUERY_ME} from '../utils/queries';

import Auth from "../utils/auth";

const Habit = () => {
const { loading, data } = useQuery(QUERY_ME);
const { id } = useParams();


const userData = data?.me || {};


  if (loading) {

    return <div>Loading...</div>;
    
  }

  if (!userData?.username) {
    return (
      <h4>
        You need to be logged in to see your profile page. Use the navigation
        links above to sign up or log in!
      </h4>
    );
  }


  return (
<>

<Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Habit Editor</h1>
        </Container>
      </Jumbotron>
      <Container>
        <CardColumns>
        <Card>
                <Card.Body>
                  <Card.Title>{userData.habits[0].title}</Card.Title>
                  <Button className='btn-block btn-danger'>
                    Save Habit
                  </Button>
                </Card.Body>
              </Card>  
              <Card>
                <Card.Body>
                  <Card.Title>{userData.habits[0].tasks[0].description}</Card.Title>
                  <Card.Text>
                  {userData.habits[0].tasks[0].frequency}</Card.Text>
                  <Button className='btn-block btn-danger'>
                    Save Task
                  </Button>
                </Card.Body>
              </Card>
         
              <Card>
                <Card.Body>
                  <Card.Title>Task 1Name</Card.Title>
                  <Card.Text></Card.Text>
                  <Button className='btn-block btn-danger'>
                    Delete Task
                  </Button>
                </Card.Body>
              </Card>              
              <Card>
                <Card.Body>
                  <Card.Title>Task 2 Name</Card.Title>
                  <Card.Text></Card.Text>
                  <Button className='btn-block btn-danger'>
                    Delete Task
                  </Button>
                </Card.Body>
              </Card>
        </CardColumns>
      </Container>

</>
  
  );
};

export default Habit;