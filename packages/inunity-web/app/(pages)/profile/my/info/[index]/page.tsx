export default function MyInfo() {
  return (
    <div className="w-[393px] h-[852px] bg-white flex-col justify-start items-center inline-flex overflow-hidden">
      <div className="self-stretch px-4 py-1 justify-between items-center inline-flex overflow-hidden">
        <div className="h-10 pr-2 py-2 justify-start items-center flex">
          <div className="w-6 h-6 relative  overflow-hidden" />
        </div>
        <div className="grow shrink basis-0 text-center text-black text-[17px] font-extrabold font-['Inter']">
          프로필 기본 정보
        </div>
        <div className="h-[33px] pl-2 py-2 justify-end items-start gap-6 flex">
          <div className="text-[#0f1419] text-sm font-medium font-['Inter']">
            완료
          </div>
        </div>
      </div>
      <div className="self-stretch h-[754px] py-4 flex-col justify-start items-start gap-2.5 flex">
        <div className="self-stretch h-[171px] px-5 py-2.5 flex-col justify-start items-center gap-2.5 flex overflow-hidden">
          <img
            className="w-[116px] h-[116px] rounded-[100.87px]"
            src="https://via.placeholder.com/116x116"
          />
          <div className="px-3 py-1 bg-[#185bec]/80 rounded-md shadow-[1px_2px_5px_0px_rgba(0,0,0,0.05)] justify-center items-center gap-3 inline-flex overflow-hidden">
            <div className="text-center text-white text-sm font-bold font-['Inter']">
              사진 불러오기
            </div>
          </div>
        </div>
        <div className="self-stretch h-[0px] border border-[#eff3f4]"></div>
        <div className="self-stretch h-[488px] px-5 py-2.5 flex-col justify-start items-start flex overflow-hidden">
          <div className="self-stretch py-[5px] bg-white justify-start items-start gap-2 inline-flex">
            <div className="w-[110px] self-stretch py-5 flex-col justify-between items-start inline-flex overflow-hidden">
              <div className="text-black text-lg font-medium font-['Inter']">
                닉네임
              </div>
              <div className="text-black text-lg font-medium font-['Inter']">
                한줄 소개
              </div>
            </div>
            <div className="grow shrink basis-0 py-2.5 flex-col justify-start items-start gap-2.5 inline-flex overflow-hidden">
              <div className="self-stretch h-[41px] p-3 bg-black/5 rounded-2xl justify-start items-center gap-2 inline-flex overflow-hidden">
                <div className="w-[329px] text-black text-sm font-medium font-['Inter']">
                  김정아
                </div>
              </div>
              <div className="self-stretch h-[41px] p-3 bg-black/5 rounded-2xl justify-start items-center gap-2 inline-flex overflow-hidden">
                <div className="w-[329px] text-[#0f1419] text-sm font-medium font-['Inter']">
                  문제를 찾고, 해결하는 것을 즐깁니다. 집{" "}
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch h-[0px] border border-[#eff3f4]"></div>
          <div className="self-stretch py-[5px] bg-white justify-start items-start gap-2 inline-flex">
            <div className="w-[110px] h-28 py-5 flex-col justify-between items-start inline-flex overflow-hidden">
              <div className="text-black text-lg font-medium font-['Inter']">
                소속
              </div>
              <div className="text-black text-lg font-medium font-['Inter']">
                직무
              </div>
            </div>
            <div className="grow shrink basis-0 py-2.5 flex-col justify-start items-start gap-2.5 inline-flex overflow-hidden">
              <div className="self-stretch h-[41px] p-3 bg-black/5 rounded-2xl justify-start items-center gap-2 inline-flex overflow-hidden">
                <div className="w-[329px] text-black text-sm font-medium font-['Inter']">
                  개굴컴퍼니 개발팀
                </div>
              </div>
              <div className="self-stretch h-[41px] p-3 bg-black/5 rounded-2xl justify-start items-center gap-2 inline-flex overflow-hidden">
                <div className="w-[329px] text-black text-sm font-medium font-['Inter']">
                  백엔드 개발자
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch h-[0px] border border-[#eff3f4]"></div>
          <div className="self-stretch py-[5px] bg-white justify-start items-start gap-2 inline-flex">
            <div className="self-stretch py-5 flex-col justify-between items-start inline-flex overflow-hidden">
              <div className="self-stretch justify-start items-center gap-1 inline-flex overflow-hidden">
                <div className="w-[18px] h-[18px] justify-center items-center flex">
                  <div className="w-[18px] h-[18px] relative"></div>
                </div>
                <div className="text-black text-lg font-medium font-['Inter']">
                  Instagram
                </div>
              </div>
              <div className="self-stretch justify-start items-center gap-1 inline-flex overflow-hidden">
                <div className="w-[18px] h-[18px] relative  overflow-hidden" />
                <div className="text-black text-lg font-medium font-['Inter']">
                  Github
                </div>
              </div>
              <div className="self-stretch justify-start items-center gap-1 inline-flex overflow-hidden">
                <div className="w-[18px] h-[18px] justify-center items-center flex">
                  <div className="w-[18px] h-[18px] relative"></div>
                </div>
                <div className="text-black text-lg font-medium font-['Inter']">
                  KakaoTalk
                </div>
              </div>
              <div className="self-stretch justify-start items-center gap-1 inline-flex overflow-hidden">
                <div className="w-[18px] h-[18px] justify-center items-center flex">
                  <div className="w-[18px] h-[18px] relative flex-col justify-start items-start flex overflow-hidden" />
                </div>
                <div className="text-black text-lg font-medium font-['Inter']">
                  Blog
                </div>
              </div>
            </div>
            <div className="grow shrink basis-0 py-2.5 flex-col justify-start items-start gap-2.5 inline-flex overflow-hidden">
              <div className="self-stretch h-[41px] p-3 bg-black/5 rounded-2xl justify-start items-center gap-2 inline-flex overflow-hidden">
                <div className="w-[329px] text-black text-sm font-medium font-['Inter']">
                  https://instagram.com/frog
                </div>
              </div>
              <div className="self-stretch h-[41px] p-3 bg-black/5 rounded-2xl justify-start items-center gap-2 inline-flex overflow-hidden">
                <div className="w-[329px] text-black text-sm font-medium font-['Inter']">
                  https://github.com/frog
                </div>
              </div>
              <div className="self-stretch h-[41px] p-3 bg-black/5 rounded-2xl justify-start items-center gap-2 inline-flex overflow-hidden">
                <div className="w-[329px] text-black text-sm font-medium font-['Inter']">
                  https://open.kakao.com/frog
                </div>
              </div>
              <div className="self-stretch h-[41px] p-3 bg-black/5 rounded-2xl justify-start items-center gap-2 inline-flex overflow-hidden">
                <div className="w-[329px] text-black text-sm font-medium font-['Inter']">
                  https://blog.frog.com
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
