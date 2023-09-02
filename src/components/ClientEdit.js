import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

function ClientEdit(props) {
  let navigate = useNavigate()
  let { id } = useParams()

  const emptyItem = {
    name: '',
    email: ''
  };

  const [item, setItem] = useState(emptyItem);

  useEffect(() => {
    async function fetchData() {
      if (id !== 'new') {
        const response = await fetch(`/api/clients/${id}`);
        const client = await response.json();
        setItem(client);
      }
    }

    fetchData();
  }, [id]);

  const handleChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    await fetch('/api/clients' + (item.id ? '/' + item.id : ''), {
      method: item.id ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item),
    });

    navigate('/clients');
  };

  const title = <h2>{item.id ? 'Edit Client' : 'Add Client'}</h2>;

  return (
    <div>
      <AppNavbar />
      <Container>
        {title}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              value={item.name || ''}
              onChange={handleChange}
              autoComplete="name"
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="text"
              name="email"
              id="email"
              value={item.email || ''}
              onChange={handleChange}
              autoComplete="email"
            />
          </FormGroup>
          <FormGroup>
            <Button color="primary" type="submit">
              Save
            </Button>{' '}
            <Button color="secondary" tag={Link} to="/clients">
              Cancel
            </Button>
          </FormGroup>
        </Form>
      </Container>
    </div>
  );
}

export default ClientEdit;