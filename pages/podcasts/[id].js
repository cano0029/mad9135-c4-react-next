import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AppContext } from '../../Contexts/AppContext';
import { useContext } from 'react';
import EditModal from '../../components/EditModal';
import styles from '../../styles/Details.module.css';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Modal, Box, Typography, ButtonUnstyled } from '@mui/material';

export default function PodcastDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [podcast, setPodcast] = useState(null);
  const { podcastHandler } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);

  //delete pop up
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

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
            image: 'sadBear.png',
            title: 'No Such Podcast Exists',
            author: err.message,
            genre: 'sorry',
          };
          setPodcast(fake);
        });
    }
  }, [id, showModal, setPodcast]);

  if (showModal) {
    //============= Edit functionality =============
    return (
      <div>
        <div>
          <EditModal podcast={podcast} setShowModal={setShowModal} />
        </div>
      </div>
    );
  } else {
    return (
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
        <h1 style={{ marginBottom: '3rem' }}>Details</h1>
        <div>
          {podcast && (
            <div>
              <Image
                src={`/images/${podcast.image}`}
                alt="cover"
                height={300}
                width={300}
                className={styles.mainImg}
              />
              <div className={styles.detailsSkirt}>
                <h1 style={{ margin: '0rem', padding: '0.5rem' }}>
                  {podcast.title}
                </h1>
                <div className={styles.authorChip}>
                  <h3>{podcast.author}</h3>
                  <div className={styles.chip}>
                    <h4>{podcast.genre}</h4>
                  </div>
                </div>
                <Stack className={styles.stack} spacing={2} direction="row">
                  <DeleteIcon
                    variant="contained"
                    onClick={() => {
                      handleOpenModal();
                    }}
                    sx={{
                      marginRight: '5rem',
                      fontSize: '2rem',
                    }}
                  />
                  <ModeEditIcon
                    variant="outlined"
                    style={{ fontSize: '2rem' }}
                    onClick={() => {
                      setShowModal(true);
                    }}
                  />
                </Stack>
              </div>
            </div>
          )}
          <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className={styles.modal}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Are you sure you want to delete this podcast?
              </Typography>
              <div>
                <Link href="/podcasts" as="/podcasts">
                  <a>
                    <ButtonUnstyled
                      style={{ color: 'red', border: '1px solid red' }}
                      className={styles.button}
                      onClick={() => {
                        podcastHandler({ action: 'DELETE', payload: id });
                      }}
                    >
                      Delete
                    </ButtonUnstyled>
                  </a>
                </Link>
                <ButtonUnstyled
                  style={{ border: '1px solid grey' }}
                  className={styles.button}
                  onClick={() => handleCloseModal()}
                >
                  Cancel
                </ButtonUnstyled>
              </div>
            </Box>
          </Modal>
        </div>
      </div>
    );
  }
}
