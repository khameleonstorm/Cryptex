// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';

type Data = {
  message: string
}

function handler( req: NextApiRequest, res: NextApiResponse<Data>) {
  const { data } = req.body
  const amount = data.amount
  const profit = amount * 0.0357;

  res.status(200).json({ message: "Trade initiated and will be completed in 24 hours"})
}

export default handler
// pages/api/trades/[id]/profit.js
// import firebase from 'firebase/app';
// import 'firebase/firestore';

// export default async function handler(req, res) {
//   if (req.method !== 'PUT') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   const { id } = req.query;
//   const { profit } = req.body;

//   const db = firebase.firestore();

//   try {
//     const tradeRef = db.collection('trades').doc(id);
//     const tradeDoc = await tradeRef.get();

//     if (!tradeDoc.exists) {
//       return res.status(404).json({ error: 'Trade not found' });
//     }

//     // Update the trade profit
//     await tradeRef.update({ profit });

//     // Schedule the timeout
//     setTimeout(async () => {
//       const updatedTradeDoc = await tradeRef.get();

//       if (updatedTradeDoc.exists && updatedTradeDoc.data().profit === profit) {
//         await tradeRef.update({ profit: profit + 1 }); // Update the profit
//       }
//     }, 24 * 60 * 60 * 1000);

//     return res.status(200).end();
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// }

// // Initiate the trade and call the serverless function
// const initiateTrade = async () => {
//   const { /* trade data */ } = this.state;
//   const response = await fetch(`/api/trades`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ /* trade data */ })
//   });
//   if (response.ok) {
//     const tradeId = await response.json();
//     const response2 = await fetch(`/api/trades/${tradeId}/profit`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ profit: 0 })
//     });
//     if (response2.ok) {
//       // Handle the success
//     } else {
//       // Handle the error
//     }
//   } else {
//     // Handle the error
//   }
// };