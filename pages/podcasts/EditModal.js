import React, { useContext } from 'react';
import { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import Image from 'next/dist/client/image';
import { AppContext } from '../../Contexts/AppContext';

export default function editModal({ podcast }) {
  console.log('MODAL', podcast);
  console.log(podcast.image);
  const { podcastHandler } = useContext(AppContext);

  //TODO: How to change/save image?
  const [image, setImage] = useState(podcast.image);
  //

  const [title, setTitle] = useState(podcast.title);
  const [author, setAuthor] = useState(podcast.author);
  const [genre, setGenre] = useState(podcast.genre);

  let updatedPodcast = {
    id: podcast.id,
    image: image,
    title: title,
    author: author,
    genre: genre,
  };

  return (
    <>
      <Box>
        <Image src={`/images/${image}`} width="150" height="150" />
        <input type="file" src={image} />
        <TextField
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        ></TextField>
        <TextField
          value={author}
          onChange={(ev) => setAuthor(ev.target.value)}
        ></TextField>
        <TextField
          value={genre}
          onChange={(ev) => setGenre(ev.target.value)}
        ></TextField>
      </Box>
      <div>
        <Button
          onClick={(ev) => {
            podcastHandler({
              action: 'PATCH',
              payload: updatedPodcast,
            });
          }}
        >
          {' '}
          Save{' '}
        </Button>
        <Button> Cancel </Button>
      </div>
    </>
  );
}
