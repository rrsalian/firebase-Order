import { ObjectId } from "mongodb";
import express from "express";
import { getClient } from "../db";
import { Item } from "../models/Item";

export const itemsRouter = express.Router();

const errorResponse = ( error: any , res: any) => {
    console.error("FAIL", error);
    res.status(500).json({ message: "internal Server Error"});
}

itemsRouter.get('/items', async(req, res) => {
    try {
       let includes = req.query.includes;
       let maxPrice = req.query.maxPrice;
       let limit = req.query.limit;

      //  let query: any = {
      //    $and: [           
      //        maxPrice ? { price: { $lte: +maxPrice } } : {},
      //        includes ? { name: { $regex: `${includes}`, $options: "xi" }} : {},           
      //    ]
      //  }

      const client = await getClient();
      // let results = await client.db()
      //     .collection<CartItem>('cartItems').find(query)
      //     .sort({price: -1});

      const results = await client.db()
            .collection<Item>('items').find().toArray();

      // if (limit) {
      //   results = results.limit(+limit);
      // }
      //const newResults = await results.toArray();
      //res.json(results.toArray());

      res.json(results);

    } catch (err) {
        console.error("ERROR", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

itemsRouter.post('/items', async(req, res) => {
    try {  
      const cartitem = req.body as Item;
      const client = await getClient();
      await client.db()
        .collection<Item>('items')
        .insertOne(cartitem);
      res.status(201).json(cartitem);
    } catch (err) {
        console.error("ERROR", err);
        res.status(500).json({message: 'Internal Server Error'});
    }
  });

  itemsRouter.put('/items/:id',async (req, res) => {
    try {
        const _id = new ObjectId(req.params.id);
        const client = await getClient();
        const results = await client.db().collection<Item>('items').updateOne({_id: _id},{$set:req.body});
        res.json(results);
      } catch (err) {
        return errorResponse;
      }    
  });


//module.exports = productRouter;

export default itemsRouter;