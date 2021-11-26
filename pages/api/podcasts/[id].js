/**
 * Steve's Code
 */

import nc from 'next-connect';
import cors from 'cors';
import { loadPodcasts, savePodcasts } from '../../../datasource/fs-utils';

//the global array to hold all the podcasts in memory
let podcasts = [];
podcasts = loadPodcasts('data.json');
//loadPodcasts method will parse the JSON

const getPodcast = (id) => podcasts.find((n) => n.id === id);

const handler = nc()
  .use(cors())
  .get((req, res) => {
    console.log('return one item that matches the id');
    if (podcasts.length === 0) {
      podcasts = loadPodcasts('data.json');
      //loadPodcasts method will parse the JSON
      //load the podcasts if first time calling
    }
    const podcast = getPodcast(req.query.id);
    //find podcast in podcasts variable
    if (!podcast) {
      res.status(404);
      res.end();
      return;
    }

    res.json({ podcast: podcast });
  })
  .patch((req, res) => {
    console.log('update the item that matches the id');
    const podcast = getPodcast(req.query.id);
    // req.query contains all the querystring and path parts
    // that follow after /api/podcasts/56?cheese=cheddar
    // req.query.id = 56
    // req.query.cheese = cheddar

    if (!podcast) {
      res.status(404);
      res.end();
      return;
    }

    const i = podcasts.findIndex((n) => n.id === req.query.id);
    const updated = { ...podcasts, ...req.body };

    podcasts[i] = updated;
    //now put the updated array back into the file
    savePodcasts(podcasts, 'data.json');
    //the savePodcasts function will stringify the array
    //return the updated podcast
    res.json({ podcast: updated });
  })
  .delete((req, res) => {
    console.log('delete the item that matches the id');
    const podcast = getPodcast(req.query.id);

    if (!podcast) {
      res.status(404);
      res.end();
      return;
    }
    const i = podcasts.findIndex((n) => n.id === req.query.id);

    podcasts.splice(i, 1);
    //now put the updated array back into the file
    savePodcasts(podcasts, 'data.json');
    //return the id of the deleted podcast
    res.json({ podcast: req.query.id });
  });

export default handler;
