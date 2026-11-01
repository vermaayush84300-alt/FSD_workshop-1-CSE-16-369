import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <h1>Page not found</h1>
      <p>This page doesn’t exist. <Link to="/">Go to Overview</Link></p>
    </>
  );
}
