import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <main data-testid="page-404">
      <p>页面不存在</p>
      <Link to="/">返回首页</Link>
    </main>
  );
}
