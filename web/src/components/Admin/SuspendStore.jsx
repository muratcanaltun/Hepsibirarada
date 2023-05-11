import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';

function SuspendStore() {

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

  const suspendStore = async (e, store) => {
    e.preventDefault();
    await axios.put('http://localhost:8080/stores/' + store.id, { suspended: true }).then(response => {
      console.log(response);
    })
      .catch(error => {
        console.log(error);
      });
    navigate(`/`, { replace: true });
  }

  const unSuspendStore = async (e, store) => {
    e.preventDefault();
    await axios.put('http://localhost:8080/stores/' + store.id, { suspended: false }).then(response => {
      console.log(response);
    })
      .catch(error => {
        console.log(error);
      });
    navigate(`/`, { replace: true });
  }

  //map stores so it displays all of them
  return (
    <List>
      {stores.map((store, index) => (
        <ListItem key={index}>
          <ListItemText primary={`Store name: ${store.username}`} secondary={`Store id: ${store.id}`} />
          <ListItemSecondaryAction>
            <IconButton onClick={() => suspendStore(store)}>
              Suspend
            </IconButton>
            <IconButton onClick={() => unSuspendStore(store)}>
              Unsuspend
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
}

export default SuspendStore;
