import { Link } from 'react-router-dom'

type Props = {
  name: string
  link: string
}

const NavButton: React.FC<Props> = ({ name, link }) => {
  return (
    <Link to={link} className="w-full block py-5 px-3 text-center">
      {name}
    </Link>
  )
}

export default NavButton
