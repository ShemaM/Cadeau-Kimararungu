import React from "react";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  /* Allow passing a specific background color, default is transparent/white */
  bgColor?: string; 
};

export default function Section({ 
  children, 
  className = "", 
  id = "", 
  bgColor = "" 
}: SectionProps) {
  return (
    <section 
      id={id}
      // "py-16 md:py-24" is the industry standard for section spacing
      className={`py-16 md:py-24 ${bgColor} ${className}`}
    >
      {children}
    </section>
  );
}