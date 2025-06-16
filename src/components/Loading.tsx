export default function Loading() {
  return (
    <>
      <style>
        {`
          .loader {
            width: 20px;
            aspect-ratio: 1;
            border-radius: 9999px;
            background: #f59e0b; /* Tailwind amber-500 */
            box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.25);
            animation: l2 1.5s infinite linear;
            position: relative;
          }
          .loader::before,
          .loader::after {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: inherit;
            box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.25);
            animation: l2 1.5s infinite linear;
          }
          .loader::before {
            animation-delay: -0.5s;
          }
          .loader::after {
            animation-delay: -1s;
          }
          @keyframes l2 {
            100% {
              box-shadow: 0 0 0 40px rgba(245, 158, 11, 0);
            }
          }
        `}
      </style>
      <div className="loader absolute left-[50%] top-[20%]"></div>
    </>
  );
}
