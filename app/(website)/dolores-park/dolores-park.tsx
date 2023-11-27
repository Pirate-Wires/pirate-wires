"use client"
import Link from "next/link";
import PostList from "@/components/postlist";
import Featured from "@/components/featured";
import styles from "../../../styles/pages/home.module.scss"
import React from "react";
import FeaturedNewsletters from "@/components/featuredNewsletters";
import {useScrollBasedAnims} from "@/hooks/useScrollBasedAnims";

export default function DoloresPark({
  pageData,
  publicationPosts,
  publicationNewsletters,
  user
}) {
  useScrollBasedAnims()
  return (
    <>
        <div className="featuredPostsTop pb-20 c-20">
          <svg viewBox="0 0 1400 262" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M990.46 261.535C977.356 261.535 965.344 258.259 954.424 251.707C943.746 244.912 935.131 236.055 928.579 225.135C922.27 213.972 919.115 201.717 919.115 188.37V171.626C919.115 170.413 919.722 169.806 920.935 169.806H961.704C962.674 169.806 963.16 170.413 963.16 171.626V188.37C963.16 196.378 965.829 203.295 971.168 209.119C976.507 214.7 982.937 217.491 990.46 217.491C997.983 217.491 1004.41 214.579 1009.75 208.755C1015.09 202.931 1017.76 196.136 1017.76 188.37C1017.76 179.392 1011.94 171.626 1000.29 165.074C996.406 162.89 990.339 159.493 982.088 154.882C973.837 150.271 966.072 145.903 958.792 141.778C945.445 134.012 935.495 124.306 928.943 112.657C922.634 100.767 919.479 87.4198 919.479 72.6169C919.479 59.0274 922.755 46.8939 929.307 36.2165C935.859 25.2963 944.474 16.6816 955.152 10.3722C966.072 4.06274 977.841 0.908028 990.46 0.908028C1003.32 0.908028 1015.09 4.18407 1025.77 10.7362C1036.69 17.0456 1045.3 25.6603 1051.61 36.5805C1058.17 47.2579 1061.44 59.2701 1061.44 72.6169V102.465C1061.44 103.436 1060.96 103.921 1059.99 103.921H1019.22C1018.25 103.921 1017.76 103.436 1017.76 102.465L1017.4 72.6169C1017.4 64.1235 1014.73 57.2074 1009.39 51.8687C1004.05 46.5299 997.74 43.8606 990.46 43.8606C982.937 43.8606 976.507 46.7726 971.168 52.5967C965.829 58.1781 963.16 64.8515 963.16 72.6169C963.16 80.625 964.859 87.2985 968.256 92.6372C971.653 97.9759 977.841 103.072 986.82 107.925C988.033 108.653 990.339 109.988 993.736 111.929C997.376 113.628 1001.26 115.691 1005.38 118.118C1009.51 120.302 1013.15 122.243 1016.3 123.942C1019.7 125.64 1021.76 126.732 1022.49 127.218C1034.63 134.012 1044.21 142.384 1051.25 152.334C1058.29 162.041 1061.81 174.053 1061.81 188.37C1061.81 202.203 1058.53 214.7 1051.98 225.863C1045.67 236.783 1037.05 245.519 1026.13 252.071C1015.46 258.381 1003.56 261.535 990.46 261.535Z" fill="black"/>
            <path d="M786.584 257.913C785.613 257.913 785.128 257.306 785.128 256.093L785.492 6.02148C785.492 5.0508 785.977 4.56547 786.948 4.56547H903.793C904.764 4.56547 905.249 5.17213 905.249 6.38548V47.154C905.249 48.1247 904.764 48.61 903.793 48.61H829.172V105.395H903.793C904.764 105.395 905.249 105.88 905.249 106.851L905.613 147.983C905.613 148.954 905.128 149.439 904.157 149.439H829.172V213.14H904.157C905.128 213.14 905.613 213.747 905.613 214.96V256.457C905.613 257.427 905.128 257.913 904.157 257.913H786.584Z" fill="black"/>
            <path d="M618.252 257.913C617.281 257.913 616.796 257.306 616.796 256.093L617.524 6.02148C617.524 5.0508 618.009 4.56547 618.98 4.56547H692.509C705.613 4.56547 717.625 7.84151 728.545 14.3936C739.708 20.703 748.566 29.3178 755.118 40.2379C761.67 50.9154 764.946 63.0489 764.946 76.6384C764.946 85.6172 763.611 93.7466 760.942 101.027C758.272 108.064 755.118 114.131 751.478 119.227C747.838 124.08 744.562 127.72 741.65 130.147C754.754 144.707 761.306 161.815 761.306 181.472L761.67 256.093C761.67 257.306 761.063 257.913 759.85 257.913H718.717C717.747 257.913 717.261 257.549 717.261 256.821V181.472C717.261 172.736 714.106 165.213 707.797 158.903C701.73 152.351 694.208 149.075 685.229 149.075H661.204L660.84 256.093C660.84 257.306 660.355 257.913 659.384 257.913H618.252ZM661.204 105.395H692.509C700.032 105.395 706.705 102.604 712.529 97.0226C718.353 91.4412 721.265 84.6465 721.265 76.6384C721.265 68.8729 718.353 62.1995 712.529 56.6181C706.948 51.0367 700.274 48.246 692.509 48.246H661.204V105.395Z" fill="black"/>
            <path d="M525.066 261.542C511.962 261.542 499.95 258.266 489.03 251.714C478.352 244.92 469.738 236.062 463.186 225.142C456.633 213.979 453.357 201.724 453.357 188.378L453.721 72.9881C453.721 59.6413 456.876 47.5078 463.186 36.5876C469.738 25.6675 478.474 16.9314 489.394 10.3793C500.314 3.82724 512.205 0.551193 525.066 0.551193C538.17 0.551193 550.061 3.82724 560.739 10.3793C571.416 16.9314 579.91 25.6675 586.219 36.5876C592.771 47.5078 596.047 59.6413 596.047 72.9881L596.411 188.378C596.411 201.724 593.135 213.979 586.583 225.142C580.274 236.062 571.659 244.92 560.739 251.714C550.061 258.266 538.17 261.542 525.066 261.542ZM525.066 217.498C532.346 217.498 538.656 214.586 543.995 208.762C549.576 202.695 552.367 195.9 552.367 188.378L552.003 72.9881C552.003 64.98 549.455 58.1853 544.359 52.6039C539.263 47.0224 532.832 44.2317 525.066 44.2317C517.544 44.2317 511.113 47.0224 505.774 52.6039C500.435 57.9426 497.766 64.7373 497.766 72.9881V188.378C497.766 196.386 500.435 203.302 505.774 209.126C511.113 214.707 517.544 217.498 525.066 217.498Z" fill="black"/>
            <path d="M326.766 257.913C325.795 257.913 325.31 257.306 325.31 256.093L325.674 6.38548C325.674 5.17213 326.28 4.56547 327.494 4.56547H367.898C369.111 4.56547 369.718 5.17213 369.718 6.38548L369.354 213.14H444.339C445.552 213.14 446.159 213.747 446.159 214.96V256.093C446.159 257.306 445.552 257.913 444.339 257.913H326.766Z" fill="black"/>
            <path d="M233.567 261.542C220.463 261.542 208.451 258.266 197.531 251.714C186.853 244.92 178.239 236.062 171.687 225.142C165.134 213.979 161.858 201.724 161.858 188.378L162.222 72.9881C162.222 59.6413 165.377 47.5078 171.687 36.5876C178.239 25.6675 186.975 16.9314 197.895 10.3793C208.815 3.82724 220.706 0.551193 233.567 0.551193C246.671 0.551193 258.562 3.82724 269.24 10.3793C279.917 16.9314 288.411 25.6675 294.72 36.5876C301.272 47.5078 304.548 59.6413 304.548 72.9881L304.912 188.378C304.912 201.724 301.636 213.979 295.084 225.142C288.775 236.062 280.16 244.92 269.24 251.714C258.562 258.266 246.671 261.542 233.567 261.542ZM233.567 217.498C240.847 217.498 247.157 214.586 252.496 208.762C258.077 202.695 260.868 195.9 260.868 188.378L260.504 72.9881C260.504 64.98 257.956 58.1853 252.86 52.6039C247.763 47.0224 241.333 44.2317 233.567 44.2317C226.045 44.2317 219.614 47.0224 214.275 52.6039C208.936 57.9426 206.267 64.7373 206.267 72.9881V188.378C206.267 196.386 208.936 203.302 214.275 209.126C219.614 214.707 226.045 217.498 233.567 217.498Z" fill="black"/>
            <path d="M1.82002 257.907C0.606674 257.907 0 257.301 0 256.087L0.728009 6.01618C0.728009 5.0455 1.21335 4.56017 2.18403 4.56017L70.2529 4.19616C83.5997 3.95349 95.7332 7.10821 106.653 13.6603C117.816 20.2124 126.674 29.0698 133.226 40.2326C139.778 51.1528 143.054 63.2862 143.054 76.6331V181.102C143.054 195.177 139.656 208.039 132.862 219.687C126.067 231.092 116.967 240.193 105.561 246.987C94.1559 253.782 81.2944 257.301 66.9768 257.543L1.82002 257.907ZM44.4086 213.135H66.9768C75.9556 213.135 83.4784 209.98 89.5451 203.671C95.8545 197.361 99.0092 189.839 99.0092 181.102V76.2691C99.0092 68.5037 96.0972 61.8302 90.2731 56.2488C84.6917 50.4248 78.0183 47.6341 70.2529 47.8767L44.7726 48.2407L44.4086 213.135Z" fill="black"/>
            <path d="M1318.95 257.636C1318.47 257.636 1318.22 257.322 1318.22 256.695L1318.59 127.617C1318.59 126.99 1318.83 126.676 1319.31 126.676H1339.62C1340.1 126.676 1340.35 126.99 1340.35 127.617V172.211L1368.82 127.429C1369.18 126.927 1369.6 126.676 1370.08 126.676H1390.94C1391.42 126.676 1391.54 126.927 1391.3 127.429L1359.93 179.361L1395.11 256.883C1395.35 257.385 1395.05 257.636 1394.2 257.636H1372.08C1371.47 257.636 1371.11 257.385 1370.99 256.883L1346.51 201.564L1340.16 211.913V256.695C1340.16 257.322 1339.92 257.636 1339.44 257.636H1318.95Z" fill="black"/>
            <path d="M1235.12 257.636C1234.64 257.636 1234.39 257.322 1234.39 256.695L1234.76 127.429C1234.76 126.927 1235 126.676 1235.48 126.676H1272.11C1278.64 126.676 1284.62 128.37 1290.06 131.757C1295.62 135.018 1300.04 139.471 1303.3 145.116C1306.56 150.635 1308.2 156.907 1308.2 163.932C1308.2 168.573 1307.53 172.776 1306.2 176.539C1304.87 180.177 1303.3 183.313 1301.49 185.947C1299.67 188.456 1298.04 190.337 1296.59 191.592C1303.12 199.118 1306.38 207.962 1306.38 218.122L1306.56 256.695C1306.56 257.322 1306.26 257.636 1305.66 257.636H1285.17C1284.68 257.636 1284.44 257.448 1284.44 257.071V218.122C1284.44 213.606 1282.87 209.718 1279.73 206.456C1276.71 203.069 1272.96 201.376 1268.48 201.376H1256.52L1256.34 256.695C1256.34 257.322 1256.09 257.636 1255.61 257.636H1235.12ZM1256.52 178.797H1272.11C1275.86 178.797 1279.18 177.354 1282.08 174.469C1284.99 171.584 1286.44 168.072 1286.44 163.932C1286.44 159.918 1284.99 156.468 1282.08 153.583C1279.3 150.698 1275.98 149.255 1272.11 149.255H1256.52V178.797Z" fill="black"/>
            <path d="M1154.48 256.695L1176.96 127.429C1177.08 126.927 1177.39 126.676 1177.87 126.676H1204.16C1204.65 126.676 1204.95 126.927 1205.07 127.429L1226.65 256.695C1226.77 257.322 1226.53 257.636 1225.92 257.636H1205.8C1205.31 257.636 1205.01 257.322 1204.89 256.695L1202.89 242.959H1178.23L1176.24 256.695C1176.12 257.322 1175.82 257.636 1175.33 257.636H1155.2C1154.72 257.636 1154.48 257.322 1154.48 256.695ZM1181.86 222.826H1199.27L1191.83 169.953L1190.74 162.991L1190.02 169.953L1181.86 222.826Z" fill="black"/>
            <path d="M1091.34 257.636C1090.73 257.636 1090.43 257.322 1090.43 256.695L1090.79 127.429C1090.79 126.927 1091.03 126.676 1091.52 126.676H1126.33C1137.45 126.676 1146.22 130.189 1152.63 137.213C1159.15 144.238 1162.42 153.771 1162.42 165.814C1162.42 174.72 1160.73 182.434 1157.34 188.957C1153.96 195.48 1149.54 200.498 1144.1 204.01C1138.66 207.522 1132.74 209.279 1126.33 209.279H1112.55V256.695C1112.55 257.322 1112.25 257.636 1111.64 257.636H1091.34ZM1112.55 186.511H1126.33C1130.2 186.511 1133.53 184.63 1136.31 180.866C1139.21 176.978 1140.66 171.96 1140.66 165.814C1140.66 160.921 1139.39 156.907 1136.85 153.771C1134.31 150.635 1130.81 149.067 1126.33 149.067L1112.55 149.255V186.511Z" fill="black"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M1113.01 59.9791L1083.32 36.1688L1090.74 102.838L1230.39 102.838L1241.66 102.838L1392.58 102.838L1400 36.1688L1370.31 59.9791L1364.13 20.6921L1334.44 55.2171L1315.88 12.3585L1286.19 43.3119L1275.06 5.21536L1241.66 48.074L1241.66 48.0909V48.074L1208.26 5.21536L1197.13 43.3119L1167.44 12.3585L1148.88 55.2171L1119.19 20.6921L1113.01 59.9791Z" fill="black"/>
          </svg>
          <div className={`taglineRow`}>
            {pageData.tagline}
            <span className="martina-reg">Sign up for <Link href={`/newsletters`}>The Dolores Park Newsletter</Link></span>
          </div>
        </div>

        <Featured post={publicationPosts[0]} pathPrefix="" />

        <FeaturedNewsletters
          newsletters={publicationNewsletters}
          section={'The Industry'}
          user={user}
        />

        <section className="postGrid c-20">
          {publicationPosts.slice(1).map((post, index) => (
            // @ts-ignore
            <PostList
              key={index}
              post={post}
              aspect="landscape"
              preloadImage={true}
            />
          ))}
          <div className="dummyTile"></div>
          <div className="dummyTile"></div>
        </section>
    </>
  );
}
