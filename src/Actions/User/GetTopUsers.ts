import type {EntityManager} from '@mikro-orm/core';
import {User} from '../../Entities/User';
import {ActionTypeEnum} from "../ActionTypes";

export const GetTopUsers = {
	path: 'users/get-top-users',
	type: ActionTypeEnum.post,
	action: async (params: unknown, authorization: unknown, em: EntityManager): Promise<User[]> => {
		return em.find(User, {}, {orderBy: {score: 'desc'}})
	},
};
