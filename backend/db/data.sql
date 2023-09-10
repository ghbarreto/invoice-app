--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3 (Debian 15.3-1.pgdg120+1)
-- Dumped by pg_dump version 15.3 (Debian 15.3-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: status_enum; Type: TYPE; Schema: public; Owner: root
--

CREATE TYPE public.status_enum AS ENUM (
    'paid',
    'pending',
    'completed'
);


ALTER TYPE public.status_enum OWNER TO root;

--
-- Name: generate_unique_short_id(); Type: FUNCTION; Schema: public; Owner: root
--

CREATE FUNCTION public.generate_unique_short_id() RETURNS character varying
    LANGUAGE plpgsql
    AS $$
DECLARE
    chars VARCHAR := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    new_id VARCHAR;
    prefix VARCHAR := '';
BEGIN
    -- Generate a random prefix with 2 random letters
    prefix := substr(chars, floor(random() * length(chars) + 1)::integer, 1) ||
              substr(chars, floor(random() * length(chars) + 1)::integer, 1);
    
    LOOP
        -- Generate a random 6-digit number with leading zeros
        new_id := prefix || lpad(floor(random() * 1000000)::text, 5, '0');
        
        -- Check if the generated ID is unique
        EXIT WHEN NOT EXISTS (SELECT 1 FROM invoices WHERE id = new_id);
    END LOOP;
    
    RETURN new_id;
END;
$$;


ALTER FUNCTION public.generate_unique_short_id() OWNER TO root;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: credentials; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.credentials (
    id character varying(128) NOT NULL,
    email character varying(120),
    provider_id character varying(30)
);


ALTER TABLE public.credentials OWNER TO root;

--
-- Name: customers; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.customers (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    user_id character varying(128),
    first_name character varying(50),
    last_name character varying(50),
    address character varying(128),
    country character varying(50),
    city character varying(50),
    client_email character varying(150),
    zip_code character varying(20),
    phone character varying(40)
);


ALTER TABLE public.customers OWNER TO root;

--
-- Name: invoice_address; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.invoice_address (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    first_name character varying(50),
    last_name character varying(50),
    address character varying(128),
    country character varying(50),
    city character varying(50),
    client_email character varying(150),
    zip_code character varying(20),
    invoice_id character varying(10),
    user_id character varying(128)
);


ALTER TABLE public.invoice_address OWNER TO root;

--
-- Name: invoice_items; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.invoice_items (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    item_id uuid,
    invoice_id character varying(10),
    item_amount integer
);


ALTER TABLE public.invoice_items OWNER TO root;

--
-- Name: invoices; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.invoices (
    id character varying(10) DEFAULT public.generate_unique_short_id() NOT NULL,
    date_due timestamp with time zone,
    currency_code character varying(3),
    user_id character varying(128),
    description text,
    price numeric(10,2),
    status public.status_enum,
    is_visible boolean DEFAULT true
);


ALTER TABLE public.invoices OWNER TO root;

--
-- Name: items; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.items (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(20),
    price numeric(10,2),
    stock_amount integer,
    user_id character varying(128)
);


ALTER TABLE public.items OWNER TO root;

--
-- Data for Name: credentials; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.credentials (id, email, provider_id) FROM stdin;
oiwque123124	test@gmail.com	firebase
oiapoke	acc@gmail.com	firebase
sZq0R42xeSgSS4V9yK48GC4l0WD3	vuxgamer@gmail.com	firebase
o3zfqLReWKfMIIJCPlsfML3NqO43	henriqve.dev@gmail.com	firebase
uOrlewIx0HgorQz9osr8FJsGxBv2	gabriel.barreto@fansunite.com	firebase
T3Z9Js9MzSWepbJW1DAdoksuXMT2	ighbarreto@gmail.com	firebase
\.


--
-- Data for Name: customers; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.customers (id, user_id, first_name, last_name, address, country, city, client_email, zip_code, phone) FROM stdin;
f4ccf64b-f92a-4ec1-8121-41a22522fae6	sZq0R42xeSgSS4V9yK48GC4l0WD3	John	Doe	123 Main St	Indonesia\n	Jakharta	john.doe@example.com	10001	6042422342
864bb837-f463-4da4-9926-aee922765953	sZq0R42xeSgSS4V9yK48GC4l0WD3	Jane	Smith	456 Elm St	Canada	Toronto	jane.smith@example.com	90001	6042326542
c37a5f6e-2d4f-405a-9afd-74ebce6ee859	sZq0R42xeSgSS4V9yK48GC4l0WD3	David	Johnson	789 Oak St	Portugal	Lisbon	david.johnson@example.com	60601	7784787815
87881aa6-e7dc-4c2f-b409-d9ba1b6c998b	sZq0R42xeSgSS4V9yK48GC4l0WD3	Gabriel	last name	address	country	city	\N	zip code	phone
\.


--
-- Data for Name: invoice_address; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.invoice_address (id, first_name, last_name, address, country, city, client_email, zip_code, invoice_id, user_id) FROM stdin;
769fc125-d81c-45ee-9175-0cd5cf813580	Test	Last_test	this is the address	Brazil	Sao Paulo	test@gmail.com	4420-5223	FA56939	sZq0R42xeSgSS4V9yK48GC4l0WD3
91cd37af-7a2e-4d4f-a574-cb3fcac8708d	Test	Last_test	this is the address	Brazil	Sao Paulo	test@gmail.com	4420-5223	SS48389	sZq0R42xeSgSS4V9yK48GC4l0WD3
7507d428-5b02-4796-a809-0353e0045223	Test	Last_test	this is the address	Brazil	Sao Paulo	test@gmail.com	4420-5223	NR52650	sZq0R42xeSgSS4V9yK48GC4l0WD3
360419ea-15aa-4070-a5b9-98e1012c1474	Test	Last_test	this is the address	Brazil	Sao Paulo	test@gmail.com	4420-5223	JC33159	sZq0R42xeSgSS4V9yK48GC4l0WD3
f259b5b5-621b-4d34-8c5f-1a2d5900df69	Test	Last_test	this is the address	Brazil	Sao Paulo	test@gmail.com	4420-5223	DP70661	sZq0R42xeSgSS4V9yK48GC4l0WD3
87692199-5a21-477b-8b62-baa658ba8fb4	Test	Last_test	this is the address	Brazil	Sao Paulo	test@gmail.com	4420-5223	AA41388	sZq0R42xeSgSS4V9yK48GC4l0WD3
cbcc21ba-f2d2-4c4c-99c2-68a6c3de2020	Test	Last_test	this is the address	Brazil	Sao Paulo	test@gmail.com	4420-5223	TH20751	sZq0R42xeSgSS4V9yK48GC4l0WD3
16032f92-0b1d-4c3d-adbc-dc4dfd47c0e2	TesIT WORKED	Last IT WORKED	this is the address IT WORKED	Br IT WORKED	Sao IT WORKED	ITWORKED@gmail.com	4420-IT WORKED	HJ22423	sZq0R42xeSgSS4V9yK48GC4l0WD3
\.


--
-- Data for Name: invoice_items; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.invoice_items (id, item_id, invoice_id, item_amount) FROM stdin;
0aaed4e5-1742-4c87-8ea5-3c93b2b90d52	b9dc438a-d36d-463f-8f88-c0e25f2eb970	FA56939	4
a9bb917d-2afb-4fba-a76e-7b10f391cf8a	b2be4c29-6ae7-490e-b893-41d3040de92d	FA56939	4
71b7035f-5abe-4d7f-9031-28e7ca8d08ef	92f6232c-2d24-4860-bbdb-90c8d0d30fe4	FA56939	4
fdf1a5b8-e261-413a-9716-593ca2680bda	b9dc438a-d36d-463f-8f88-c0e25f2eb970	NR52650	1
b797c695-a3ac-40c2-ac68-b47f410c3cef	b2be4c29-6ae7-490e-b893-41d3040de92d	NR52650	2
5fc3ee99-ee97-4021-b05c-63ed0383ac12	92f6232c-2d24-4860-bbdb-90c8d0d30fe4	NR52650	3
c3c6230a-e3c7-4ebf-8f9a-6614a295ea0f	b9dc438a-d36d-463f-8f88-c0e25f2eb970	HJ22423	22424
75bec014-da1c-483c-9854-9c73da77d667	b2be4c29-6ae7-490e-b893-41d3040de92d	HJ22423	2522222
c14b3f43-93a8-4216-b61d-8662758a4fe6	92f6232c-2d24-4860-bbdb-90c8d0d30fe4	HJ22423	32323
\.


--
-- Data for Name: invoices; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.invoices (id, date_due, currency_code, user_id, description, price, status, is_visible) FROM stdin;
SS48389	2023-09-07 19:38:21.178+00	BRL	sZq0R42xeSgSS4V9yK48GC4l0WD3	this is the description	150.20	pending	t
NR52650	2023-09-07 19:38:21.178+00	BRL	sZq0R42xeSgSS4V9yK48GC4l0WD3	this is the description	150.20	pending	t
FA56939	2023-09-07 19:38:21.178+00	BRL	sZq0R42xeSgSS4V9yK48GC4l0WD3	this is the description	150.20	pending	t
JC33159	2023-09-07 19:38:21.178+00	BRL	sZq0R42xeSgSS4V9yK48GC4l0WD3	this is the description	150.20	pending	t
DP70661	2023-09-07 19:38:21.178+00	BRL	sZq0R42xeSgSS4V9yK48GC4l0WD3	this is the description	150.20	pending	t
AA41388	2023-09-07 19:38:21.178+00	BRL	sZq0R42xeSgSS4V9yK48GC4l0WD3	this is the description	150.20	pending	t
TH20751	2023-09-07 19:38:21.178+00	BRL	sZq0R42xeSgSS4V9yK48GC4l0WD3	this is the description	150.20	pending	t
HJ22423	2024-09-07 19:38:21.178+00	Bdw	sZq0R42xeSgSS4V9yK48GC4l0WD3	this is the description ITwwwww WORKED	1520.20	completed	t
\.


--
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.items (id, name, price, stock_amount, user_id) FROM stdin;
b9dc438a-d36d-463f-8f88-c0e25f2eb970	Item 1	19.99	100	sZq0R42xeSgSS4V9yK48GC4l0WD3
b2be4c29-6ae7-490e-b893-41d3040de92d	Item 2	29.99	75	sZq0R42xeSgSS4V9yK48GC4l0WD3
92f6232c-2d24-4860-bbdb-90c8d0d30fe4	Item 3	9.99	50	sZq0R42xeSgSS4V9yK48GC4l0WD3
\.


--
-- Name: credentials credentials_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT credentials_pkey PRIMARY KEY (id);


--
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);


