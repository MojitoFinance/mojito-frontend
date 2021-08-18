import { Link, withTranslation } from '../i18n';

const Footer = ({ t }) => {
  return (
    <footer className={`styles.footer`}>
      <div className={`styles.leftfont`}>
        © 2021 Mojito All rights reserved.
      </div>
      <ul>
        <Link href="/">
          <li>
            <i className={`styles.lemond`}></i>
          </li>
        </Link>
        <li onClick={() => window.open('https://twitter.com/LemondFinance')}>
          <i className={`styles.twitter`}></i>
        </li>
        <li onClick={() => window.open('https://lemondfinance.medium.com')}>
          <i className={`styles.medium`}></i>
        </li>
        <li onClick={() => window.open('https://t.me/lemondok')}>
          <i className={`styles.telegram`}></i>
        </li>
        <li
          onClick={() =>
            window.open('https://github.com/Lemond-finance/lemond')
          }
        >
          <i className={`styles.github`}></i>
        </li>
      </ul>
    </footer>
  );
};

export default withTranslation('header')(Footer);
