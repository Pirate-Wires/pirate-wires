import Link from "next/link";
import PostList from "@/components/postlist";
import Featured from "@/components/featured";
import styles from "../../../styles/pages/home.module.scss"
import LatestWriters from "@/components/latestWriters";
import PodcastCallout from "@/components/podcastCallout";
import NewsletterCallout from "@/components/newsletterCallout";
import {getNewsletterData} from "@/lib/sanity/client";

export default async function DefaultHome({ pageData, globalFields }) {
  const newsletterData = await getNewsletterData()
  const wirePosts = pageData.featured_posts
  const whitePillPosts = pageData.featured_posts_white_pill
  const industryPosts = pageData.featured_posts_industry
  console.log(pageData.latest_writers)
  return (
    <>
      <div className={`${styles.hero} c-20`}>
        <svg viewBox="0 0 1400 291" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M83.237 0H0V290.655H44.1233V158.96H83.237C101.638 158.96 116.089 144.123 116.089 126.493V33.237C115.992 14.4509 101.541 0 83.237 0ZM72.2543 127.36C72.2543 130.925 70.7129 134.393 67.5337 136.705L45.6647 153.083C44.894 153.468 44.1233 153.083 44.1233 152.312V6.6474C44.1233 5.87669 44.894 5.49133 45.6647 5.87669L67.5337 21.4836C70.6166 23.7958 72.2543 27.3603 72.2543 31.2139V127.36Z" fill="#E3E3E3"/>
          <path d="M133.622 0V290.655H177.746V0H133.622Z" fill="#E3E3E3"/>
          <path d="M311.753 125.434V33.6224C311.753 15.2216 296.532 0 277.36 0H195.279V290.655H239.884V159.345H266.474V290.559H310.597V185.164C310.597 177.746 306.262 171.098 299.615 167.63L283.237 159.056C299.229 156.262 311.753 142.197 311.753 125.434ZM267.245 128.516C267.245 131.985 265.703 135.549 262.524 137.861L241.04 153.468C240.655 153.854 239.884 153.468 239.884 152.697V6.6474C239.884 5.87669 240.655 5.49133 241.04 5.87669L262.524 22.2543C265.607 24.5665 267.245 28.131 267.245 31.5992V128.516Z" fill="#E3E3E3"/>
          <path d="M412.524 0H329.287V290.655H373.41V159.345H401.156V290.559H444.894V32.8516C444.99 14.8362 430.54 0 412.524 0ZM401.156 128.516C401.156 131.985 399.615 135.549 396.435 137.861L374.566 153.854C374.181 154.239 373.41 153.854 373.41 153.083V6.6474C373.41 5.87669 374.181 5.49133 374.566 5.87669L396.435 21.869C399.518 24.1811 401.156 31.5992 401.156 35.1638V128.516Z" fill="#E3E3E3"/>
          <path d="M458.574 0V40.2697H528.516C529.287 40.2697 529.672 40.6551 529.672 41.0405C529.672 41.4258 529.287 41.8112 528.902 42.1965L489.788 62.1387L493.738 290.655H538.632V40.2697H572.254V0H458.574Z" fill="#E3E3E3"/>
          <path d="M631.31 5.87669L649.326 19.9422C652.023 22.2543 654.046 25.4335 654.046 29.2871L654.432 78.131L697.013 60.1156V16.763C697.013 7.41811 689.595 0 680.636 0H586.127V290.655H680.636C689.595 290.655 697.013 283.237 697.013 273.892V230.54L654.432 212.139L654.046 261.368C654.046 265.222 652.119 268.401 649.326 270.713L631.31 284.778C630.539 285.164 630.154 284.778 630.154 284.008V155.106H658.671V126.204L631.31 147.688C630.539 148.073 630.154 148.073 630.154 147.302V6.6474C630.154 5.87669 630.539 5.49133 631.31 5.87669Z" fill="#E3E3E3"/>
          <path d="M965.607 0V290.655H1009.73V0H965.607Z" fill="#E3E3E3"/>
          <path d="M1143.74 125.434V33.6224C1143.74 15.2216 1128.52 0 1109.34 0H1027.26V290.655H1071.77V159.345H1098.36V290.559H1142.49V185.164C1142.49 177.746 1138.15 171.098 1131.5 167.63L1115.13 159.056C1131.21 156.262 1143.74 142.197 1143.74 125.434ZM1099.13 128.516C1099.13 131.985 1097.59 135.549 1094.41 137.861L1072.93 153.468C1072.54 153.854 1071.77 153.468 1071.77 152.697V6.6474C1071.77 5.87669 1072.54 5.49133 1072.93 5.87669L1094.41 22.2543C1097.5 24.5665 1099.13 28.131 1099.13 31.5992V128.516Z" fill="#E3E3E3"/>
          <path d="M1206.55 5.87669L1224.57 19.9422C1227.26 22.2543 1229.29 25.4335 1229.29 29.2871L1229.67 78.131L1272.25 60.1156V16.763C1272.25 7.41811 1264.84 0 1255.88 0H1161.37V290.655H1255.88C1264.84 290.655 1272.25 283.237 1272.25 273.892V230.54L1229.67 212.139L1229.29 261.368C1229.29 265.222 1227.36 268.401 1224.57 270.713L1206.55 284.778C1205.78 285.164 1205.39 284.778 1205.39 284.008V147.688C1205.39 146.917 1205.78 147.302 1206.55 147.302L1233.53 168.786V139.884H1205.39V6.6474C1205.39 5.87669 1205.78 5.49133 1206.55 5.87669Z" fill="#E3E3E3"/>
          <path d="M1333.14 5.87669L1352.31 19.9422C1355.39 22.2543 1357.03 25.8189 1357.03 29.2871L1357.8 78.131L1400 59.7303V17.1484C1400 7.80347 1392.2 0 1382.85 0H1304.72C1292.2 0 1287.19 10.1156 1287.19 19.9422V42.9672C1287.19 53.4682 1287.19 60.8863 1287.57 66.763C1287.57 91.3295 1295.76 115.222 1310.98 134.778L1311.37 135.164L1337.19 171.484C1353.56 192.197 1355.59 198.844 1355.59 219.942V284.393C1355.59 284.778 1354.82 285.164 1354.43 284.778L1336.03 274.277C1332.56 271.965 1330.15 268.401 1330.15 264.162L1329.77 212.62L1287.57 230.636V273.603C1287.57 282.948 1295.38 290.751 1304.72 290.751H1382.47C1389.11 290.751 1394.22 287.283 1397.3 282.563C1399.23 278.227 1399.23 282.177 1399.61 195.472C1398.07 175.915 1392.97 162.62 1378.13 142.678L1349.61 106.358C1336.71 89.9807 1332.37 77.0713 1332.08 64.1618V6.6474C1331.98 5.87669 1332.76 5.49133 1333.14 5.87669Z" fill="#E3E3E3"/>
          <path d="M947.977 0.674377V274.085C947.977 283.237 940.559 290.751 931.31 290.751H902.12L902.023 290.848H770.713C761.657 290.848 754.239 283.526 754.239 274.374V0.674377H800.193V261.561C800.193 263.873 801.156 265.992 802.794 267.534L827.746 290.559V0.674377H873.699V260.983C873.699 263.295 874.663 265.414 876.301 267.052L902.12 290.751V0.674377H947.977Z" fill="#E3E3E3"/>
        </svg>
      </div>

      <div className="theme-color pt-40 pb-20">
        <Featured post={wirePosts[0]} includeTop={false} pathPrefix="" />
        {wirePosts && (
          <div className="postGrid pirate-wires c-20">
            {wirePosts.slice(1, 4).map(post => (
              // @ts-ignore
              <PostList
                key={post._id}
                post={post}
                aspect="landscape"
                preloadImage={true}
              />
            ))}

            <Link
              href={`/wires`} className="pubLink hasGoIcon mtb-20">
              <h2>Dive into Tech, Politics & Culture.</h2>
              <div className="goIconWrapper caslon-reg">
                Dive into it
                <div className="goIcon">
                  <div className="leftHalf"></div>
                  <div className="rightHalf"></div>
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.17157 0.46444L9.35355 3.64642C9.54882 3.84168 9.54882 4.15827 9.35355 4.35353L6.17157 7.53551C5.97631 7.73077 5.65973 7.73077 5.46447 7.53551C5.2692 7.34025 5.2692 7.02366 5.46447 6.8284L7.79289 4.49997L0.5 4.49997L0.5 3.49997L7.79289 3.49997L5.46447 1.17155C5.2692 0.976285 5.2692 0.659702 5.46447 0.46444C5.65973 0.269178 5.97631 0.269178 6.17157 0.46444Z"/>
                  </svg>
                </div>
              </div>
            </Link>

            {wirePosts.slice(4, 6).map(post => (
              // @ts-ignore
              <PostList
                key={post._id}
                post={post}
                aspect="landscape"
                preloadImage={true}
              />
            ))}
          </div>
        )}
      </div>

      <LatestWriters latestAuthors={pageData.latest_writers} />

      <PodcastCallout videoLink={pageData.podcastCalloutVid} />

      <NewsletterCallout newsletterData={newsletterData} />

      {whitePillPosts && (
        <div className="theme-color pt-40 pb-20 white-pill">
          <div className="featuredPostsTop pb-20 c-20">
            <svg viewBox="0 0 196 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M51.2926 26.9852L46.6176 0H51.8992L53.2603 9.52767C53.6184 12.2115 53.8258 14.9133 53.8817 17.6203H55.08C55.08 15.9929 55.3167 13.0636 55.6866 9.82356L56.8258 0H62.7436L63.9567 9.82356C64.3266 13.0636 64.5633 15.9929 64.5781 17.6203H65.7617C65.8327 14.914 66.0401 12.2131 66.383 9.52767L67.6258 0H72.9666L68.2767 26.9852H62.3589L61.1754 18.6707C60.7422 15.7877 60.4607 12.884 60.3321 9.97151H59.1781C59.0583 12.8846 58.7768 15.7888 58.3348 18.6707L57.1513 26.9852H51.2926Z" fill="#060606"/>
              <path d="M74.52 26.9852V0H79.4318V10.0455H86.1633V0H91.0751V26.9852H86.1633V16.1852H79.4022V26.9852H74.52Z" fill="#060606"/>
              <path d="M94.4926 26.9852V0H99.3896V26.9852H94.4926Z" fill="#060606"/>
              <path d="M106.521 26.9852V5.59233H101.18V0H116.877V5.60712H111.492V27H106.521V26.9852Z" fill="#060606"/>
              <path d="M118.667 26.9852V0H132.293V5.60712H123.416V10.6521H131.671V16.1556H123.534V21.4373H132.411V26.9852H118.667Z" fill="#060606"/>
              <path d="M140.814 26.9852V0H150.253C154.041 0 157.073 2.9589 157.073 8.87671C157.073 14.7945 154.026 17.7534 150.268 17.7534H145.682V27L140.814 26.9852ZM145.682 12.383H149.706C151.304 12.383 151.762 11.9244 151.762 8.9063C151.762 5.88822 151.304 5.48877 149.706 5.48877H145.682V12.383Z" fill="#060606"/>
              <path d="M158.938 26.9852V0H163.849V26.9852H158.938Z" fill="#060606"/>
              <path d="M167.267 26.9852V0H172.179V21.3633H180.242V26.9852H167.267Z" fill="#060606"/>
              <path d="M182.52 26.9852V0H187.432V21.3633H195.495V26.9852H182.52Z" fill="#060606"/>
              <path d="M30.9649 0.562377L6.92385 6.39142C5.71645 6.69081 4.58545 7.24064 3.60421 8.00525C2.62296 8.76985 1.81338 9.73217 1.22796 10.8298C-0.0210259 13.1177 -0.339002 15.7993 0.34029 18.3158C0.937121 20.8152 2.48262 22.9845 4.64998 24.365C6.81734 25.7455 9.43663 26.2289 11.954 25.7131L35.9951 19.8692C37.2025 19.5698 38.3335 19.02 39.3147 18.2554C40.296 17.4908 41.1056 16.5285 41.691 15.4309C42.9291 13.1391 43.2415 10.46 42.5639 7.94484C41.9705 5.44739 40.4273 3.27945 38.2617 1.90112C36.0962 0.522795 33.4787 0.0425746 30.9649 0.562377ZM16.8806 11.4216L14.5874 11.9837L16.274 18.5821L14.617 18.9964L12.9304 12.3832L10.6669 12.9306L10.3562 11.5103L16.5551 10.0309L16.9249 11.5103L16.8806 11.4216ZM25.7573 16.289L24.1151 16.6884L23.257 13.3153L20.1649 14.0698L21.0526 17.4577L19.3956 17.8572L17.3096 9.80895L18.9666 9.4095L19.7655 12.5016L22.8428 11.8358L22.0438 8.72895L23.6712 8.25553L25.7573 16.289ZM32.548 14.6468L27.2515 15.9339L25.1507 7.90046L30.4175 6.61334L30.7874 8.09279L27.1628 8.8769L27.6362 10.6966L31.0685 9.92731L31.4384 11.4068L28.0356 12.2205L28.5534 14.1881L32.2225 13.3005L32.548 14.6468Z" fill="#060606"/>
            </svg>
            <div className="right">
              Excellent developments in technology, engineering, physics, space, and more
              <span className="caslon-med">Sign up for <Link href={`/newsletters`}>The White Pill Newsletter</Link></span>
            </div>
          </div>
          <Featured post={whitePillPosts[0]} pathPrefix="" />
            <div className="postGrid c-20">
              {whitePillPosts.slice(1, 6).map(post => (
                // @ts-ignore
                <PostList
                  key={post._id}
                  post={post}
                  aspect="landscape"
                  preloadImage={true}
                />
              ))}

              <Link
                href={`/white-pill`} className="pubLink hasGoIcon mtb-20">
                <h2>Dive into Tech, Politics & Culture.</h2>
                <div className="goIconWrapper caslon-reg">
                  Dive into it
                  <div className="goIcon">
                    <div className="leftHalf"></div>
                    <div className="rightHalf"></div>
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.17157 0.46444L9.35355 3.64642C9.54882 3.84168 9.54882 4.15827 9.35355 4.35353L6.17157 7.53551C5.97631 7.73077 5.65973 7.73077 5.46447 7.53551C5.2692 7.34025 5.2692 7.02366 5.46447 6.8284L7.79289 4.49997L0.5 4.49997L0.5 3.49997L7.79289 3.49997L5.46447 1.17155C5.2692 0.976285 5.2692 0.659702 5.46447 0.46444C5.65973 0.269178 5.97631 0.269178 6.17157 0.46444Z"/>
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
        </div>
      )}
      {industryPosts && (
        <div className="theme-color pt-40 pb-20 industry">
          <div className="featuredPostsTop pb-20 c-20">
            <svg viewBox="0 0 154 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M42.464 26.5451V26.614H34.5666V26.5451C35.4073 25.4563 35.49 24.6707 35.49 22.1898V4.79627C35.49 2.31541 35.4073 1.5298 34.5666 0.440983V0.37207H42.464V0.440983C41.6233 1.5298 41.5406 2.31541 41.5406 4.79627V22.1898C41.5406 24.6707 41.6233 25.4563 42.464 26.5451Z" fill="#060606"/>
              <path d="M56.5773 5.55431V26.6692H53.8759L44.683 4.35522V19.5436C44.683 24.1194 45.0551 25.4287 46.2542 26.5589V26.6278H42.588V26.5589C43.4287 25.5528 43.8009 23.9678 43.8009 21.4594V4.79627C43.8009 2.31541 43.7182 1.5298 42.8774 0.440983V0.37207H50.196L55.6814 13.7549V7.4563C55.6814 2.88049 55.3093 1.57115 54.1102 0.440983V0.37207H57.7902V0.440983C56.9494 1.46089 56.5773 3.0321 56.5773 5.55431Z" fill="#060606"/>
              <path d="M57.9142 26.5451C58.755 25.4563 58.8377 24.6707 58.8377 22.1898V4.79627C58.8377 2.31541 58.755 1.5298 57.9142 0.440983V0.37207H65.343C70.6906 0.37207 74.8116 4.49305 74.8116 13.4517C74.8116 22.493 70.6906 26.614 65.3844 26.614H57.9005V26.5451H57.9142ZM65.2879 25.6768C67.4655 25.6768 68.3338 21.5834 68.3338 13.4517C68.3338 5.43026 67.4655 1.30928 65.2879 1.30928H64.8882V25.6768H65.2879Z" fill="#060606"/>
              <path d="M89.6141 18.0275C89.6141 23.8437 86.9954 26.9862 82.9709 26.9862C79.0842 26.9862 76.1761 23.83 76.1761 17.9862V4.79627C76.1485 2.31541 76.0658 1.5298 75.2251 0.440983V0.37207H83.1501V0.440983C82.3093 1.5298 82.2266 2.31541 82.1853 4.79627V17.8759C82.1853 21.5834 83.343 23.8024 85.4655 23.8024C87.3813 23.8024 88.6631 21.735 88.6631 17.8346V7.4563C88.6631 2.88049 88.291 1.57115 87.0643 0.440983V0.37207H90.7442V0.440983C89.9035 1.44711 89.6141 3.0321 89.6141 5.54052V18.0275Z" fill="#060606"/>
              <path d="M95.2649 4.27259C95.2649 7.3461 97.1807 8.2144 99.2343 9.37213C101.591 10.7228 104.113 12.4043 104.113 18.2619C104.113 23.5819 101.067 27 97.4012 27C95.4854 27 94.1485 26.0628 93.1286 26.0628C92.4946 26.0628 91.9709 26.3936 91.392 27L90.9923 17.366H91.0474C92.7289 22.245 94.879 26.2833 97.2082 26.2833C99.0413 26.2833 100.089 24.7397 100.089 22.1623C100.089 19.1302 97.7733 18.1516 95.4716 16.6493C93.2389 15.2297 91.0337 13.2726 91.0337 8.51761C91.0337 3.26646 93.7626 0 97.4839 0C99.248 0 100.364 0.937213 101.467 0.937213C101.963 0.937213 102.487 0.565084 102.859 0L103.038 7.98009H102.983C101.729 3.88668 100.144 0.70291 97.732 0.70291C96.3399 0.716692 95.2649 2.24655 95.2649 4.27259Z" fill="#060606"/>
              <path d="M118.337 0.372129C119.412 0.372129 120.018 0.261868 120.432 0L121.038 10.8744H120.983C119.122 4.4242 117.813 1.24043 115.815 1.24043H115.663V22.2312C115.663 24.7121 115.952 25.3048 117.11 26.5452V26.6141H108.193V26.5452C109.323 25.3048 109.64 24.7121 109.64 22.2312V1.24043H109.488C107.462 1.24043 106.181 4.4242 104.32 10.8744H104.265L104.844 0C105.243 0.261868 105.864 0.372129 106.911 0.372129H118.337Z" fill="#060606"/>
              <path d="M130.645 0.37207C134.655 0.37207 137.55 2.3981 137.55 7.49764C137.55 11.7702 134.876 13.8652 131.692 13.8652C134.531 14.0581 136.488 15.588 136.778 19.075L137.04 21.9555C137.219 24.3537 137.591 25.4012 138.9 26.5313V26.6002H131.761C131.292 25.4012 131.155 24.2021 131.058 22.5482L130.714 17.1868C130.603 15.3813 129.928 14.4854 128.798 14.4854H128.426V22.1898C128.426 24.6707 128.508 25.4563 129.377 26.5451V26.614H121.452V26.5451C122.292 25.4563 122.375 24.6707 122.375 22.1898V4.79627C122.375 2.31541 122.292 1.5298 121.452 0.440983V0.37207H130.645ZM128.439 13.5344H128.812C130.465 13.5344 131.43 10.9846 131.43 7.4563C131.43 3.92797 130.479 1.3782 128.812 1.3782H128.439V13.5344Z" fill="#060606"/>
              <path d="M150.698 5.03057C150.905 4.42414 151.015 3.83149 151.015 3.22506C151.015 2.21893 150.643 1.19902 149.596 0.454766V0.37207H153.799V0.440983C152.876 1.70898 152.352 2.92184 151.746 4.79627L148.383 15.4777V22.2312C148.383 24.712 148.672 25.3047 149.802 26.5451V26.614H141.216V26.5451C142.346 25.3047 142.636 24.712 142.636 22.2312V15.4777L139.245 4.79627C138.666 2.92184 138.142 1.72276 137.219 0.440983V0.37207H146.136V0.440983C145.447 1.22659 145.213 1.94328 145.213 2.68754C145.213 3.21127 145.351 3.81771 145.53 4.41036L148.052 13.1898L150.698 5.03057Z" fill="#060606"/>
              <path d="M21.4457 5.62347C22.2313 5.40295 23.0031 5.37539 23.7749 5.37539C25.1807 5.38917 26.5314 5.59591 27.7581 6.3126C28.1991 6.57447 28.5713 6.89147 28.8745 7.30494C29.5222 8.20081 29.4947 9.26206 28.8056 10.1304C28.3645 10.6817 27.7856 10.9987 27.069 11.2743C27.3722 11.3294 27.5789 11.357 27.7856 11.4121C28.6126 11.6464 29.0674 12.3494 28.9296 13.2039C28.7366 14.4443 27.9786 15.285 27 15.9742C25.8837 16.7598 24.6019 17.1181 23.265 17.3111C23.1134 17.3386 23.0031 17.3524 22.9755 17.5316C22.8515 18.1656 22.7964 18.8134 22.948 19.4474C23.1961 20.4673 24.023 20.9634 25.0981 20.7567C25.8974 20.6051 26.5866 20.2054 27.2206 19.7092C27.3033 19.6403 27.3722 19.4887 27.4962 19.6403C27.6065 19.7781 27.4549 19.8333 27.386 19.8884C26.4212 20.8118 25.3461 21.432 23.9403 21.3356C22.5896 21.2253 21.68 20.4259 21.4732 19.0752C21.4595 18.965 21.4319 18.8547 21.3905 18.6618C21.1976 19.0063 21.0322 19.2958 20.8668 19.5852C20.6049 20.0538 20.2466 20.4397 19.8469 20.7843C18.8959 21.5699 17.3798 21.5423 16.5115 20.7567C15.8224 20.1227 15.8362 19.3233 15.9878 18.5101C16.167 17.5316 16.7045 16.7046 17.3247 15.9466C17.9036 15.2299 18.51 14.527 19.1026 13.8103C19.4059 13.4382 19.6677 13.0385 19.7642 12.5423C19.8745 11.9772 19.5988 11.6464 19.0199 11.7016C18.5927 11.7429 18.2343 11.9221 17.9036 12.1702C16.8147 12.9833 16.0429 14.086 15.3262 15.2161C14.265 16.8976 13.5207 18.7031 12.9694 20.6051C12.9005 20.8532 12.804 20.9634 12.5422 20.9359C12.2389 20.9083 11.9357 20.9221 11.6325 20.9359C11.3844 20.9497 11.3706 20.8532 11.4395 20.6464C11.7841 19.6128 12.1011 18.5791 12.4319 17.5316C13.0797 15.5193 13.7137 13.4933 14.3752 11.4811C14.8025 10.1993 15.5192 9.06911 16.4564 8.09055C16.5667 7.98029 16.7458 7.88381 16.5391 7.69085C15.3951 6.64338 14.3063 5.51321 12.9832 4.65869C10.9434 3.33557 8.73817 2.97722 6.38136 3.4734C6.2711 3.50096 6.16084 3.51474 6.02301 3.45961C6.45027 3.36313 6.87753 3.25287 7.30479 3.19774C10.1302 2.78427 12.7213 3.45961 15.1195 4.96191C15.974 5.49943 16.7734 6.11964 17.5452 6.76742C17.7106 6.90525 17.8071 6.91903 18 6.79499C18.4686 6.47799 18.9648 6.21612 19.4886 5.9956C19.585 5.95425 19.6815 5.87156 19.8745 5.92669C19.3094 6.18856 18.8132 6.45042 18.3722 6.82255C17.9863 7.13955 17.9863 7.13955 18.3584 7.45655C19.5023 8.43511 20.6049 9.45502 21.8867 10.2406C23.3201 11.1089 24.8362 11.55 26.5177 11.1365C27.4135 10.916 28.1164 10.4474 28.268 9.45502C28.3645 8.82102 28.1164 8.26972 27.7443 7.78733C26.2282 5.87156 24.2297 5.19621 21.8454 5.58212C21.7213 5.62347 21.6111 5.69238 21.4457 5.62347ZM14.4855 15.9742C14.6371 15.9052 14.6509 15.7812 14.706 15.6847C15.2987 14.5821 16.0016 13.5484 16.8699 12.625C17.3247 12.1288 17.8209 11.6878 18.4549 11.4259C19.0199 11.1916 19.585 11.1916 20.0812 11.5913C20.5636 11.9634 20.6187 12.501 20.5085 13.066C20.4258 13.5484 20.2052 13.9757 19.9847 14.403C19.4472 15.4504 18.7719 16.4152 18.2757 17.4627C17.9173 18.2207 17.6003 18.9925 17.7106 19.8608C17.8071 20.55 18.2619 20.867 18.9235 20.7154C19.4886 20.5913 19.8745 20.233 20.219 19.8057C20.8806 18.9788 21.3216 18.0415 21.6111 17.0216C21.7902 16.3739 22.0108 15.7536 22.3278 15.161C23.1409 13.6587 24.1608 12.3631 25.7872 11.6464C25.801 11.6327 25.8147 11.5913 25.8285 11.5637C25.801 11.55 25.7734 11.5362 25.7458 11.5362C23.706 11.6464 21.7627 11.2743 19.9434 10.3095C19.0199 9.82715 18.193 9.22072 17.4212 8.53159C17.2007 8.33863 17.118 8.37998 16.9939 8.61428C16.801 9.0002 16.6218 9.39989 16.4702 9.79958C15.8224 11.5362 15.3124 13.3141 14.7336 15.0645C14.6371 15.3402 14.4993 15.6296 14.4855 15.9742ZM26.8898 11.6327C26.752 11.6189 26.5866 11.674 26.4212 11.7429C26.0077 11.9221 25.6631 12.2115 25.3737 12.5561C24.34 13.7276 23.6784 15.0921 23.2098 16.5668C23.1823 16.6771 23.0858 16.8011 23.1685 16.8976C23.2788 17.0079 23.4166 16.8976 23.5268 16.8562C25.4426 16.1258 26.7244 14.7889 27.4273 12.8731C27.51 12.6388 27.5513 12.3907 27.5238 12.1426C27.4824 11.8118 27.2757 11.6327 26.8898 11.6327Z" fill="#060606"/>
              <path d="M7.09804 16.6772C6.68456 16.9253 6.31243 17.1182 5.96787 17.3525C5.18227 17.8763 4.49314 18.5103 4.07966 19.3786C3.88671 19.7783 3.77645 20.1917 3.87292 20.6328C3.98318 21.129 4.32775 21.4184 4.8377 21.446C5.48548 21.4873 6.00922 21.2392 6.45026 20.7982C7.2083 20.0539 7.64934 19.1029 8.04903 18.1381C8.79329 16.2913 9.31703 14.3617 10.0337 12.5011C10.5712 11.0953 11.1363 9.70323 12.1838 8.58684C12.5973 8.1458 13.0521 7.78745 13.6999 7.58071C12.2941 9.37244 11.8117 11.4674 11.1915 13.521C10.7091 15.1198 10.268 16.7461 9.53755 18.2622C9.00003 19.3648 8.35225 20.3709 7.30478 21.0463C6.27109 21.7078 5.14092 21.8732 3.9694 21.6113C2.88058 21.3633 2.42576 20.495 2.7841 19.4337C3.1838 18.2622 4.06588 17.5593 5.16848 17.0907C5.4717 16.9528 5.80248 16.8701 6.17461 16.7461C2.60493 16.2775 0.413507 14.4169 0.0413779 10.792C-0.289403 7.66341 1.51611 5.38929 3.99697 4.21777C3.99697 4.23156 4.01075 4.2729 4.01075 4.2729C2.92193 4.89312 2.26037 5.84411 1.9158 7.02941C1.52989 8.35254 1.35072 9.68944 1.59881 11.0539C1.97093 13.1489 3.14245 14.6925 4.9204 15.7951C5.58196 16.1948 6.29865 16.4705 7.09804 16.6772Z" fill="#060606"/>
              <path d="M2.13631 5.95439L1.94336 5.80278C1.97092 5.76143 5.11334 1.88854 11.3706 3.52866L11.3017 3.76297C5.2236 2.16419 2.16388 5.91304 2.13631 5.95439Z" fill="#060606"/>
              <path d="M17.7795 7.24986L17.6417 7.05691C21.3078 4.49335 25.3875 5.62352 25.4288 5.6373L25.3599 5.87161C25.3323 5.85782 21.3492 4.75522 17.7795 7.24986Z" fill="#060606"/>
            </svg>

            <div className="right">
              News from the Tech World
              <span className="caslon-med">Sign up for <Link href={`/newsletters`}>The Industry Newsletter</Link></span>
            </div>
          </div>
          <Featured post={industryPosts[0]} pathPrefix="" />
          <div className="postGrid c-20">
            {industryPosts.slice(1, 4).map(post => (
              // @ts-ignore
              <PostList
                key={post._id}
                post={post}
                aspect="landscape"
                preloadImage={true}
              />
            ))}

            <Link
              href={`/wires`} className="pubLink hasGoIcon mtb-20">
              <h2>Dive into Tech, Politics & Culture.</h2>
              <div className="goIconWrapper caslon-reg">
                Dive into it
                <div className="goIcon">
                  <div className="leftHalf"></div>
                  <div className="rightHalf"></div>
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.17157 0.46444L9.35355 3.64642C9.54882 3.84168 9.54882 4.15827 9.35355 4.35353L6.17157 7.53551C5.97631 7.73077 5.65973 7.73077 5.46447 7.53551C5.2692 7.34025 5.2692 7.02366 5.46447 6.8284L7.79289 4.49997L0.5 4.49997L0.5 3.49997L7.79289 3.49997L5.46447 1.17155C5.2692 0.976285 5.2692 0.659702 5.46447 0.46444C5.65973 0.269178 5.97631 0.269178 6.17157 0.46444Z"/>
                  </svg>
                </div>
              </div>
            </Link>

            {industryPosts.slice(4, 6).map(post => (
              // @ts-ignore
              <PostList
                key={post._id}
                post={post}
                aspect="landscape"
                preloadImage={true}
              />
            ))}
          </div>
        </div>
      )}

    </>
  );
}
