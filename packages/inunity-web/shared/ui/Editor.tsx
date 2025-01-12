// This is my Editorjs component, better if make a seperate component and use it

import React, { useEffect, useRef, useState } from "react";
import EditorJS, { I18nDictionary, OutputData } from "@editorjs/editorjs";
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
          /**
           * @type {I18nDictionary}
           */
          messages: {
            ui: {
              toolbar: {
                toolbox: {
                  Add: "추가",
                },
              },
              blockTunes: {
                toggler: {
                  "Click to tune": "클릭해 이동",
                  "or drag to move": "혹은 드래그해 이동",
                },
              },
              inlineToolbar: {
                converter: {
                  "Convert to": "변환: ",
                },
              },
            },
            tools: {
              code: {
                "Enter a code": "코드를 입력하세요..",
              },
              quote: {
                "Enter a quote": "인용문을 입력하세요..",
                "Enter a caption": "캡션을 입력하세요..",
              },
              image: {
                "Select an Image": "이미지 선택",
                "Uploading...": "업로드 중...",
                "Drop image here or click to select":
                  "이미지를 여기에 드롭하거나 클릭하여 선택하세요",
                "Incorrect response from server":
                  "서버로부터 잘못된 응답을 받았습니다",
                "Image URL": "이미지 URL",
                "Couldn't upload image from URL. Try another.":
                  "URL에서 이미지를 업로드할 수 없습니다. 다른 URL을 시도해 주세요.",
              },
            },
            blockTunes: {
              delete: {
                Delete: "삭제",
              },
              moveUp: {
                "Move up": "위로 이동",
              },
              moveDown: {
                "Move down": "아래로 이동",
              },
            },
            toolNames: {
              Text: "텍스트",
              Heading: "제목",
              List: "리스트",
              Warning: "경고",
              Checklist: "체크리스트",
              Image: "이미지",
              "Unordered List": "리스트",
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
