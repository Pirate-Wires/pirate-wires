"use client"
import {useState } from 'react';
import { usePathname } from "next/navigation";

import styles from "./_styles/newsletterCallout.module.scss"

export default function NewsletterCallout({ newsletterData }) {
    const currentRoute = usePathname();
    const interiorPage = currentRoute === "/newsletters";
    const [selectedNewsLetters, setSelectedNewsLetters] = useState<String[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const email = event.target.email.value;

        if(!email) {
            setIsSuccess(false);
            setError('Email is required');
            return;
        }
        if(!selectedNewsLetters.length) {
            setIsSuccess(false);
            setError('Newsletter selection is required');
            return;
        }

        setIsLoading(true);
        setIsSuccess(false);

        try {
            const response = await fetch('/api/customer-io', {
                method: 'PUT',
                body: JSON.stringify({
                    email,
                    subscription: selectedNewsLetters,
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if(data.success) {
              setIsSuccess(true);

              event.target.email.value = '';
              setSelectedNewsLetters([]);
            }

            setIsLoading(false);
            setError('');
        } catch (error) {
            console.error('There was an error!', error);
            setIsLoading(false);
            setError('');
        }
    }

    const handleSelect = (event) => {
        const name = event.target.name;
        setSelectedNewsLetters(selectedNewsLetters.indexOf(name) > -1 ?
            selectedNewsLetters.filter(item => item !== name) :
            [...selectedNewsLetters, name]);
    }

    return (
        <div className={`${styles.newsletterCallout} ${interiorPage ? styles.interiorPage : ""} ptb-40`}>

            <form className={`${styles.inner} c-20`} id="newsletter-form" method="POST" action="" onSubmit={handleSubmit}>

                <div className={styles.top}>
                    {!interiorPage && <h4>Sign up for our Newsletters</h4>}
                    <div className={`${styles.inputWrapper} inputWrapper`}>
                        <input id="email_input" name="email" type="email" placeholder="Your email here..." />
                        <button type="submit" name="Submit newsletter signup" id="submit" disabled={isLoading}>{isLoading ? 'Loading...' : 'Sign Up'}</button>
                    </div>
                    {isSuccess &&
                        <p className={styles.successMessage}>Thanks for subscribing!</p>
                    }
                    {!!error &&
                        <p className={styles.errorMessage}>{error}</p>
                    }
                    <p className={styles.selectedCount}>(<span>{selectedNewsLetters.length}</span>) Newsletters Selected</p>
                </div>

                <div className={styles.bottom}>
                    <div className={`${styles.tile} ${styles.pirateWires}`}>
                        <p className={styles.eyebrow}>{newsletterData.pirate_wires_frequency}</p>
                        <p className={styles.title}>Pirate Wires</p>
                        <p className={`${styles.subtitle} caslon-med`}>Technology, Politics, Culture.</p>
                        <p className={styles.description}>Sign up for the original Pirate Wires newsletter. You get: a bi-weekly deep dive from Editor-in-Chief Mike Solana, an occasional piece from our team of writers, and a weekly feature from the internet’s top creative talent. Sign up, or die.</p>
                        <div className={styles.tileBottom}>
                            <p>Read latest newsletter</p>
                            <div className={styles.checkboxWrapper}>
                                <label htmlFor="selected1">Selected</label>
                                <input type="checkbox" className="checkbox" data-listid="X5FG2" id="selected1" name="Wires" onChange={handleSelect} checked={selectedNewsLetters.indexOf('Wires') > -1}/>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.tile} ${styles.whitePill}`}>
                        <p className={styles.eyebrow}>{newsletterData.white_pill_frequency}</p>
                        <p className={styles.title}>The White Pill</p>
                        <p className={`${styles.subtitle} caslon-med`}>Science, Progress, Optimism, Innovation.</p>
                        <p className={styles.description}>Sign up for the White Pill, a weekly newsletter — and occasional stories — covering the most inspiring, fascinating, and evocative developments in technology, from engineering to medicine, and science, from physics and astronomy to space and beyond.</p>
                        <div className={styles.tileBottom}>
                            <p>Read latest newsletter</p>
                            <div className={styles.checkboxWrapper}>
                                <label htmlFor="selected2">Selected</label>
                                <input type="checkbox" className="checkbox" data-listid="X5FG2" id="selected2" name="The White Phill" onChange={handleSelect} checked={selectedNewsLetters.indexOf('The White Phill') > -1} />
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.tile} ${styles.industry}`}>
                        <p className={styles.eyebrow}>{newsletterData.industry_frequency}</p>
                        <p className={styles.title}>The Industry</p>
                        <p className={`${styles.subtitle} caslon-med`}>Technology, Business.</p>
                        <p className={styles.description}>Sign up for the Industry, a concentrated technology / business newsletter from Pirate Wires, including: a weekly blast of all the major industry stories worth following, interviews with industry leaders, and analysis from professionals who actually know what they’re talking about. We’re glad you’ve found us. Now let’s all be rich and powerful.</p>
                        <div className={styles.tileBottom}>
                            <p>Read latest newsletter</p>
                            <div className={styles.checkboxWrapper}>
                                <label htmlFor="selected3">Selected</label>
                                <input type="checkbox" className="checkbox" data-listid="X5FG2" id="selected3" name="The Industry" onChange={handleSelect} checked={selectedNewsLetters.indexOf('The Industry') > -1} />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
