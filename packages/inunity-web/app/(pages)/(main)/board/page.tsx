import BoardListContainer from "@/app/(pages)/(main)/board/container";
import SafeAreaView from "@/widgets/SafeAreaView";
import {
  faBook,
  faBriefcase,
  faChevronRight,
  faClipboard,
  faClipboardList,
  faComments,
  faExclamationTriangle,
  faHandHoldingHeart,
  faLaptopCode,
  faMicrochip,
  faSearch,
  faSignal,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Divider, Input, Typography } from "ui";


export default function Page() {
  return (
    <SafeAreaView>
      <BoardListContainer />
    </SafeAreaView>
  );
}