--
-- Name: invoice_address invoice_address_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.invoice_address
    ADD CONSTRAINT invoice_address_pkey PRIMARY KEY (id);


--
-- Name: invoice_items invoice_items_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.invoice_items
    ADD CONSTRAINT invoice_items_pkey PRIMARY KEY (id);


--
-- Name: invoices invoices_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT invoices_pkey PRIMARY KEY (id);


--
-- Name: items items_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);


--
-- Name: customers customers_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.credentials(id);


--
-- Name: invoice_address invoice_address_invoice_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.invoice_address
    ADD CONSTRAINT invoice_address_invoice_id_fkey FOREIGN KEY (invoice_id) REFERENCES public.invoices(id) ON DELETE CASCADE;


--
-- Name: invoice_address invoice_address_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.invoice_address
    ADD CONSTRAINT invoice_address_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.credentials(id);


--
-- Name: invoice_items invoice_items_invoice_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.invoice_items
    ADD CONSTRAINT invoice_items_invoice_id_fkey FOREIGN KEY (invoice_id) REFERENCES public.invoices(id);


--
-- Name: invoice_items invoice_items_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.invoice_items
    ADD CONSTRAINT invoice_items_item_id_fkey FOREIGN KEY (item_id) REFERENCES public.items(id);


--
-- Name: invoices invoices_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT invoices_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.credentials(id) ON DELETE CASCADE;


--
-- Name: items items_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.credentials(id);


--
-- PostgreSQL database dump complete
--

