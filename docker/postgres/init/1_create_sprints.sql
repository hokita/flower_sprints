create table sprints (
    id serial primary key,
    deadline date not null,
    created_at timestamp not null,
    updated_at timestamp not null
);
