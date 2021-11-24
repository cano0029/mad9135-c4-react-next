/**
 * new version that reads and writes to file using NodeJS
 */
  import nc from 'next-connect';
  import cors from 'cors';
  import { loadPodcasts, savePodcasts } from '../../../datasource/fs-utils';

 //variable that will be in sync with file contents
  let podcasts = [];
  
  const handler = nc()
    .use(cors())
    .get((req, res) => {
      console.log('returns all notes from a JSON file');
      podcasts = loadPodcasts('data.json');
      res.json({ podcasts: podcasts });
    })
    .post((req, res) => {
      console.log('adds a new note, assume it has not be loaded yet');
      if (podcasts.length === 0) {
        podcasts = loadPodcasts('data.json');
      }
      const id = Math.random()
        .toString(16)
        .substr(2, 10)
        .concat('-', Date.now().toString());
      const podcast = { ...req.body, id };
      podcasts.push(podcast);
      //now put the updated array back into the file
      savePodcasts(podcasts, 'data.json');
      //return the newly added podcast
      res.json({ podcast: podcast });
    });
  
  export default handler;




// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import nc from 'next-connect';
// import podcasts from '../../../datasource/data';


// const podcastsHandler = nc()
//   .get((req, res) => {
//     //returns all notes
//     res.json({ podcasts: podcasts });
//   })
//   .post((req, res) => {
//     console.log("cool im posting")
//     //adds a new note
//     const id = Date.now();
//     const podcast = { ...req.body, id };
//     podcasts.push(podcast);
//     res.json({ podcast: podcast });
//   });

// export default podcastsHandler;
