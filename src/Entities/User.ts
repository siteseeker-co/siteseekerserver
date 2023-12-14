import {Entity, Enum, PrimaryKey, Property} from '@mikro-orm/core';
import debug from 'debug';
import {v4} from 'uuid';

const d = debug('terrene.server.Entities.User');

export enum UserRoleEnum {
	President = 'President',
	Secretary = 'Secretary',
	Explorer = 'Explorer',
}

export type UserEntityConstructor = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	role: UserRoleEnum;
};

@Entity()
export class User {
	@PrimaryKey({type: 'uuid'})
	id = v4();

	@Property({type: 'number', version: true})
	version = 1;

	@Property({type: 'text'})
	firstName: string;

	@Property({type: 'text'})
	lastName: string;

	@Property({type: 'text', unique: true})
	email: string;

	@Property({type: 'text'})
	password: string;

	@Property({type: 'int'})
	score: number;

	@Enum({items: () => UserRoleEnum, type: 'text'})
	role: UserRoleEnum;

	@Property({type: 'date'})
	joined = new Date();

	constructor({firstName, lastName, email, password, role}: UserEntityConstructor) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.role = role;
		this.score = 0;
	}
}
