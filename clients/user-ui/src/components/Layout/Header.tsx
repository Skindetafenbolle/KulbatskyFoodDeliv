import styles from '@/src/utils/style';
import NavItems from '../NavItems';
import ProfileDropDown from '@/src/components/ProfileDropDown';

const Header = () => {
  return (
    <div>
      <header className="w-full bg-[#0F1524]">
        <div className="w-[90%] m-auto h-[80px] flex items-center justify-between">
          <h1 className={`${styles.logo}`}>Kulbatsky</h1>
          <NavItems />
          <ProfileDropDown />
        </div>
      </header>
    </div>
  );
};

export default Header;
