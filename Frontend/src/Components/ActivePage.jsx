import { Link, useMatch, useResolvedPath } from "react-router-dom";

function ActivePage({ to, children, ...props }) {
  const resolvedpath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedpath.pathname, end: true });

  return (
    <li className="flex w-full justify-center h-15">
      <Link
        to={to}
        {...props}
        className={`${
          isActive
            ? "flex text-black bg-[#e76f51] w-full text-center m-0 items-center justify-center border-b-4 border-l-4"
            : "flex text-black w-full text-center justify-center items-center bg-[#2a9d8f]"
        }`}
      >
        {children}
      </Link>
    </li>
  );
}

export default ActivePage;
