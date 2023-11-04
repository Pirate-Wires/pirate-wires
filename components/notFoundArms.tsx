"use client"
import Image from "next/image";
import React, {useEffect, useState} from "react";
import styles from "@/styles/pages/notFound.module.scss"
import gsap from "gsap"
import isMobile from "ismobilejs";
export default function NotFoundArms({ author }) {

    const [once, setOnce] = useState(false);
    let onceVar = false;
    useEffect(() => {
        if (once || onceVar) {
            return;
        }
        setOnce(true);
        onceVar = true;
        const mobile = isMobile(window.navigator).any;
        if (!mobile) {
            const hitbox = document.getElementById("hitbox")
            const arms = hitbox.querySelectorAll("img")
            const middleWidth = Math.round(window.innerWidth / 2);
            const tl = new gsap.timeline({ paused: true })
            const ease = 0.09

            const lerp = (a, b, n) => (1 - n) * a + n * b;

            tl
                .fromTo(arms[0], { rotationY: 0, z: 50, xPercent: -20 }, { rotationY: 5, z: 0, xPercent: 0, ease: "none", duration: 1, force3D: true })
                .fromTo(arms[1], { rotationY: 0, z: 50, xPercent: 20 }, { rotationY: -5, z: 0, xPercent: 0, ease: "none", duration: 1, force3D: true }, 0)

            let percentThrough = {
                current: 0,
                prev: 0
            }

            hitbox.addEventListener("mousemove", (event) => {
                const dist = Math.abs(Math.abs(event.clientX - middleWidth) - middleWidth)
                percentThrough.current = dist
            })

            const callBack = () => {
                percentThrough.prev = lerp(percentThrough.prev, percentThrough.current, .17)
                const progress = percentThrough.prev / middleWidth

                tl.progress(progress)
                requestAnimationFrame(callBack)
            }
            requestAnimationFrame(callBack)
        }
    });
    return (
        <div className={styles.imagesWrapper} id="hitbox">
            <div className={styles.imageWrapper}>
                <Image src={'/img/handwire1.jpg'}
                       className="object-cover"
                       quality={100}
                       priority
                       fill
                />
            </div>
            <div className={styles.imageWrapper}>
                <Image src={'/img/handwire2.jpg'}
                       className="object-cover"
                       quality={100}
                       priority
                       fill
                />
            </div>
        </div>
    );
}
