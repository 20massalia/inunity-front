import Code from "@editorjs/code";
import ImageTool from '@editorjs/image';
import InlineCode from "@editorjs/inline-code";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Table from "@editorjs/table";
import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import uploadImage from "./uploadImage";
export const EDITOR_TOOLS = {
  code: Code,
  // paragraph: { class: Paragraph, inlineToolbar: true },
  header: Header,
  list: List,
  quote: Quote,
  table: Table,
  inlineCode: InlineCode,
  image: {
    class: ImageTool,
    config: {
      uploader: {
        /**
         * Upload file to the server and return an uploaded image data
         * @param {File} file - file selected from the device or pasted by drag-n-drop
         * @return {Promise.<{success, file: {url}}>}
         */
        async uploadByFile(file) {
          try {
            const url = await uploadImage('pictures', file)
            return {
              success: 1, file: { url }
            }
          } catch (e) {
            console.error(e)
            return { success: 0 }
          }

        },
        uploadByUrl(url) {
          // URL을 그대로 반환
          return Promise.resolve({
            success: 1,
            file: {
              url: url,
            }
          });
        }


      }
    }
  }
};

