import type { NextPage } from "next";
import Head from "next/head";
import Main from "../components/Main";

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>One Weather</title>
				<meta
					name="description"
					content="weather app"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Main/>
		</>
	);
};

export default Home;
