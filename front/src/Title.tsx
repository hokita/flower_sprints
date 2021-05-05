type Props = {
  children: string
}

const Title: React.FC<Props> = ({ children }) => {
  return <h1 className="text-4xl mt-5 mb-10">{children}</h1>
}

export default Title
