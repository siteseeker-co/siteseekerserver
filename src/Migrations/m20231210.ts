export const m20231210 = {
	name: 'm20231210',
	action: [
		`BEGIN;
		create table "migration" ("id" uuid not null, "name" varchar(255) not null, "index" int not null, "date" timestamptz(0) not null, "success" boolean not null, constraint "migration_pkey" primary key ("id"));
		alter table "migration" add constraint "migration_index_unique" unique ("index");
		
		create table "user" ("id" uuid not null, "version" int not null default 1, "first_name" text not null, "last_name" text not null, "email" text not null, "password" text not null, "score" int not null, "role" text check ("role" in ('President', 'Secretary', 'Explorer')) not null, "joined" timestamptz(0) not null, constraint "user_pkey" primary key ("id"));
		alter table "user" add constraint "user_email_unique" unique ("email");

		COMMIT;
		`
	],
};
