import { Link } from 'react-router-dom'

type NavButtonProps = {
  name: string
  link: string
}

const NavButton: React.FC<NavButtonProps> = ({ name, link }) => {
  return (
    <Link to={link} className="w-full block py-5 px-3 text-center">
      {name}
    </Link>
  )
}

export default NavButton
