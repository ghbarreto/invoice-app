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
-- Name: generate_short_id(integer); Type: FUNCTION; Schema: public; Owner: root
--

CREATE FUNCTION public.generate_short_id(length integer) RETURNS character varying
    LANGUAGE plpgsql
    AS $$
DECLARE
    chars varchar := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    result varchar := '';
BEGIN
    FOR i IN 1..length LOOP
        result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
    END LOOP;
    RETURN result;
END;
$$;


ALTER FUNCTION public.generate_short_id(length integer) OWNER TO root;

--
-- Name: generate_unique_short_id(character varying, integer); Type: FUNCTION; Schema: public; Owner: root
--

CREATE FUNCTION public.generate_unique_short_id(prefix character varying, length integer) RETURNS character varying
    LANGUAGE plpgsql
    AS $$
DECLARE
    chars varchar := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    new_id varchar;
BEGIN
    LOOP
        new_id := prefix || lpad(CAST(floor(random() * power(10, length - length(prefix) + 1)) AS text), length - length(prefix) + 1, '0');
        
        -- Check if the generated ID is unique
        EXIT WHEN NOT EXISTS (SELECT 1 FROM invoices WHERE invoice_id = new_id);
    END LOOP;
    
    RETURN new_id;
END;
$$;


ALTER FUNCTION public.generate_unique_short_id(prefix character varying, length integer) OWNER TO root;

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
    invoice_id character varying(10) NOT NULL,
    date_due date,
    currency_code character varying(3),
    user_id character varying(128),
    description text,
    price numeric(10,2),
    status public.status_enum,
    first_name character varying(50),
    last_name character varying(50)
);


ALTER TABLE public.invoices OWNER TO root;

--
-- Data for Name: credentials; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.credentials (uid, email, provider_id) FROM stdin;
oiwque123124	test@gmail.com	firebase
oiapoke	acc@gmail.com	firebase
\.


--
-- Data for Name: invoices; Type: TABLE DATA; Schema: public; Owner: root
--

COPY public.invoices (invoice_id, date_due, currency_code, user_id, description, price, status, first_name, last_name) FROM stdin;
CZ19706	2023-09-15	USD	oiwque123124	Sample invoice 1	250.00	paid	John	Doe
XM54699	2023-09-30	EUR	oiwque123124	Sample invoice 2	150.75	pending	Jane	Smith
SD33869	2023-10-10	GBP	oiapoke	Sample invoice 3	500.50	completed	Michael	Johnson
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
    ADD CONSTRAINT invoices_pkey PRIMARY KEY (invoice_id);


--
-- Name: invoices invoices_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT invoices_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.credentials(uid) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

