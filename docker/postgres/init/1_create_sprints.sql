create table sprints (
    id serial primary key,
    deadline timestamp not null,
    created_at timestamp not null,
    updated_at timestamp not null
);
