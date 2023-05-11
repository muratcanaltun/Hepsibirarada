import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';

function AcceptStore() {

  const [stores, setStores] = useState([]);
  let navigate = useNavigate();
  
  useEffect(() => {
    const setStoresFromServer = async () => {
        const currentStores = await axios.get(`http://localhost:8080/stores`);
        let currentStoresData = currentStores.data;
        setStores(currentStoresData);
        console.log(currentStoresData);
    }

    setStoresFromServer().catch(e => console.log(e))
}, [])

  const acceptStore = async (e, store) => {
    e.preventDefault();
    await axios.put('http://localhost:8080/stores/' + store.id, { accepted: true }).then(response => {
      console.log(response);
    })
      .catch(error => {
        console.log(error);
      });
    navigate(`/`, { replace: true });
  }

  const rejectStore = async (e, store) => {
    e.preventDefault();
    await axios.put('http://localhost:8080/stores/' + store.id, { accepted: false }).then(response => {
      console.log(response);
    })
      .catch(error => {
        console.log(error);
      });
    navigate(`/`, { replace: true });
  }

  return (
    <List>
      {stores.map((store, index) => (
        <ListItem key={index}>
          <ListItemText primary={`Store name: ${store.username}`} secondary={`Store id: ${store.id}`} />
          <ListItemSecondaryAction>
            <IconButton onClick={() => acceptStore(store)}>
              Accept
            </IconButton>
            <IconButton onClick={() => rejectStore(store)}>
              Reject
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
}

export default AcceptStore;
