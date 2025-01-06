export default function MySkills() {
  return (
    <div className="w-[393px] h-[852px] bg-white flex-col justify-start items-center inline-flex overflow-hidden">
      <div className="self-stretch px-4 py-1 justify-between items-center inline-flex overflow-hidden">
        <div className="h-10 pr-2 py-2 justify-start items-center flex">
          <div className="w-6 h-6 relative  overflow-hidden" />
        </div>
        <div className="grow shrink basis-0 text-center text-black text-lg font-bold font-['Inter']">
          사용 기술 관리
        </div>
        <div className="h-[33px] pl-2 py-2 justify-end items-start gap-6 flex">
          <div className="text-[#0f1419] text-sm font-medium font-['Inter']">
            완료
          </div>
        </div>
      </div>
      <div className="self-stretch h-[716px] p-4 flex-col justify-start items-start gap-[30px] flex">
        <div className="self-stretch h-[74px] bg-white flex-col justify-start items-start gap-2 flex">
          <div className="text-black text-lg font-bold font-['Inter']">
            기술 이름{" "}
          </div>
          <div className="self-stretch px-[13px] py-[13.50px] bg-black/5 rounded-2xl justify-start items-center inline-flex">
            <div className="grow shrink basis-0 text-black/50 text-sm font-medium font-['Inter']">
              기술 이름
            </div>
          </div>
        </div>
        <div className="self-stretch h-[89px] bg-white flex-col justify-start items-start gap-2 flex">
          <div className="text-black text-lg font-bold font-['Inter']">
            기술 수준
          </div>
          <div className="self-stretch h-[59px] py-[5px] flex-col justify-start items-start gap-2.5 flex">
            <div className="self-stretch h-6 relative">
              <div className="w-[361px] h-[0px] left-0 top-[14px] absolute border-4 border-[#d9d9d9]"></div>
              <div className="w-6 h-6 left-[169px] top-0 absolute bg-[#175aeb] rounded-full" />
            </div>
            <div className="self-stretch justify-between items-center inline-flex overflow-hidden">
              <div className="text-black text-xs font-bold font-['Inter']">
                저
              </div>
              <div className="text-black text-xs font-bold font-['Inter']">
                중
              </div>
              <div className="text-black text-xs font-bold font-['Inter']">
                고
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
