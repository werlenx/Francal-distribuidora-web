import styles from "./index.module.css";
import Link, { LinkProps } from "next/link";
import React, { HTMLAttributes } from "react";


interface CustomButtonProps {
  children: React.ReactNode;
  color?: string;
  backgroundColor?: string;
  borderRadius?: string;
  hoverColor?: string;
  hoverBackgroundColor?: string;
  width?: string;
  height?: string;
  border?: string;
  fontSize?: string;
}


type ButtonStyledProps = CustomButtonProps & (
  { href: string } & LinkProps & React.AnchorHTMLAttributes<HTMLAnchorElement> |
  { href?: never } & React.ButtonHTMLAttributes<HTMLButtonElement> 
);


export default function ButtonStyled({ 
  children, 
  color = "#fff", 
  backgroundColor = "var(--primary-color)", 
  borderRadius = "0px",
  border = '',
  hoverColor = "var(--primary-color)",
  hoverBackgroundColor = "#ffffffff",
  href,
  width = '',
  height = '',
  fontSize = '',
  ...restProps
}: ButtonStyledProps) {  

  const styleVars: React.CSSProperties = {
    "--color": color,
    "--bg": backgroundColor,
    "--hover-color": hoverColor,
    "--hover-bg": hoverBackgroundColor,
    borderRadius,
    width,
    height,
    border,
    fontSize
  } as React.CSSProperties;

  // Extrai o className do restProps (se existir) para poder combiná-lo com o styles.buttonStyled
  const { className: restClassName, ...nativeProps } = restProps as HTMLAttributes<HTMLElement>;
  const finalClassName = `${styles.buttonStyled} ${restClassName || ''}`;


  if (href) {
    return (
      <Link  
        href={href}
        className={finalClassName}
        style={styleVars}
        {...nativeProps}
      >
        {children}
      </Link>
    );
  }

  return (
    <button 
      className={finalClassName}
      style={styleVars}
      {...nativeProps}
    >
      {children}
    </button>
  );
}