"use client";
import { useMessageManager } from "@/components/MessageContext";
import { useEffect, useRef } from "react";
import { ScrollView, Typography, useMenu, UserProfile } from "ui";
import { PostDetailPageEventType } from "message-type/message-type";
import usePostDetailViewModel from "@/components/viewModel/PostDetailViewModel";
import {
  faChevronLeft,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import AppBar from "../AppBar";
import { useRouter } from "next/navigation";
import BlockParser from "editor-react-parser";
import { useNativeRouter } from "@/hooks/useNativeRouter";
import { DropdownMenu } from "ui/src/DropdownMenu";

export const Viewer = () => {
  const editorJsData = {
    time: 1731853577273,
    blocks: [
      {
        id: "3aAV0B96ZU",
        type: "raw",
        data: {
          html: '<div class="view-con">\n\t\t\n\n\t\t\n\t\t\t\n\t\t\t\t<h2>[2024년 하반기 온라인 안전교육 실시 안내]</h2>\n<p style="box-sizing: border-box; text-size-adjust: 100%; -webkit-font-smoothing: antialiased; margin-right: 0px; margin-left: 0px; padding: 0px; color: rgb(51, 51, 51); font-family: \'Dream Regular\', sans-serif; font-size: 16px; letter-spacing: -0.3px; background-color: rgb(255, 255, 255);"><span style="box-sizing: border-box; text-size-adjust: 100%; -webkit-font-smoothing: antialiased; font-size: 14pt; color: rgb(0, 0, 0);">연구실 안전환경 조성에 관한 법률에 따라 연구활동종사자는 의무적으로 안전교육을 이수하여야 합니다.&nbsp;</span></p>\n<p><span style="font-size: 14pt;"><br></span></p>\n<p style="box-sizing: border-box; text-size-adjust: 100%; -webkit-font-smoothing: antialiased; margin-right: 0px; margin-left: 0px; padding: 0px; color: rgb(51, 51, 51); font-family: \'Dream Regular\', sans-serif; font-size: 16px; letter-spacing: -0.3px; background-color: rgb(255, 255, 255);"><span style="box-sizing: border-box; text-size-adjust: 100%; -webkit-font-smoothing: antialiased; font-size: 12pt;">■&nbsp;<span style="box-sizing: border-box; text-size-adjust: 100%; -webkit-font-smoothing: antialiased; font-weight: bold;">교육기간 : 2024. 10.&nbsp;10.(목) ∼&nbsp;11.&nbsp;29.(금)</span></span></p>\n<p style="box-sizing: border-box; text-size-adjust: 100%; -webkit-font-smoothing: antialiased; margin-right: 0px; margin-left: 0px; padding: 0px; color: rgb(51, 51, 51); font-family: \'Dream Regular\', sans-serif; font-size: 16px; letter-spacing: -0.3px; background-color: rgb(255, 255, 255);"><span style="box-sizing: border-box; text-size-adjust: 100%; -webkit-font-smoothing: antialiased; font-size: 12pt;"><span style="box-sizing: border-box; text-size-adjust: 100%; -webkit-font-smoothing: antialiased; font-weight: bold;"><br></span></span></p>\n<p style="box-sizing: border-box; text-size-adjust: 100%; -webkit-font-smoothing: antialiased; margin-right: 0px; margin-left: 0px; padding: 0px; color: rgb(51, 51, 51); font-family: \'Dream Regular\', sans-serif; font-size: 16px; letter-spacing: -0.3px; background-color: rgb(255, 255, 255);"><span style="font-size: 12pt; letter-spacing: -0.3px;">■</span><span style="font-size: 12pt; letter-spacing: -0.3px; box-sizing: border-box; text-size-adjust: 100%; -webkit-font-smoothing: antialiased; font-weight: bold;">&nbsp;대 상 :&nbsp;</span></p>\n<p style="box-sizing: border-box; text-size-adjust: 100%; -webkit-font-smoothing: antialiased; margin-right: 0px; margin-left: 0px; padding: 0px; color: rgb(51, 51, 51); font-family: \'Dream Regular\', sans-serif; font-size: 16px; letter-spacing: -0.3px; background-color: rgb(255, 255, 255); line-height: 180%;"><span style="font-size: 12pt; letter-spacing: -0.3px;">&nbsp; &nbsp;1. 연구․실험실 내 연구활동종사자&nbsp;</span></p>\n<p style="box-sizing: border-box; text-size-adjust: 100%; -webkit-font-smoothing: antialiased; margin-right: 0px; margin-left: 0px; padding: 0px; color: rgb(51, 51, 51); font-family: \'Dream Regular\', sans-serif; font-size: 16px; letter-spacing: -0.3px; background-color: rgb(255, 255, 255); line-height: 180%;"><span style="font-size: 12pt; letter-spacing: -0.3px;">&nbsp; &nbsp;2. 실험실습교과목 수강자 (수강하는 다른 학과 학생도 포함)</span></p>\n<p style="box-sizing: border-box; text-size-adjust: 100%; -webkit-font-smoothing: antialiased; margin-right: 0px; margin-left: 0px; padding: 0px; color: rgb(51, 51, 51); font-family: \'Dream Regular\', sans-serif; font-size: 16px; letter-spacing: -0.3px; background-color: rgb(255, 255, 255); line-height: 180%;"><span style="box-sizing: border-box; text-size-adjust: 100%; -webkit-font-smoothing: antialiased; font-size: 12pt;">&nbsp; &nbsp; &nbsp; <span style="color: rgb(0, 0, 255);">- C언어, C++언어, 모바일소프트웨어, LINUX시스템, 알고리즘, 서버구축,&nbsp;</span><span style="box-sizing: border-box; text-size-adjust: 100%; -webkit-font-smoothing: antialiased; color: rgb(0, 0, 255);">캡스턴디자인</span><br></span></p>\n<p style="box-sizing: border-box; text-size-adjust: 100%; -webkit-font-smoothing: antialiased; margin-right: 0px; margin-left: 0px; padding: 0px; color: rgb(51, 51, 51); font-family: \'Dream Regular\', sans-serif; font-size: 16px; letter-spacing: -0.3px; background-color: rgb(255, 255, 255); line-height: 180%;"><span style="font-size: 12pt; letter-spacing: -0.3px;">&nbsp; &nbsp;3. <span style="color: rgb(0, 0, 255);">우리 학과 재학생 중&nbsp;</span></span><span style="font-size: 12pt; letter-spacing: -0.3px; box-sizing: border-box; text-size-adjust: 100%; -webkit-font-smoothing: antialiased; color: rgb(0, 0, 255);">다른 학과 및 교양&nbsp;실험실습교과목 수강자</span></p>\n<p style="box-sizing: border-box; text-size-adjust: 100%; -webkit-font-smoothing: antialiased; margin-right: 0px; margin-left: 0px; padding: 0px; color: rgb(51, 51, 51); font-family: \'Dream Regular\', sans-serif; font-size: 16px; letter-spacing: -0.3px; background-color: rgb(255, 255, 255);"><span style="box-sizing: border-box; text-size-adjust: 100%; -webkit-font-smoothing: antialiased; font-size: 12pt;"><br style="box-sizing: border-box; text-size-adjust: 100%; -webkit-font-smoothing: antialiased;"></span></p>\n<p style="box-sizing: border-box; text-size-adjust: 100%; -webkit-font-smoothing: antialiased; margin-right: 0px; margin-left: 0px; padding: 0px; color: rgb(51, 51, 51); font-family: \'Dream Regular\', sans-serif; font-size: 16px; letter-spacing: -0.3px; background-color: rgb(255, 255, 255); line-height: 180%;"><span style="font-size: 12pt; letter-spacing: -0.3px;">■</span><span style="font-size: 12pt; letter-spacing: -0.3px;">&nbsp;</span><span style="font-size: 12pt; letter-spacing: -0.3px; box-sizing: border-box; text-size-adjust: 100%; -webkit-font-smoothing: antialiased; font-weight: bold;">교육방법 :</span><span style="font-size: 12pt; letter-spacing: -0.3px;">&nbsp;</span><span style="font-size: 12pt; letter-spacing: -0.3px;">온라인 안전교육 ( <a href="http://safetylabs.inu.ac.kr" target="_blank" class="new_win">https://safetylabs.inu.ac.kr</a> )</span></p>\n<p style="box-sizing: border-box; text-size-adjust: 100%; -webkit-font-smoothing: antialiased; margin-right: 0px; margin-left: 0px; padding: 0px; color: rgb(51, 51, 51); font-family: \'Dream Regular\', sans-serif; font-size: 16px; letter-spacing: -0.3px; background-color: rgb(255, 255, 255); line-height: 180%;"><span style="font-size: 12pt; letter-spacing: -0.3px;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;ID/PW : 포털계정으로 로그인&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span></p>\n<p style="box-sizing: border-box; text-size-adjust: 100%; -webkit-font-smoothing: antialiased; margin-right: 0px; margin-left: 0px; padding: 0px; color: rgb(51, 51, 51); font-family: \'Dream Regular\', sans-serif; font-size: 16px; letter-spacing: -0.3px; background-color: rgb(255, 255, 255);"><span style="font-size: 12pt; letter-spacing: -0.3px;"><br></span></p>\n<p style="box-sizing: border-box; text-size-adjust: 100%; -webkit-font-smoothing: antialiased; margin-right: 0px; margin-left: 0px; padding: 0px; color: rgb(51, 51, 51); font-family: \'Dream Regular\', sans-serif; font-size: 16px; letter-spacing: -0.3px; background-color: rgb(255, 255, 255);"><span style="box-sizing: border-box; text-size-adjust: 100%; -webkit-font-smoothing: antialiased; font-size: 12pt;">■&nbsp;<span style="box-sizing: border-box; text-size-adjust: 100%; -webkit-font-smoothing: antialiased; font-weight: bold;">유의사항 :&nbsp;</span><span style="box-sizing: border-box; text-size-adjust: 100%; -webkit-font-smoothing: antialiased; color: rgb(255, 0, 0);">안전교육 미이수시 전과목 성적열람 제한, 실험실 출입금지 및 사고발생시 보험 미처리 등 불이익을 받을수 있음</span><br></span></p>\n<p style="box-sizing: border-box; text-size-adjust: 100%; -webkit-font-smoothing: antialiased; margin-right: 0px; margin-left: 0px; padding: 0px; color: rgb(51, 51, 51); font-family: \'Dream Regular\', sans-serif; font-size: 16px; letter-spacing: -0.3px; background-color: rgb(255, 255, 255);"><span style="box-sizing: border-box; text-size-adjust: 100%; -webkit-font-smoothing: antialiased; font-size: 12pt;"><span style="box-sizing: border-box; text-size-adjust: 100%; -webkit-font-smoothing: antialiased; color: rgb(255, 0, 0);"><img src="https://cse.inu.ac.kr/CrossEditor/binary/images/000088/[%EA%BE%B8%EB%AF%B8%EA%B8%B0]%ED%8F%AC%ED%84%B8_%EA%B3%B5%EC%9E%90%EC%8B%9C%ED%95%AD_%ED%99%95%EC%9D%B8.jpg" style="width: 1192px; height: 473px;" alt=""></span></span></p>\n<p style="box-sizing: border-box; text-size-adjust: 100%; -webkit-font-smoothing: antialiased; margin-right: 0px; margin-left: 0px; padding: 0px; color: rgb(51, 51, 51); font-family: \'Dream Regular\', sans-serif; font-size: 16px; letter-spacing: -0.3px; background-color: rgb(255, 255, 255);"><span style="box-sizing: border-box; text-size-adjust: 100%; -webkit-font-smoothing: antialiased; font-size: 12pt;"><span style="box-sizing: border-box; text-size-adjust: 100%; -webkit-font-smoothing: antialiased; color: rgb(255, 0, 0);"><br></span></span></p>\n<p style="box-sizing: border-box; text-size-adjust: 100%; -webkit-font-smoothing: antialiased; margin-right: 0px; margin-left: 0px; padding: 0px; color: rgb(51, 51, 51); font-family: \'Dream Regular\', sans-serif; font-size: 16px; letter-spacing: -0.3px; background-color: rgb(255, 255, 255);"><span style="box-sizing: border-box; text-size-adjust: 100%; -webkit-font-smoothing: antialiased; font-size: 12pt;">■&nbsp;<span style="box-sizing: border-box; text-size-adjust: 100%; -webkit-font-smoothing: antialiased; font-weight: bold;">교육프로그램</span></span></p>\n<p style="box-sizing: border-box; text-size-adjust: 100%; -webkit-font-smoothing: antialiased; margin-right: 0px; margin-left: 0px; padding: 0px; color: rgb(51, 51, 51); font-family: \'Dream Regular\', sans-serif; font-size: 16px; letter-spacing: -0.3px; background-color: rgb(255, 255, 255); line-height: 180%;"><span style="font-size: 12pt; letter-spacing: -0.3px;">- 저위험 연구실 : 3시간 (필수 2 + 선택 1)</span></p>\n<p style="box-sizing: border-box; text-size-adjust: 100%; -webkit-font-smoothing: antialiased; margin-right: 0px; margin-left: 0px; padding: 0px; color: rgb(51, 51, 51); font-family: \'Dream Regular\', sans-serif; font-size: 16px; letter-spacing: -0.3px; background-color: rgb(255, 255, 255); line-height: 180%;"><span style="color: rgb(0, 0, 255); font-size: 12pt; letter-spacing: -0.3px;">- 꼭 시험까지 통과해야 함</span></p>\n<p style="box-sizing: border-box; text-size-adjust: 100%; -webkit-font-smoothing: antialiased; margin-right: 0px; margin-left: 0px; padding: 0px; color: rgb(51, 51, 51); font-family: \'Dream Regular\', sans-serif; font-size: 16px; letter-spacing: -0.3px; background-color: rgb(255, 255, 255);"><br></p>\n<div class="con-table"><table style="border-collapse: collapse; border-width: initial; border-style: none; border-color: initial; width: 679px; height: 450px;" class="">\n<tbody>\n<tr>\n<td style="width: 129px; height: 32px; padding: 1px 6px; border-width: 2px 1px 3px 2px; border-style: solid solid double; border-color: rgb(0, 0, 0); background: rgb(230, 238, 247); vertical-align: middle;">\n<p class="0" style="line-height: 130%; text-align: center; word-break: keep-all;"><span style="font-family: 한양중고딕; font-weight: bold; font-size: 13pt;">분야</span></p></td>\n<td style="width: 450px; height: 32px; padding: 1px 6px; border-width: 2px 1px 3px; border-style: solid solid double; border-color: rgb(0, 0, 0); background: rgb(230, 238, 247); vertical-align: middle;">\n<p class="0" style="line-height: 130%; text-align: center; word-break: keep-all;"><span style="font-family: 한양중고딕; font-weight: bold; font-size: 13pt;">과목</span></p></td>\n<td style="width: 59px; height: 32px; padding: 1px 6px; border-width: 2px 2px 3px 1px; border-style: solid solid double; border-color: rgb(0, 0, 0); background: rgb(230, 238, 247); vertical-align: middle;">\n<p class="0" style="line-height: 130%; text-align: center; word-break: keep-all;"><span style="font-family: 한양중고딕; font-weight: bold; font-size: 13pt;">비고</span></p></td>\n</tr>\n<tr>\n<td rowspan="2" style="width: 141px; height: 83px; border-width: 3px 1px 1px 2px; border-style: double solid solid; border-color: rgb(0, 0, 0); vertical-align: middle;">\n<p class="0" style="line-height: 100%; text-align: center; word-break: keep-all;"><span style="font-family: 한양중고딕; font-size: 13pt;">필수</span></p>\n<p class="0" style="line-height: 100%; text-align: center; word-break: keep-all;"><span style="font-family: 한양중고딕; font-size: 13pt;">과목</span></p></td>\n<td style="width: 462px; height: 41px; border-width: 3px 1px 1px; border-style: double solid solid; border-color: rgb(0, 0, 0); vertical-align: middle;">\n<p class="1" style="line-height: 140%; text-align: left;"><span style="font-family: 한양중고딕; letter-spacing: 0pt; font-size: 13pt;">1. </span><span style="font-family: 한양중고딕; font-size: 13pt;">구조 및 응급처치</span></p></td>\n<td style="width: 71px; height: 41px; border-width: 3px 2px 1px 1px; border-style: double solid solid; border-color: rgb(0, 0, 0); vertical-align: middle;">\n<p class="2" style="vertical-align: baseline; font-size: 13pt;">&nbsp;</p></td>\n</tr>\n<tr>\n<td style="width: 462px; height: 41px; border-width: 1px; border-style: solid; border-color: rgb(0, 0, 0); vertical-align: middle;">\n<p class="3" style="text-align: left; vertical-align: baseline; line-height: 140%;"><span style="font-family: 한양중고딕; letter-spacing: 0pt; font-size: 13pt;">2. </span><span style="font-family: 한양중고딕; font-size: 13pt;">안전보호구</span></p></td>\n<td style="width: 71px; height: 41px; border-width: 1px 2px 1px 1px; border-style: solid; border-color: rgb(0, 0, 0); vertical-align: middle;">\n<p class="4" style="margin-left: 1px; margin-right: 1px; vertical-align: baseline; font-size: 13pt;">&nbsp;</p></td>\n</tr>\n<tr>\n<td rowspan="8" style="width: 141px; height: 336px; border-width: 1px 1px 2px 2px; border-style: solid; border-color: rgb(0, 0, 0); vertical-align: middle;">\n<p class="0" style="line-height: 100%; text-align: center; word-break: keep-all;"><span style="font-family: 한양중고딕; font-size: 13pt;">선택</span></p>\n<p class="0" style="line-height: 100%; text-align: center; word-break: keep-all;"><span style="font-family: 한양중고딕; font-size: 13pt;">과목</span></p></td>\n<td style="width: 462px; height: 42px; border-width: 1px; border-style: solid; border-color: rgb(0, 0, 0); vertical-align: middle;">\n<p class="3" style="line-height: 140%; text-align: left;"><span style="font-family: 한양중고딕; letter-spacing: 0pt; font-size: 13pt;">3. </span><span style="font-family: 한양중고딕; font-size: 13pt;">화학물질 취급 안전 수칙 가이드</span></p></td>\n<td style="width: 71px; height: 42px; border-width: 1px 2px 1px 1px; border-style: solid; border-color: rgb(0, 0, 0); vertical-align: middle; cursor: row-resize;">\n<p class="4" style="vertical-align: baseline; font-size: 13pt;">&nbsp;</p></td>\n</tr>\n<tr>\n<td style="width: 462px; height: 42px; border-width: 1px; border-style: solid; border-color: rgb(0, 0, 0); vertical-align: middle;">\n<p class="3" style="line-height: 140%; text-align: left;"><span style="font-family: 한양중고딕; letter-spacing: 0pt; font-size: 13pt;">4. </span><span style="font-family: 한양중고딕; font-size: 13pt;">종사자를 위한 보건관리</span></p></td>\n<td style="width: 71px; height: 42px; border-width: 1px 2px 1px 1px; border-style: solid; border-color: rgb(0, 0, 0); vertical-align: middle;">\n<p class="4" style="vertical-align: baseline; font-size: 13pt;">&nbsp;</p></td>\n</tr>\n<tr>\n<td style="width: 462px; height: 42px; border-width: 1px; border-style: solid; border-color: rgb(0, 0, 0); vertical-align: middle;">\n<p class="3" style="line-height: 140%; text-align: left;"><span style="font-family: 한양중고딕; letter-spacing: 0pt; font-size: 13pt;">5. </span><span style="font-family: 한양중고딕; font-size: 13pt;">기계</span><span style="font-family: 한양중고딕; letter-spacing: 0pt; font-size: 13pt;">, </span><span style="font-family: 한양중고딕; font-size: 13pt;">기구</span><span style="font-family: 한양중고딕; letter-spacing: 0pt; font-size: 13pt;">, </span><span style="font-family: 한양중고딕; font-size: 13pt;">설비의 정비 및 보수 작업안전</span><span> </span><span style="font-family: 한양중고딕; font-size: 13pt;">선택</span></p></td>\n<td style="width: 71px; height: 42px; border-width: 1px 2px 1px 1px; border-style: solid; border-color: rgb(0, 0, 0); vertical-align: middle;">\n<p class="4" style="vertical-align: baseline; font-size: 13pt;">&nbsp;</p></td>\n</tr>\n<tr>\n<td style="width: 462px; height: 42px; border-width: 1px; border-style: solid; border-color: rgb(0, 0, 0); vertical-align: middle;">\n<p class="3" style="line-height: 140%; text-align: left;"><span style="font-family: 한양중고딕; letter-spacing: 0pt; font-size: 13pt;">6. </span><span style="font-family: 한양중고딕; font-size: 13pt;">전기안전관리와 재해 예방 안전 수칙 가이드</span></p></td>\n<td style="width: 71px; height: 42px; border-width: 1px 2px 1px 1px; border-style: solid; border-color: rgb(0, 0, 0); vertical-align: middle;">\n<p class="4" style="vertical-align: baseline; font-size: 13pt;">&nbsp;</p></td>\n</tr>\n<tr>\n<td style="width: 462px; height: 42px; border-width: 1px; border-style: solid; border-color: rgb(0, 0, 0); vertical-align: middle;">\n<p class="3" style="line-height: 140%; text-align: left;"><span style="font-family: 한양중고딕; letter-spacing: 0pt; font-size: 13pt;">7. </span><span style="font-family: 한양중고딕; font-size: 13pt;">연구실 주요 기기</span><span style="font-family: 한양중고딕; letter-spacing: 0pt; font-size: 13pt;">.</span><span style="font-family: 한양중고딕; font-size: 13pt;">장비 취급관리 가이드</span></p></td>\n<td style="width: 71px; height: 42px; border-width: 1px 2px 1px 1px; border-style: solid; border-color: rgb(0, 0, 0); vertical-align: middle;">\n<p class="4" style="vertical-align: baseline; font-size: 13pt;">&nbsp;</p></td>\n</tr>\n<tr>\n<td style="width: 462px; height: 42px; border-width: 1px; border-style: solid; border-color: rgb(0, 0, 0); vertical-align: middle;">\n<p class="3" style="line-height: 140%; text-align: left;"><span style="font-family: 한양중고딕; letter-spacing: 0pt; font-size: 13pt;">8. </span><span style="font-family: 한양중고딕; font-size: 13pt;">외부공간 연구활동 안전관리 가이드</span></p></td>\n<td style="width: 71px; height: 42px; border-width: 1px 2px 1px 1px; border-style: solid; border-color: rgb(0, 0, 0); vertical-align: middle;">\n<p class="4" style="vertical-align: baseline; font-size: 13pt;">&nbsp;</p></td>\n</tr>\n<tr>\n<td style="width: 462px; height: 42px; border-width: 1px; border-style: solid; border-color: rgb(0, 0, 0); vertical-align: middle;">\n<p class="3" style="line-height: 140%; text-align: left;"><span style="font-family: 한양중고딕; letter-spacing: 0pt; font-size: 13pt;">9. </span><span style="font-family: 한양중고딕; font-size: 13pt;">연구실에서의 핵심 안전보건관리</span></p></td>\n<td style="width: 71px; height: 42px; border-width: 1px 2px 1px 1px; border-style: solid; border-color: rgb(0, 0, 0); vertical-align: middle;">\n<p class="4" style="vertical-align: baseline; font-size: 13pt;">&nbsp;</p></td>\n</tr>\n<tr>\n<td style="width: 462px; height: 42px; border-width: 1px 1px 2px; border-style: solid; border-color: rgb(0, 0, 0); vertical-align: middle;">\n<p class="3" style="line-height: 140%; text-align: left;"><span style="font-family: 한양중고딕; letter-spacing: 0pt; font-size: 13pt;">10. </span><span style="font-family: 한양중고딕; font-size: 13pt;">전기화학분야 연구실 안전관리 가이드</span></p></td>\n<td style="width: 71px; height: 42px; border-width: 1px 2px 2px 1px; border-style: solid; border-color: rgb(0, 0, 0); vertical-align: middle;">\n<p class="4" style="vertical-align: baseline; font-size: 13pt;">&nbsp;</p></td>\n</tr>\n</tbody>\n</table></div>\n<p><br></p>\n\n<p><br></p>\n\t\t\t\n\t\t\t\n\t\t\n\t</div>',
        },
      },
    ],
    version: "2.30.7",
  };
  return (
    <div className="overflow-x-scroll">
      <BlockParser data={editorJsData} />
    </div>

    // <Typography className="text-black">
    //   2024학년도 2학기 수강신청 포기제도를 아래와 같이 안내하오니 기간 내에
    //   신청하시기 바랍니다.
    //   <br />
    //   가. 시행기간: 2024. 9. 23.(월) 09:00 ~ 9. 25.(수) 17:00
    //   <br />
    //   나. 대상: 2024학년도 2학기 17학점 이상 수강신청자 중 수강능력 부족, 적성
    //   부적합 등 부득이한 사유로 수강을 포기하려는 자<br />
    //   다. 포기가능 과목 수: 1과목(3학점 이내, 포기 후 수강학점이 15학점
    //   이상이어야 함)
    //   <br />
    //   라. 신청방법
    //   <br />
    // </Typography>
  );
};

export default function PostDetailContainer({
  categoryId,
  postId,
}: {
  categoryId: string;
  postId: string;
}) {
  const { messageManager, pageEvent } = useMessageManager();
  const { submitComment, post, comments } = usePostDetailViewModel();
  const { openMenuId, setOpenMenuId } = useMenu();
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (!pageEvent) return;
    if (pageEvent?.event === PostDetailPageEventType.SubmitComment) {
      submitComment(pageEvent.value);
    }
  }, [pageEvent, submitComment]);
  const router = useNativeRouter();
  return (
    <>
      <AppBar
        center={
          <div className="flex flex-col">
            <Typography className="text-xs font-bold">컴퓨터공학부</Typography>
            <Typography variant="HeadingNormalBold">공지사항</Typography>
          </div>
        }
        leftIcon={
          <FontAwesomeIcon
            icon={faChevronLeft}
            fontSize={24}
            onClick={router.back}
          />
        }
        rightIcon={
          <>
          <DropdownMenu menuId={"post_detail_appbar"} actions={[
              { label: "수정", onClick: () => { } },
              { label: "삭제", onClick: () => { } },
              { label: "신고", onClick: () => { } },
              { label: "차단", onClick: () => { } },
            ]} />
            {/* <FontAwesomeIcon icon={faEllipsisVertical} className="text-2xl" onClick={} /> */}
          </>
        }
      />
      <ScrollView className="text-black gap-2">
        <div className="flex flex-col gap-3 p-5 bg-white ">
          <UserProfile
            profileImage={""}
            name={post.name}
            introduction={post.department}
            id={post.name}
            isMenuOpen={openMenuId == `post_${post.name}`}
            onToggleMenu={() => setOpenMenuId(`post_${post.name}`)}
            actions={[
              { label: "수정", onClick: () => {} },
              { label: "삭제", onClick: () => {} },
              { label: "신고", onClick: () => {} },
              { label: "차단", onClick: () => {} },
            ]}
          />
          <Viewer />
        </div>
        <div className="bg-white self-stretch flex flex-col items-start justify-start p-5 gap-3">
          <div className="flex flex-row items-center justify-center gap-1">
            <Typography variant="HeadingLargeBold">댓글&nbsp;</Typography>
            <Typography variant="HeadingNormalBold">2</Typography>
          </div>
          <div className="self-stretch flex flex-col items-start justify-start gap-3">
            {comments.map((comment) => (
              <>
                <div
                  className="flex flex-col justify-start self-stretch"
                  key={comment.content}
                >
                  <UserProfile
                    profileImage={""}
                    name={comment.name}
                    introduction={comment.department}
                    id={comment.name}
                    isMenuOpen={openMenuId == `comments_${comment.name}`}
                    onToggleMenu={() =>
                      setOpenMenuId(`comments_${comment.name}`)
                    }
                    actions={[
                      { label: "수정", onClick: () => {} },
                      { label: "삭제", onClick: () => {} },
                      { label: "신고", onClick: () => {} },
                      { label: "차단", onClick: () => {} },
                    ]}
                  />
                  <Typography>{comment.content}</Typography>
                  <Typography
                    variant="LabelNormalRegular"
                    className="inline text-end"
                  >
                    {comment.date}
                  </Typography>
                </div>
              </>
            ))}
          </div>
        </div>
      </ScrollView>
    </>
  );
}
