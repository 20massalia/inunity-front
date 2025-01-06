export default function MyCarrreers() {
  return (
    <div className="w-[393px] h-[852px] bg-white flex-col justify-start items-center inline-flex overflow-hidden">
      <div className="self-stretch px-4 py-1 justify-between items-center inline-flex overflow-hidden">
        <div className="h-10 pr-2 py-2 justify-start items-center flex">
          <div className="w-6 h-6 relative  overflow-hidden" />
        </div>
        <div className="grow shrink basis-0 text-center text-black text-lg font-bold font-['Inter']">
          경력 관리
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
            회사명
          </div>
          <div className="self-stretch px-[13px] py-[13.50px] bg-black/5 rounded-2xl justify-start items-center gap-2 inline-flex">
            <div className="grow shrink basis-0 text-black/50 text-sm font-medium font-['Inter']">
              회사명
            </div>
          </div>
        </div>
        <div className="self-stretch h-[78px] bg-white flex-col justify-start items-start gap-2 flex">
          <div className="text-black text-lg font-bold font-['Inter']">
            업무 기간
          </div>
          <div className="w-[361px] bg-white justify-start items-start gap-2.5 inline-flex">
            <div className="grow shrink basis-0 h-12 p-3 bg-black/5 rounded-2xl justify-start items-center gap-2 flex overflow-hidden">
              <div className="w-6 h-6 relative  overflow-hidden" />
              <div className="grow shrink basis-0 text-[#0f1419] text-sm font-medium font-['Inter']">
                시작 일자{" "}
              </div>
            </div>
            <div className="grow shrink basis-0 h-12 p-3 bg-black/5 rounded-2xl justify-start items-center gap-2 flex overflow-hidden">
              <div className="w-6 h-6 relative  overflow-hidden" />
              <div className="grow shrink basis-0 text-[#0f1419] text-sm font-medium font-['Inter']">
                종료 일자
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch h-[78px] bg-white flex-col justify-start items-start gap-2 flex">
          <div className="text-black text-lg font-bold font-['Inter']">
            포지션
          </div>
          <div className="w-[353px] p-3 bg-black/5 rounded-2xl justify-start items-center gap-2 inline-flex overflow-hidden">
            <div className="w-6 h-6 relative" />
            <div className="grow shrink basis-0 text-[#0f1419] text-sm font-medium font-['Inter']">
              포지션
            </div>
          </div>
        </div>
        <div className="self-stretch h-[78px] bg-white flex-col justify-start items-start gap-2 flex">
          <div className="text-black text-lg font-bold font-['Inter']">
            직무
          </div>
          <div className="w-[353px] p-3 bg-black/5 rounded-2xl justify-start items-center gap-2 inline-flex overflow-hidden">
            <div className="w-6 h-6 relative" />
            <div className="grow shrink basis-0 text-[#0f1419] text-sm font-medium font-['Inter']">
              직무
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
