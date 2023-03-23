import { Link } from "react-router-dom";

export default function TButton(
  {
    color = "indigo",
    to = "",
    circle = false,
    href = "",
    link = false,
    target = "_blank",
    onClick = () => {},
    marg = null,
    children,
  }) {
  let classes = [
    "flex",
    "items-center",
    "whitespace-nowrap",
    "text-sm",
    "border",
    "border-2",
    "border-transparent",

  ];

  if(marg){
    classes = [...classes, "mt-3"];
  }
  if (link) {
    classes = [...classes, "transition-colors"];

    switch (color) {
      case "indigo":
        classes = [...classes, "text-primary"];
        break;
      case "green":
        classes = [...classes, "text-success"];
        break;
      case "red":
        classes = [...classes, "text-danger"];
    }
  } else {
    classes = [...classes, "text-dark", "focus:ring-2", "focus:ring-offset-2"];

    switch (color) {
      case "indigo":
        classes = [
          ...classes,
          "text-secondary",
        ];
        break;
      case "red":
        classes = [
          ...classes,
          "text-danger",
        ];
        break;
      case "green":
        classes = [
          ...classes,
          "text-primary",
        ];
        break;
    }
  }

  if (circle) {
    classes = [
      ...classes,
      "h-8",
      "w-8",
      "items-center",
      "justify-center",
      "rounded-full",
      "text-sm",
      "text-sm",
      "my-2",
    ];
  } else {
    classes = [...classes, "m-0","py-2", "px-4", "rounded-md"];
  }

  return (
    <>
      {href && (
        <a href={href} className={classes.join(" ")} target={target}>
          {children}
        </a>
      )}
      {to && (
        <Link to={to} className={classes.join(" ")}>
          {children}
        </Link>
      )}
      {!to && !href && (
        <button onClick={onClick} className={classes.join(" ")}>{children}</button>
      )}
    </>
  );
}
