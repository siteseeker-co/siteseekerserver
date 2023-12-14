import {m20231210} from './m20231210';
interface Migration {
	name: string;
	action: string[];
}

export const Migrations: Migration[] = [m20231210];
