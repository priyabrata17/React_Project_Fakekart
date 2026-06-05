
import { Hourglass } from "react-loader-spinner";

export default function Loader() {
  return (
    <div className="w-full py-1 flex justify-center items-center min-h-full">
        <div>
          <Hourglass
            visible={true}
            height="30"
            width="30"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={["#CCDDB7", "#88D18A"]}
          />
        </div>
      </div>
  )
}
