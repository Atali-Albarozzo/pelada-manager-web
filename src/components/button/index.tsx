import React, { ButtonHTMLAttributes } from 'react';

type ButtonTypes = 'primary' | 'secondary';
type ButtonPropsType = {
  children: React.ReactElement | string;
  block?: boolean;
  variant?: ButtonTypes;
};

export default function Button({
  children,
  block = true,
  variant = 'primary',
  ...props
}: ButtonPropsType & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type='button'
      className={`${getStyleByType(variant)} ${block && 'w-full'}`}
      {...props}
    >
      {children}
    </button>
  );
}

function getStyleByType(type: ButtonTypes) {
  const baseStyle = 'px-6 py-3 rounded-md font-semibold ';

  return baseStyle + (typeStyles[type] || typeStyles['primary']);
}

const typeStyles = {
  primary: 'bg-rose text-white',
  secondary: 'bg-white text-black border rounded-md border-black',
};
