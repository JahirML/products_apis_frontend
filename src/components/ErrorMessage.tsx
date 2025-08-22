import type { PropsWithChildren } from "react";

function ErrorMessage({ children }: PropsWithChildren) {
  return (
    <div className="my-4 bg-red-600 p-3 text-center text-white uppercase">
      {children}
    </div>
  );
}

export default ErrorMessage;
