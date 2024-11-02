import NavItem from "@/components/NavItem";
import { platformResolver } from "@/lib/PlatformResolver";
import { faClipboardList, faHeart, faHome,  faPerson, } from "@fortawesome/free-solid-svg-icons";
import { headers } from "next/headers";
import { userAgent } from "next/server";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const heads = headers();
    const ua = userAgent({headers: heads}).ua
    return <div className="h-full flex flex-col ">
        <div className="flex-1 h-full overflow-scroll">
            {children}
        </div>    

        {
            platformResolver(ua).isWebView == false &&
            <div className=" pt-1 px-2 pb-4 flex flex-row justify-center">
                <NavItem icon={faHome} label={'홈'} route={'/'} />
                <NavItem icon={faClipboardList} label={'게시판'} route={'/board'} />
                <NavItem icon={faHeart} label={'팔로우'} route={'/follow'} />
                <NavItem icon={faPerson} label={'마이페이지'} route={'/my'} />
            </div>
        }
    </div>
}


