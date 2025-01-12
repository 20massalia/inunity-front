import Code from "@editorjs/code";
import ImageTool from '@editorjs/image';
import InlineCode from "@editorjs/inline-code";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Table from "@editorjs/table";
import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import { CustomError } from "@/lib/fetchExtended";
export const EDITOR_TOOLS = {
  code: Code,
  paragraph: { class: Paragraph, inlineToolbar: true },
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
            const formData = new FormData();
            formData.append('file', file);
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/v1/minio/upload?bucket=pictures`, {
              body: formData,
              method: 'POST',
              credentials: 'include'
            });
            const body = await res.json()
            if (200 <= res.status && res.status < 300) {
              return {
                success: 1, file: {
                  url: `https://image-server.squidjiny.com${body.data}`
                }
              }
            } else throw new CustomError(res.status, body.message)
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

