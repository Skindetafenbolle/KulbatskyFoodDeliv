import { Link } from '@nextui-org/link';

const navItems = [
  {
    title: 'Home',
    url: '/',
  },
  {
    title: 'About',
    url: '/about',
  },
  {
    title: 'Restaurants',
    url: '/restaurants',
  },
  {
    title: 'Popular Foods',
    url: '/foods',
  },
  {
    title: 'Contact',
    url: '/contact',
  },
];

const NavItems = ({ activeItem = 0 }: { activeItem?: number }) => {
  return (
    <div>
      {navItems.map((item, index) => (
        <Link
          key={item.url}
          href={item.url}
          className={`px-5 text-[18px] font-Poppins font-[500] text-[#ffffff] ${
            activeItem === index && 'text-[#37b668]'
          }`}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
};

export default NavItems;
