import React from 'react';
import styles from './AboutUs.module.css';

function AboutUs() {
	return (
		<div className={styles.AboutUsContainer}>
			<div className={`${styles.header} yellow-color`}>About Us</div>
			<div>
				<span className={styles.paragraph}>
					Welcome to Pett. Thanks for stopping by! Pett is Israels largest non-profit pet adoption website. We
					help over 21,000 animal shelters, humane societies, SPCAs, pet rescue groups, and pet adoption
					agencies advertise their homeless pets to millions of adopters a month, for free. We're all about
					getting homeless pets into homes.
				</span>
				<img src="/images/adopt1.jfif" alt="pet" className={styles.photo} />
			</div>
			<div>
				<span className={styles.paragraph}>
					We use the power of the Internet to connect adopters with shelter pets and help pets go from alone
					to adopted. We're working to help the good people at shelters and rescue groups find homes for their
					pets. But we don't stop there. We also provide useful and informative information on the
					human/companion animal relationship to help keep pets healthy and permanently in their loving homes.
					Our blog has articles, and our YouTube channel has useful pet training as well as entertaining
					videos, all produced by our expert staff of professionals in animal training and behavior, as well
					as human psychology.
				</span>
				<img src="/images/adopt2.jpg" alt="pet" className={styles.photo} />
			</div>
			<div>
				<span className={styles.paragraph}>
					Our small staff answered the call to volunteer in the massive effort to save pets and we co-led the
					entire rescue effort for months. If you like what we do and want to help save shelter pets, visit
					our get involved page. For our financial and other organizational information.
				</span>
				<img src="/images/adopt3.jfif" alt="pet" className={styles.photo} />
			</div>
		</div>
	);
}

export default AboutUs;
