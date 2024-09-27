import Logo from '../../assets/logo.svg';
import './Header.scss';

export const Header = () => {
  return (
    <header className='header'>
      <div className='header__logo'>
        <img src={Logo} alt='MyFox Logo' />
      </div>
      <h1 className='header__title'>Rezervační systém</h1>
      <div className='header__menu'>
        <i className='fas fa-bars'></i>
      </div>
    </header>
  );
};
