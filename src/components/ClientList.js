import React, { useState, useEffect } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

function ClientList() {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('api/clients'); // This path is relative to the frontend development server
      const data = await response.json();
      console.log(data);
      setClients(data);
      setIsLoading(false);
    }

    fetchData();
  }, []); // The empty array means this effect runs once after the initial render

  const remove = async (id) => {
    await fetch(`/api/clients/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    setClients(clients.filter(client => client.id !== id));
  };

  const clientList = clients.map(client => (
    <tr key={client.id}>
      <td style={{ whiteSpace: 'nowrap' }}>{client.name}</td>
      <td>{client.email}</td>
      <td>
        <ButtonGroup>
          <Button size="sm" color="primary" tag={Link} to={`/clients/${client.id}`}>Edit</Button>
          <Button style={{ marginLeft: '3px' }} size="sm" color="danger" onClick={() => remove(client.id)}>Delete</Button>
        </ButtonGroup>
      </td>
    </tr>
  ));

  return (
    <div>
      <AppNavbar />
      <Container fluid>
        <div style={{margin: '10px'}} className="float-right">
          <Button color="success" tag={Link} to="/clients/new">Add Client</Button>
        </div>
        <h3>Clients</h3>
        <Table className="mt-4">
          <thead>
            <tr>
              <th width="30%">Name</th>
              <th width="30%">Email</th>
              <th width="40%">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? <p>Loading...</p> : clientList}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default ClientList;
