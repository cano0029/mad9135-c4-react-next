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
      return setPodcasts(
        podcasts.filter((podcast) => {
          podcast.id !== payload;
        })
      );
    } else if (action == 'EDIT') {
      const updatePodcasts = podcasts.map((podcast) => {
        if (podcast.id === payload.id) {
          return payload;
        }
        return podcast;
      });
      return setPodcasts(updatePodcasts);
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

// import React, {createContext, useMemo, useReducer} from "react";
// import AppReducer from './AppReducer'
// import data from '../datasource/data'
// import Podcasts from "../pages/podcasts";
// import { useState } from "react";

// //inital state
// const initialState = data

// //create context
// export const AppContext = createContext(initialState)

// //Provider Component
// export const AppProvider = ({children}) =>{
//   const [state, dispatch] = useReducer(AppReducer, initialState);

// //Actions
//   const removePodcast =(id)=>{
//     console.log("DELETE ME: ", id)
//     dispatch({
//       type: "DELETE",
//       payload: id
//     })
//   }

//   const addPodcast = (obj)=>{
//     console.log("ive been added: ", obj)
//     console.log(state)
//       dispatch({
//         type: "POST",
//         payload: {
//           title: obj.title,
//           host: obj.host,
//           genre: obj.genre,
//           image: obj.image
//         }
//       })
//     }

//     const editPodcast=(id, obj)=>{
//       dispatch({
//         type: "PATCH",
//         payload: {
//           id: id,
//           title: obj.title,
//           host: obj.host,
//           genre: obj.genre,
//           image: obj.image
//       }
//       })
//     }

//   return (
//     <AppContext.Provider value={{podcasts: data, removePodcast: removePodcast, addPodcast: addPodcast}}>
//       {children}
//     </AppContext.Provider>
//   )
// }
