// This is my Editorjs component, better if make a seperate component and use it

import React, { useEffect, useRef, useState } from "react";
import EditorJS, { OutputData } from "@editorjs/editorjs";
import { EDITOR_TOOLS } from "@/lib/editorConfig";
type EditorProps = {
  data?: OutputData;
  onChange(val: OutputData): void;
  holder: string;
};

function Editor({ data, onChange, holder }: EditorProps) {
  //add a reference to editor
  const ref = useRef<EditorJS>();
  //initialize editorjs
  useEffect(() => {
    //initialize editor if we don't have a reference
    if (!ref.current) {
      const editor = new EditorJS({
        holder: holder,
        placeholder: "글을 작성해볼까요..",
        tools: EDITOR_TOOLS,
        data,
        async onChange(api, event) {
          const content = await api.saver.save();
          onChange(content);
        },
        i18n: {
          messages: {
            ui: {
              toolbar: {
                toolbox: {
                  Add: "추가",
                },
              },
            },
            toolNames: {
              Text: "텍스트",
              Heading: "제목",
              List: "리스트",
              Warning: "경고",
              Checklist: "체크리스트",
              Image: '이미지',
              "Unordered List": '리스트',
              "Ordered List": "숫자 리스트",
              Quote: "인용문",
              Code: "코드",
              Delimiter: "구분선",
              Table: "표",
              Link: "링크",
              Marker: "마커",
              Bold: "굵게",
              Italic: "기울임",
              InlineCode: "인라인 코드",
            },
          },
        },
      });
      ref.current = editor;
    }

    //add a return function handle cleanup
    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);

  return (
    <>
      <div
        id={holder}
        style={{
          width: "100%",
          minHeight: 500,
          borderRadius: " 7px",
          background: "fff",
        }}
      />
    </>
  );
}

export default Editor;
