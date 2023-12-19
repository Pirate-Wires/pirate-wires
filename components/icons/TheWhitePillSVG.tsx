const TheWhitePillSVG = ({ className = "", ...props }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}>
    <rect width="100%" height="100%" rx="16" />
    <path fillRule="evenodd" clipRule="evenodd" d="M12 1 L2 25 L20 20 Z" fill="currentColor" />
  </svg>
);

export default TheWhitePillSVG;
