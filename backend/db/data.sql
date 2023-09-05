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
    uid character varying(128) NOT NULL,
    email character varying(120),
    provider_id character varying(30)
);


ALTER TABLE public.credentials OWNER TO root;

--
-- Name: invoices; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.invoices (
    id character varying(10) DEFAULT public.generate_unique_short_id() NOT NULL,
    date_due date,
    currency_code character varying(3),
    user_id character varying(128),
    description text,
    price numeric(10,2),
    status public.status_enum,
    first_name character varying(50),
    last_name character varying(50),
    address character varying(128),
    country character varying(50),
    city character varying(50),
    client_email character varying(150),
    zip_code character varying(20)
);


ALTER TABLE public.invoices OWNER TO root;

--
-- Data for Name: credentials; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.credentials (uid, email, provider_id) FROM stdin;
oiwque123124	test@gmail.com	firebase
oiapoke	acc@gmail.com	firebase
sZq0R42xeSgSS4V9yK48GC4l0WD3	vuxgamer@gmail.com	firebase
o3zfqLReWKfMIIJCPlsfML3NqO43	henriqve.dev@gmail.com	firebase
uOrlewIx0HgorQz9osr8FJsGxBv2	gabriel.barreto@fansunite.com	firebase
\.


--
-- Data for Name: invoices; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.invoices (id, date_due, currency_code, user_id, description, price, status, first_name, last_name, address, country, city, client_email, zip_code) FROM stdin;
SD33869	2023-10-10	GBP	oiapoke	Sample invoice 3	500.50	completed	Michael	Johnson	\N	\N	\N	\N	\N
CZ19706	2023-09-15	USD	sZq0R42xeSgSS4V9yK48GC4l0WD3	Sample invoice 1	250.00	paid	John	Doe	\N	\N	\N	\N	\N
XM54699	2023-09-30	EUR	sZq0R42xeSgSS4V9yK48GC4l0WD3	Sample invoice 2	150.75	pending	Jane	Smith	\N	\N	\N	\N	\N
1231214	2023-10-10	usd	sZq0R42xeSgSS4V9yK48GC4l0WD3	test	124124.00	pending	f_test	last_test	\N	\N	\N	\N	\N
SU825509	2023-10-10	usd	sZq0R42xeSgSS4V9yK48GC4l0WD3	test	12.34	completed	f_test2	last_test2	\N	\N	\N	\N	\N
\.


--
-- Name: credentials credentials_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.credentials
    ADD CONSTRAINT credentials_pkey PRIMARY KEY (uid);


--
-- Name: invoices invoices_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT invoices_pkey PRIMARY KEY (id);


--
-- Name: invoices invoices_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT invoices_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.credentials(uid) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

