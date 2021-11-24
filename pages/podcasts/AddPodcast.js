import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useContext } from 'react';
import { AppContext } from '../../Contexts/AppContext';

export default function AddPodcasts (){
  const [title, setTitle] = useState("")
  const [host, setHost] = useState("")
  const [genre, setGenre] = useState("")
  const [image, setImage] = useState("")
  const {podcastHandler} = useContext(AppContext)

    let newPodcastObj = {
      title: title,
      author: host,
      genre:genre,
      image: image
    }
  

  return(
    <>
    <h1>Add Page </h1>
    <Box component="form"
    sx={{
      '& > :not(style)': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off">
      <TextField required label="Title" onChange={event => setTitle(event.target.value)} />
      <TextField required label="Host" onChange={event => setHost(event.target.value)}/>
      <TextField required label="Genre" onChange={event => setGenre(event.target.value)}/>
      <input required type="file" onChange={event => setImage(event.target.value)} />
    {/* TODO: figure out what to do with image once uploaded */}
    </Box>

    <Stack spacing={2} direction="row">
      {/* TODO: figure out add functionality */}
      <Button variant="contained" onClick={()=>{podcastHandler({
        action :"CREATE",
        payload: newPodcastObj}
      )}}
      >Confirm</Button>

      <Link href="/podcasts" as="/podcasts">
        <a>
          <Button variant="outlined">Discard</Button>
        </a>
      </Link>
    </Stack>
    
    </>
  )
}