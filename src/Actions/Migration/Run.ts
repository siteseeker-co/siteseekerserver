import type {EntityManager} from '@mikro-orm/core';
import {User, UserRoleEnum} from '../../Entities/User';
import {Migration} from '../../Entities/Migration';
import {Migrations} from '../../Migrations';
import {ActionTypeEnum} from "../ActionTypes";

export const Run = {
	path: 'migrations/run',
	type: ActionTypeEnum.put,
	action: async (params: unknown, authorization: string, em: EntityManager): Promise<void> => {
		const user = await em.findOne(User, {id: authorization});
		if (!user) throw new Error('bad authorization');

		if (user.role === UserRoleEnum.President || user.role === UserRoleEnum.Secretary) {
			const sqlConnection = em.getConnection();

			Migrations.map(async (migration, index) => {
				const duplicateMigration = await em.find(Migration, {name: migration.name});
				if (duplicateMigration.length === 0) {
					migration.action.map(async action => {
						await sqlConnection.execute(action);

						return true;
					});

					const mig = new Migration({
						name: migration.name,
						success: true,
						index,
					});

					em.persist(mig);
				}
			});
		}
	},
};
