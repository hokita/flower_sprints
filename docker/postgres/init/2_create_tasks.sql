create table tasks (
    id serial primary key,
    sprint_id bigint references sprints(id) not null,
    done boolean not null,
    created_at timestamp not null,
    updated_at timestamp not null
);
