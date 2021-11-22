import nc from 'next-connect';
import podcasts from '../../../datasource/data';

const getPodcast = (id) => podcasts.find((n) => n.id === id);

const handler = nc()
  .get((req, res) => {
    const podcast = getPodcast(req.query.id);

    if (!podcast) {
      res.status(404);
      res.end();
      return;
    }

    res.json({ podcast: podcast });
  })
  .patch((req, res) => {
    const podcast = getPodcast(req.query.id);
    // req.query contains all the querystring and path parts
    // that follow after /api/notes

    if (!podcast) {
      res.status(404);
      res.end();
      return;
    }

    const i = podcasts.findIndex((n) => n.id === req.query.id);
    const updated = { ...podcasts, ...req.body };

    podcasts[i] = updated;
    res.json({ podcast: updated });
  })
  .delete((req, res) => {
    const podcast = getPodcast(req.query.id);

    if (!podcast) {
      res.status(404);
      res.end();
      return;
    }
    const i = podcasts.findIndex((n) => n.id === req.query.id);

    podcasts.splice(i, 1);

    res.json({ podcast: req.query.id });
  });

export default handler;

// export default function podcastHandler(req, res) {
//   const getPodcast = (id) => podcasts.find((pod) => pod.id === id);

//   // // User with id exists
//   // if (filtered.length > 0) {
//   //   res.status(200).json(filtered[0]);
//   // } else {
//   //   res.status(404).json({ message: `Podcast with id: ${id} not found.` });
//   // }

//   switch (method) {
//     case 'GET':
//       // Get data from your database
//       const podcast = getPodcast(req.query.id);
//       if (!podcast) {
//         res.status(404);
//         res.end();
//         return;
//       }
//       res.status(200).json({ podcast: podcast });
//       break;

//     case 'PATCH':
//       // Update or create data in your database
//       const podcast1 = getPodcast(req.query.id);
//       if (!podcast1) {
//         res.status(404);
//         res.end();
//         return;
//       }

//       const index1 = podcasts.findIndex(
//         (podcast1) => podcast1.id === req.query.id
//       );
//       const updatedPod = { ...podcasts, ...req.body };
//       podcasts[index1] = updatedPod;
//       res.status(200).json({ podcadt: updatedPod });
//       break;

//     case 'DELETE':
//       const podcast2 = getPodcast(req.query.id);
//       if (!podcast2) {
//         res.status(404);
//         res.end();
//         return;
//       }

//       const index2 = podcasts.findIndex((pod) => pod.id === req.query.id);
//       podcasts.splice(index2, 1);
//       res.status(200).json({ podcast: req.query.id });
//     default:
//       res.setHeader('Allow', ['GET', 'PATCH', 'DELETE']);
//       res.status(405).end(`Method ${method} Not Allowed`);
//   }
// }
