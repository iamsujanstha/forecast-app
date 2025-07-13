import BlockHeader from "../BlockHeader";

function EmptyDataTextText({ message }: { message: string }) {
  return <BlockHeader variant="h6">{message}</BlockHeader>;
}

export default EmptyDataTextText;
