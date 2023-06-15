//import { ObjectId }  from "mongodb";
import express from "express";
import { getClient } from "../db";
import { Item } from "../models/Item";

export const itemsRouter = express.Router();

// const errorResponse = ( error: any , res: any) => {
//     console.error("FAIL", error);
//     res.status(500).json({ message: "internal Server Error"});
// }

itemsRouter.get('/items', async(req, res) => {
    try {
      const client = await getClient();
      const results = await client.db()
            .collection<Item>('Items').find().toArray(); 
      console.log(results);
      res.json(results);

    } catch (err) {
        console.error("ERROR", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

// itemsRouter.post('/items', async(req, res) => {
//     try {  
//       const cartitem = req.body as Item;
//       const client = await getClient();
//       await client.db()
//         .collection<Item>('items')
//         .insertOne(cartitem);
//       res.status(201).json(cartitem);
//     } catch (err) {
//         console.error("ERROR", err);
//         res.status(500).json({message: 'Internal Server Error'});
//     }
//   });

//   itemsRouter.put('/items/:id',async (req, res) => {
//     try {
//         const id = req.params.id;
//         const client = await getClient();
//         const results = await client.db().collection<Item>('items').updateOne({id: new ObjectId(id)},{$set:req.body});
//         return res.json(results);
//       } catch (err) {
//         return errorResponse;
//       }    
//   });


//module.exports = productRouter;

export default itemsRouter;