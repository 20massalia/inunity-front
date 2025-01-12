import { ClipLoader } from "react-spinners";

export default function LoadingOverlay({ isLoading }: { isLoading: boolean }) {
  return (
    <>
      {isLoading && (
        <div className="fixed inset-0  z-10" style={{backgroundColor: 'rgba(0,0,0,0.3)'}} onClick={(e) => e.stopPropagation()}>
          <div className="h-full flex flex-row justify-center items-center ">{<ClipLoader />}</div>
        </div>
      )}
    </>
  );
}
