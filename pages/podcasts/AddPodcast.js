import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import ButtonUnstyled from '@mui/base/ButtonUnstyled';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useContext } from 'react';
import { AppContext } from '../../Contexts/AppContext';
import Image from 'next/dist/client/image';
import styles from '../../styles/Add.module.css';

export default function AddPodcasts() {
  const [title, setTitle] = useState('');
  const [host, setHost] = useState('');
  const [genre, setGenre] = useState('');
  const [image, setImage] = useState('default.png');
  const { podcastHandler } = useContext(AppContext);

  let newPodcastObj = {
    title: title,
    author: host,
    genre: genre,
    image: image,
  };

  return (
    <div className={styles.main}>
      <h1>New Podcast</h1>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          required
          fullWidth
          style={{
            backgroundColor: '#eaeaea17',
            borderRadius: '4px',
          }}
          InputLabelProps={{
            className: styles.textField,
          }}
          InputProps={{ className: styles.textField }}
          label="Title"
          onChange={(event) => setTitle(event.target.value)}
        />
        <TextField
          required
          fullWidth
          style={{ backgroundColor: '#eaeaea17', borderRadius: '4px' }}
          InputLabelProps={{
            className: styles.textField,
          }}
          InputProps={{ className: styles.textField }}
          label="Host"
          onChange={(event) => setHost(event.target.value)}
        />
        <TextField
          required
          fullWidth
          style={{ backgroundColor: '#eaeaea17', borderRadius: '4px' }}
          InputLabelProps={{
            className: styles.textField,
          }}
          InputProps={{ className: styles.textField }}
          label="Genre"
          onChange={(event) => setGenre(event.target.value)}
        />
      </Box>

      <Stack className={styles.btnStack} spacing={2} direction="row">
        {/* TODO: figure out add functionality */}
        <Link href="/podcasts" as="podcasts">
          <a>
            <ButtonUnstyled
              variant="contained"
              className={styles.stackButton}
              style={{ backgroundColor: '#bf00d8' }}
              onClick={() => {
                podcastHandler({
                  action: 'CREATE',
                  payload: newPodcastObj,
                });
              }}
            >
              Create
            </ButtonUnstyled>
          </a>
        </Link>

        <Link href="/podcasts" as="/podcasts">
          <a>
            <ButtonUnstyled
              className={styles.stackButton}
              style={{ backgroundColor: 'transparent' }}
              variant="outlined"
            >
              Cancel
            </ButtonUnstyled>
          </a>
        </Link>
      </Stack>
    </div>
  );
}
