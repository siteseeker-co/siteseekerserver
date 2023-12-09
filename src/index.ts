import {MikroORM} from '@mikro-orm/core';
import cors from 'cors';
import debug from 'debug';
import Express from 'express';
import {environment} from './core/environment';
import {mikroOrmConfig} from './core/mikro-orm.config';

const d = debug('terrene.server');

MikroORM.init(mikroOrmConfig()).then(orm => {
	const express = Express();

	console.log("test");

	express.use(cors());
	express.use(Express.json());

	express.use(Express.static('assets'));

	express.listen(environment.serverPort, () => {
		d(`⚡️[server]: Server is running at ${environment.dbDomain}:${environment.serverPort}`);
	});

	const em = orm.em.fork();

	express.get('/', (req, res) => res.send('Site Seeker Server'));
});
