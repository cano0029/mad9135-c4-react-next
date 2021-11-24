import { createContext, useState } from 'react';
import dataSource from '../datasource/data';

//Create Context
export const AppContext = createContext();

//Provider Component
export const AppProvider = ({ children }) => {
  const [podcasts, setPodcasts] = useState(dataSource);
  const [podcast, setPodcast] = useState();

  //Actions

  function podcastHandler({ action, payload }) {
    if (action == 'CREATE') {
      let url = '/api/podcasts/';
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
        .then(
          (resp) => {
            if (resp.ok) return resp.json();
            throw new Error(resp.statusText);
          },
          (err) => {
            //failed to fetch user
            console.warn({ err });
          }
        )
        .then(() => {
          setPodcasts(podcasts);
          return podcasts;
        })
        .catch(console.error);
    } else if (action == 'DELETE') {
      let url = `/api/podcasts/${payload}`;
      fetch(url, {
        method: 'DELETE',
        payload,
      }).then(
        (resp) => {
          if (resp.ok) return resp.json();
          throw new Error(resp.statusText);
        },
        (err) => {
          console.warn({ err });
        }
      );
    } else if (action == 'PATCH') {
      console.log('IM EDITING', payload);
      let url = `/api/podcasts/${payload.id}`;
      fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).then(
        (resp) => {
          if (resp.ok) return resp.json();
          throw new Error(resp.statusText);
        },
        (err) => {
          console.warn({ err });
        }
      );
    } else {
      return podcasts;
    }
  }

  return (
    <AppContext.Provider value={{ podcastHandler: podcastHandler, podcasts }}>
      {children}
    </AppContext.Provider>
  );
};
