-- Table: public.credentials

-- DROP TABLE public.credentials;

CREATE TABLE public.credentials
(
    id integer NOT NULL DEFAULT nextval('credentials_id_seq'::regclass),
    user_id text COLLATE pg_catalog."default",
    app text COLLATE pg_catalog."default",
    login text COLLATE pg_catalog."default",
    key text COLLATE pg_catalog."default",
    "altLogin" character varying(100) COLLATE pg_catalog."default",
    "createdAt" date,
    "updatedAt" date,
    CONSTRAINT id PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE public.credentials
    OWNER to postgres;
