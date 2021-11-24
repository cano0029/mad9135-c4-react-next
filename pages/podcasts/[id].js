import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/Link';
import Image from 'next/image';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { AppContext } from '../../Contexts/AppContext';
import { useContext } from 'react';


// /notes/:id
export default function PodcastDetails(props) {
  const router = useRouter();
  const { id } = router.query;
  const [podcast, setPodcast] = useState(null);
  const {removePodcast} = useContext(AppContext)
  
  //TODO: fetch podcast


  useEffect(() => {
    let url = `/api/podcasts/${id}`;
    if (id) {
      fetch(url, { method: 'GET' })
        .then((resp) => {
          if (!resp.ok) throw new Error(resp.statusText);
          return resp.json();
        })
        .then((results) => {
          setPodcast(results.podcast);
        })
        .catch((err) => {
          console.warn(err.message);
          let fake = {
            id,
            title: 'No such Podcast Exists',
            author: err.message,
          };
          setPodcast(fake);
        });
    }
  }, [id]);

  //TODO: build podcast details page

  return (
    <div>
      <Link href="/podcasts">
        <a>&larr; Back to Podcast List</a>
      </Link>
      <h1>Podcast Details Page</h1>
      <p>Add details here</p>
      <p>This is Podcast {id}</p>
      <div>
        {podcast && (
          <div>
            <Image
              src={`/images/${podcast.image}`}
              alt="cover"
              height={150}
              width={150}
            />
            <div></div>
            <div>
              <h1>{podcast.title}</h1>
              <h2>{podcast.author}</h2>
              <h3>{podcast.genre}</h3>
            </div>
          </div>
        )}
      </div>
      <Stack spacing={2} direction="row">
      {/* TODO: functionality for both buttons */}
      {/* <Link href="/podcasts" as="podcasts"> */}
        {/* <a> */}
      <Button variant="contained" onClick={()=>{removePodcast(id)}}>Delete</Button>
        {/* </a> */}
      {/* </Link> */}
      <Button variant="outlined">Edit</Button>
    </Stack>
    </div>
  );
}
