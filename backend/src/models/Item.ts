import { ObjectId }  from "mongodb";

export interface Item {
    id: string;
    name: string;
    description: string;
    calories: number;
    price: number;
    vegetarian: boolean;
}