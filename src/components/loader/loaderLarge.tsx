import { ProgressBar } from "react-loader-spinner";

export default function LoaderLarge() {
  return (
    <div
      className="mx-auto w-full py-4 grid justify-center items-center min-h-screen
    bg-linear-to-b from-slate-950 via-slate-900 to-slate-950"
    >
      <div>
        <ProgressBar
          visible={true}
          height="90"
          width="120"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={["#306cce", "#72a1ed"]}
        />
      </div>
    </div>
  );
}
