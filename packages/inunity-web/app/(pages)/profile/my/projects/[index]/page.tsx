export default function MyProjects() {
  return (
    <div className="w-[393px] h-[852px] bg-white flex-col justify-start items-center inline-flex overflow-hidden">
      <div className="self-stretch px-4 py-1 justify-between items-center inline-flex overflow-hidden">
        <div className="h-10 pr-2 py-2 justify-start items-center flex">
          <div className="w-6 h-6 relative  overflow-hidden" />
        </div>
        <div className="grow shrink basis-0 text-center text-black text-lg font-bold font-['Inter']">
          프로젝트 관리
        </div>
        <div className="h-10 pl-2 py-2 justify-end items-start gap-6 flex">
          <div className="w-6 h-6 relative  overflow-hidden">
            <img
              className="w-5 h-5 left-[2px] top-[2px] absolute"
              src="https://via.placeholder.com/20x20"
            />
          </div>
          <div className="text-[#0f1419] text-sm font-medium font-['Inter']">
            완료
          </div>
        </div>
      </div>
      <div className="self-stretch h-[716px] px-4 pt-4 flex-col justify-start items-start gap-[30px] flex overflow-hidden">
        <div className="w-[361px] h-[433px] relative">
          <div className="h-[74px] left-0 top-0 absolute bg-white flex-col justify-start items-start gap-2 inline-flex">
            <div className="text-black text-lg font-bold font-['Inter']">
              프로젝트 이름
            </div>
            <div className="self-stretch px-[13px] py-[13.50px] bg-black/5 rounded-2xl justify-start items-center gap-2 inline-flex">
              <div className="grow shrink basis-0 text-black/50 text-sm font-medium font-['Inter']">
                프로젝트 이름
              </div>
            </div>
          </div>
          <div className="h-[78px] left-0 top-[115px] absolute bg-white flex-col justify-start items-start gap-2 inline-flex">
            <div className="text-black text-lg font-bold font-['Inter']">
              진행 기간
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
          <div className="h-[78px] left-0 top-[231px] absolute bg-white flex-col justify-start items-start gap-2 inline-flex">
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
          <div className="h-[81px] left-0 top-[347px] absolute flex-col justify-start items-start gap-2 inline-flex overflow-hidden">
            <div className="text-black text-lg font-bold font-['Inter']">
              URL
            </div>
            <div className="bg-white justify-start items-center gap-2.5 inline-flex">
              <div className="px-[13px] py-[13.50px] bg-black/5 rounded-2xl justify-start items-center gap-2 flex">
                <div className="w-6 h-6 relative  overflow-hidden" />
                <div className="text-black/50 text-sm font-medium font-['Inter']">
                  Github
                </div>
              </div>
              <div className="px-[13px] py-[13.50px] bg-black/5 rounded-2xl justify-start items-center gap-2 flex">
                <div className="w-6 h-6 relative  overflow-hidden" />
                <div className="text-black/50 text-sm font-medium font-['Inter']">
                  Notion
                </div>
              </div>
              <div className="w-6 h-6 relative  overflow-hidden" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
