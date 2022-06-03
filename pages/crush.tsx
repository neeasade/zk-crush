import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import * as React from "react";
import sha256 from "crypto-js/sha256";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";

const Home: NextPage = () => {
    const router = useRouter();
    const [crushName, setCrushName] = React.useState<string>("");
    const [crushHash, setCrushHash] = React.useState<string>("");

    const { hash, name } = router.query;

    const checkIfCrush = React.useCallback(() => {
        const newCrushHash = sha256(crushName).toString();
        setCrushHash(newCrushHash);
    }, [crushName]);

    const isMatch = React.useMemo(() => hash === crushHash, [crushHash]);
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>zk-Crush ❤️ </h1>

                <p>
                    <i>
                        Tell your crush you like them with{" "}
                        <a href="https://en.wikipedia.org/wiki/Zero_knowledge#:~:text=Zero%20knowledge%20may%20mean%3A,the%20veracity%20of%20the%20statement">
                            zero-knowledge
                        </a>
                    </i>
                </p>

                <div className="py-4"></div>

                <h3 className="font-bold">How this works</h3>
                <p>
                    Hello! You <strong>may be {name}&apos;s crush!</strong> Enter your name below to see if the sha256
                    hash of your name matches that of their crush! Note, make sure this provided URL was provided by{" "}
                    {name} so that you can trust it.
                </p>
                <div className="py-3"></div>

                <h3 className="font-bold">Hash of {name}&apos;s crush:</h3>

                <p className="text-center" style={{ wordBreak: "break-all" }}>
                    {hash}
                </p>

                <div className="py-3"></div>
                <div className={styles.containerPadding}>
                    <p>Your name (first and last)</p>
                    <div className="py-2"></div>
                    <input
                        placeholder="Alice Jones"
                        value={crushName}
                        onChange={(evt) => setCrushName(evt.target.value)}
                    />
                    <div className="py-4"></div>
                    <button onClick={checkIfCrush}>Check match</button>
                    <div className="py-4"></div>
                    {crushHash && (
                        <p className="text-center">
                            Your hash is {crushHash},{" "}
                            <span style={{ color: crushHash === hash ? "#0bc608" : "red" }}>
                                it&apos;s a {isMatch ? "match!" : "not a match :("}
                            </span>
                        </p>
                    )}
                </div>
                <div className="py-4"></div>
                <footer className={styles.footer}>
                    Built by <a href="https://twitter.com/amirbolous">Amir</a> and{" "}
                    <a href="https://github.com/amirgamil/zk-crush">open source</a> on Github
                </footer>
                <Toaster />
            </main>
        </div>
    );
};

export default Home;
