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









// import nc from 'next-connect';
// import podcasts from '../../../datasource/data';

// const getPodcast = (id) => podcasts.find((n) => n.id === id);

// const handler = nc()
//   .get((req, res) => {
//     const podcast = getPodcast(req.query.id);

//     if (!podcast) {
//       res.status(404);
//       res.end();
//       return;
//     }

//     res.json({ podcast: podcast });
//   })
//   .patch((req, res) => {
//     const podcast = getPodcast(req.query.id);
//     // req.query contains all the querystring and path parts
//     // that follow after /api/notes

//     if (!podcast) {
//       res.status(404);
//       res.end();
//       return;
//     }

//     const i = podcasts.findIndex((n) => n.id === req.query.id);
//     const updated = { ...podcasts, ...req.body };

//     podcasts[i] = updated;
//     res.json({ podcast: updated });
//   })
//   .delete((req, res) => {
//     console.log("ive been deleted!")
//     const podcast = getPodcast(req.query.id);

//     if (!podcast) {
//       res.status(404);
//       res.end();
//       return;
//     }
//     const i = podcasts.findIndex((n) => n.id === req.query.id);

//     podcasts.splice(i, 1);

//     res.json({ podcast: req.query.id });
//   });

// export default handler;

// // export default function podcastHandler(req, res) {
// //   const getPodcast = (id) => podcasts.find((pod) => pod.id === id);

// //   // // User with id exists
// //   // if (filtered.length > 0) {
// //   //   res.status(200).json(filtered[0]);
// //   // } else {
// //   //   res.status(404).json({ message: `Podcast with id: ${id} not found.` });
// //   // }

// //   switch (method) {
// //     case 'GET':
// //       // Get data from your database
// //       const podcast = getPodcast(req.query.id);
// //       if (!podcast) {
// //         res.status(404);
// //         res.end();
// //         return;
// //       }
// //       res.status(200).json({ podcast: podcast });
// //       break;

// //     case 'PATCH':
// //       // Update or create data in your database
// //       const podcast1 = getPodcast(req.query.id);
// //       if (!podcast1) {
// //         res.status(404);
// //         res.end();
// //         return;
// //       }

// //       const index1 = podcasts.findIndex(
// //         (podcast1) => podcast1.id === req.query.id
// //       );
// //       const updatedPod = { ...podcasts, ...req.body };
// //       podcasts[index1] = updatedPod;
// //       res.status(200).json({ podcast: updatedPod });
// //       break;

// //     case 'DELETE':
// //       const podcast2 = getPodcast(req.query.id);
// //       if (!podcast2) {
// //         res.status(404);
// //         res.end();
// //         return;
// //       }

// //       const index2 = podcasts.findIndex((pod) => pod.id === req.query.id);
// //       podcasts.splice(index2, 1);
// //       res.status(200).json({ podcast: req.query.id });
// //     default:
// //       res.setHeader('Allow', ['GET', 'PATCH', 'DELETE']);
// //       res.status(405).end(`Method ${method} Not Allowed`);
// //   }
// // }
