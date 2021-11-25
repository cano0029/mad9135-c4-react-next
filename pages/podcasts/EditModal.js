import React, { useContext } from 'react';
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import { Box, TextField } from '@mui/material';
import Image from 'next/dist/client/image';
import { AppContext } from '../../Contexts/AppContext';
import Link from 'next/link';
import styles from '../../styles/EditModal.module.css';
import styling from '../../styles/Add.module.css';

export default function editModal({ podcast, showModal, setShowModal }) {
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
      <div className={styles.main}>
        <Link href="/podcasts">
          <a
            style={{
              position: 'absolute',
              left: '1rem',
              marginTop: '1.8rem',
              fontSize: '1rem',
            }}
          >
            &larr; Back
          </a>
        </Link>
        <h1>Edit Details</h1>
      </div>
      <div className={styles.card}>
        <Box>
          <Image
            src={`/images/${image}`}
            width="150"
            height="150"
            alt="podcast thumbnail"
          />
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            style={{
              backgroundColor: '#eaeaea17',
              borderRadius: '4px',
              marginTop: '20px',
              marginBottom: '20px',
            }}
            InputLabelProps={{
              className: styling.textField,
            }}
            InputProps={{ className: styling.textField }}
          ></TextField>
          <TextField
            fullWidth
            label="Author"
            value={author}
            onChange={(ev) => setAuthor(ev.target.value)}
            style={{
              backgroundColor: '#eaeaea17',
              borderRadius: '4px',
              marginBottom: '20px',
            }}
            InputLabelProps={{
              className: styling.textField,
            }}
            InputProps={{ className: styling.textField }}
          ></TextField>
          <TextField
            fullWidth
            label="Genre"
            value={genre}
            onChange={(ev) => setGenre(ev.target.value)}
            style={{
              backgroundColor: '#eaeaea17',
              borderRadius: '4px',
              marginBottom: '20px',
            }}
            InputLabelProps={{
              className: styling.textField,
            }}
            InputProps={{ className: styling.textField }}
          ></TextField>
        </Box>
        <Stack className={styling.btnStack} spacing={2} direction="row">
          <ButtonUnstyled
            onClick={(ev) => {
              podcastHandler({
                action: 'PATCH',
                payload: updatedPodcast,
              });
              setShowModal(false);
            }}
            className={styling.stackButton}
            style={{ backgroundColor: '#bf00d8' }}
          >
            Save
          </ButtonUnstyled>
          <ButtonUnstyled
            className={styling.stackButton}
            style={{ backgroundColor: 'transparent' }}
            variant="outlined"
            onClick={() => {
              setShowModal(false);
            }}
          >
            Cancel
          </ButtonUnstyled>
        </Stack>
      </div>
    </>
  );
}
