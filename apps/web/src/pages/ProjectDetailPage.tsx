import { useParams } from 'react-router-dom';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  return <main data-testid="page-detail">Project: {slug}</main>;
}
