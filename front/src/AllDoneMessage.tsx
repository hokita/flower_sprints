type Props = {
  isAllDone: boolean
}

const AllDoneMessage: React.FC<Props> = ({ isAllDone }) =>
  isAllDone ? <p className="text-gray-500 text-2xl">Well Done!!</p> : null

export default AllDoneMessage
