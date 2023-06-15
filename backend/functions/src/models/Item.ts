import { ObjectId } from "mongodb";

export interface Item {
    _id?: ObjectId;
    id: string;
    name: string;
    description: string;
    calories: number;
    price: number;
    vegetarian: boolean;
}