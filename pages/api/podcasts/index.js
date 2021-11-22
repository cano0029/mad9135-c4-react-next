// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import nc from 'next-connect';
import podcasts from '../../../datasource/data';

const podcastsHandler = nc()
  .get((req, res) => {
    //returns all notes
    res.json({ podcasts: podcasts });
  })
  .post((req, res) => {
    //adds a new note
    const id = Date.now();
    const podcast = { ...req.body, id };
    podcasts.push(podcast);
    res.json({ podcast: podcast });
  });

export default podcastsHandler;
