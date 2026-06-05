import { TailSpin } from "react-loader-spinner";

export default function LoaderButton() {
  return (
    <div className="w-full flex justify-center items-center">
      <TailSpin
        visible={true}
        height="25"
        width="25"
        color="#fff"
        ariaLabel="tail-spin-loading"
        radius="1"
      />
    </div>
  );
}
