import {Migration} from './Migration';
import {User} from "./User";
import {Action} from "./ActionTypes";

export const Actions: Action[] = [...Migration, ...User];
