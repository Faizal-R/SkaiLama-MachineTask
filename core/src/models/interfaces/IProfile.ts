import {Document, Types} from 'mongoose'


export interface IProfile extends Document{
 _id:Types.ObjectId;
 name:string;
}