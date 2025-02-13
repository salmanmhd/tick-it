import { NavLink } from "react-router-dom";

function LinkComponent({ to, text }) {
  return (
    <NavLink
      className="cursor-pointer text-sm font-medium transition-colors text-gray-100 hover:text-emerald-500"
      to={to}
    >
      {text}
    </NavLink>
  );
}

export default LinkComponent;
