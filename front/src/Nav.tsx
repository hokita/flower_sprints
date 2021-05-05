type Props = {
  children: JSX.Element | JSX.Element[]
}

const Nav: React.FC<Props> = ({ children }) => {
  return (
    <nav className="fixed bottom-0 inset-x-0 pb-5 bg-gray-300 flex justify-between uppercase">
      {children}
    </nav>
  )
}

export default Nav
