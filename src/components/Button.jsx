import clsx from "clsx";
import { Link } from "react-router-dom";
import { Marker } from "./Marker.jsx";

const Button = ({
  icon,
  children,
  href,
  to,
  containerClassName,
  onClick,
  markerFill,
}) => {
  const Inner = () => (
    <>
      <span className="relative flex items-center min-h-[60px] px-4 g4 rounded-2xl inner-before group-hover:before:opacity-100 overflow-hidden">
        <span className="absolute -left-[1px]">
          <Marker fill={markerFill} />
        </span>

        {icon ? (
          <img
            src={icon}
            alt="icon"
            className="size-10 mr-5 object-contain z-10"
          />
        ) : null}

        <span className="relative z-2 font-poppins base-bold text-p1 uppercase">
          {children}
        </span>
      </span>

      <span className="glow-before glow-after" />
    </>
  );

  const className = clsx(
    "relative inline-flex w-fit p-0.5 g5 rounded-2xl shadow-500 group",
    containerClassName
  );

  if (to) {
    return (
      <Link className={className} to={to}>
        <Inner />
      </Link>
    );
  }

  if (href) {
    return (
      <a className={className} href={href}>
        <Inner />
      </a>
    );
  }

  return (
    <button className={className} onClick={onClick} type="button">
      <Inner />
    </button>
  );
};

export default Button;
