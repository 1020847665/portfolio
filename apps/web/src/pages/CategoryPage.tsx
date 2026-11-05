import { useParams } from 'react-router-dom';

export default function CategoryPage() {
  const { category } = useParams();
  return <main data-testid="page-category">Category: {category}</main>;
}
