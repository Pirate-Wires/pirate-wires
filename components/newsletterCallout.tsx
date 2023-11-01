"use client"
import styles from "./_styles/newsletterCallout.module.scss"
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ScrollBasedAnims } from "@/utils/classes/ScrollBasedAnims";



// const getCustomer = async () => {
//     try {
//         const email = 'joshuavaage@icloud.com';
//         const response = await fetch(`/api/customer-io/route?email=${email}`);

//         if (response.ok) {
//             const data = await response.json();
//             return data;
//         } else {
//             throw new Error('Failed to fetch customer data');
//         }
//     } catch (error) {
//         console.error('Error fetching customer data:', error);
//         return null;
//     }
// };

// console.log(getCustomer());


export default function NewsletterCallout({ newsletterData }) {

    const currentRoute = usePathname();
    const interiorPage = currentRoute === "/newsletters"
    let bound = false
    useEffect(() => {
        if (!bound) {
            const form = document.getElementById("newsletter-form")
            form.addEventListener("submit", (event) => {
                event.preventDefault();
                //
            });
        }
    }, [bound]);
    return (
        <div className={`${styles.newsletterCallout} ${interiorPage ? styles.interiorPage : ""} ptb-40`}>

            <form className={`${styles.inner} c-20`} id="newsletter-form" method="POST" action="">

                <div className={styles.top}>
                    {!interiorPage && <h4>Sign up for our Newsletters</h4>}
                    <div className={`${styles.inputWrapper} inputWrapper`}>
                        <input id="email_input" name="email" type="email" placeholder="Your email here..." />
                        <button type="submit" name="Submit newsletter signup" id="submit">Sign Up</button>
                    </div>
                    <p className={styles.selectedCount}>(<span>0</span>) Newsletters Selected</p>
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
                                <input type="checkbox" className="checkbox" data-listid="X5FG2" id="selected1" name="Selected" />
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
                                <input type="checkbox" className="checkbox" data-listid="X5FG2" id="selected2" name="Selected" />
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
                                <input type="checkbox" className="checkbox" data-listid="X5FG2" id="selected3" name="Selected" />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
