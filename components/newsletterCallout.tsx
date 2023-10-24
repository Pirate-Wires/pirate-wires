"use client"
import styles from "./_styles/newsletterCallout.module.scss"
import {usePathname} from "next/navigation";
export default function NewsletterCallout() {
    const currentRoute = usePathname();
    const interiorPage = currentRoute === "/newsletters"
    return (
        <div className={`${styles.newsletterCallout} ${interiorPage ? styles.interiorPage : ""} ptb-40`}>
            <form className={`${styles.inner} c-20`}>
                <div className={styles.top}>
                    {!interiorPage && <h4>Sign up for our Newsletters</h4>}
                    <div className={`${styles.inputWrapper} inputWrapper`}>
                        <input type="email" id="newsletter-email" placeholder="Your email here..." />
                        <button type="submit" name="Submit newsletter signup">Sign Up</button>
                    </div>
                    <p className={styles.selectedCount}>(<span>0</span>) Newsletters Selected</p>
                </div>
                <div className={styles.bottom}>
                    <div className={`${styles.tile}`}>
                        <p className={styles.eyebrow}>Comes out 2 times a week</p>
                        <p className={styles.title}>Pirate Wires</p>
                        <p className={`${styles.subtitle} caslon-med`}>Technology, Politics, Culture.</p>
                        <p className={styles.description}>Sign up for the original Pirate Wires newsletter. You get: a bi-weekly deep dive from Editor-in-Chief Mike Solana, an occasional piece from our team of writers, and a weekly feature from the internet’s top creative talent. Sign up, or die.</p>
                        <div className={styles.tileBottom}>
                            <p>Read latest newsletter</p>
                            <div className={styles.checkboxWrapper}>
                                <label htmlFor="selected1">Selected</label>
                                <input type="checkbox" id="selected1" name="Selected" />
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.tile} ${styles.whitePill}`}>
                        <p className={styles.eyebrow}>Comes out every Wednesday</p>
                        <p className={styles.title}>The White Pill</p>
                        <p className={`${styles.subtitle} caslon-med`}>Science, Progress, Optimism, Innovation.</p>
                        <p className={styles.description}>Sign up for the White Pill, a weekly newsletter — and occasional stories — covering the most inspiring, fascinating, and evocative developments in technology, from engineering to medicine, and science, from physics and astronomy to space and beyond.</p>
                        <div className={styles.tileBottom}>
                            <p>Read latest newsletter</p>
                            <div className={styles.checkboxWrapper}>
                                <label htmlFor="selected2">Selected</label>
                                <input type="checkbox" id="selected2" name="Selected" />
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.tile} ${styles.industry}`}>
                        <p className={styles.eyebrow}>Comes out every Monday</p>
                        <p className={styles.title}>The Industry</p>
                        <p className={`${styles.subtitle} caslon-med`}>Technology, Business.</p>
                        <p className={styles.description}>Sign up for the Industry, a concentrated technology / business newsletter from Pirate Wires, including: a weekly blast of all the major industry stories worth following, interviews with industry leaders, and analysis from professionals who actually know what they’re talking about. We’re glad you’ve found us. Now let’s all be rich and powerful.</p>
                        <div className={styles.tileBottom}>
                            <p>Read latest newsletter</p>
                            <div className={styles.checkboxWrapper}>
                                <label htmlFor="selected3">Selected</label>
                                <input type="checkbox" id="selected3" name="Selected" />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
