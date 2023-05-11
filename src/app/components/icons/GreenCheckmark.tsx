const GreenCheckmark = (): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
  >
    <circle fill="#32CD32" cx="12" cy="12" r="10" />
    <polyline
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit="10"
      points="8,12 10,14 14,10"
    />
  </svg>
);

export default GreenCheckmark;
