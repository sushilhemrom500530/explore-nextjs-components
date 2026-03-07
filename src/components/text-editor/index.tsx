import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import suneditor from "suneditor";
import { en } from "suneditor/src/lang";
import plugins from "suneditor/src/plugins";
import katex from "katex";
import "suneditor/dist/css/suneditor.min.css";
import "katex/dist/katex.min.css";
import "./editor.css";
import { IProps, IImageInfo } from "./interface";
import Image from "next/image";

// forwardRef lets parent call getValue() via ref
const Editor = forwardRef<{ getValue: () => string }, IProps>(
  ({ contents, onBlur, onSave, onChange }, ref) => {
    const txtArea = useRef<HTMLTextAreaElement>(null);
    const editorRef = useRef<any>(null);

    const [imageList, setImageList] = useState<IImageInfo[]>([]);
    const [selectedImages, setSelectedImages] = useState<number[]>([]);
    const [imageSize, setImageSize] = useState("0KB");

    // ✅ Expose getValue() to parent via ref
    useImperativeHandle(ref, () => ({
      getValue: () => editorRef.current?.getContents() ?? "",
    }));

    useEffect(() => {
      if (!txtArea.current) return;

      let editorInstance: any;

      const init = async () => {
        // Dynamically load codemirror (browser-only)
        const CodeMirror = (await import("codemirror")).default;
        await import("codemirror/mode/htmlmixed/htmlmixed");
        await import("codemirror/lib/codemirror.css");
        

        editorInstance = suneditor.create(txtArea.current!, {
          plugins,
          lang: en,
          callBackSave: (c: string) => onSave(c),
          codeMirror: CodeMirror,
          stickyToolbar: 0,
          katex,
          width: "100%",
          height: "auto",
          minHeight: "400px",
          value: contents,
          imageMultipleFile: true,
          previewTemplate: `
            <div style="width:auto; max-width:1136px; min-height:400px; margin:auto;">
              {{contents}}
            </div>
          `,
          buttonList: [
            ["undo", "redo"],
            ["font", "fontSize", "formatBlock"],
            ["paragraphStyle", "blockquote"],
            [
              "bold",
              "underline",
              "italic",
              "strike",
              "subscript",
              "superscript",
            ],
            ["fontColor", "hiliteColor", "textStyle"],
            ["removeFormat"],
            ["outdent", "indent"],
            ["align", "horizontalRule", "list", "lineHeight"],
            ["table", "link", "image", "video"],
            ["fullScreen", "showBlocks", "codeView"],
            ["preview"],
            ["save"],
            [
              "%1161",
              [
                ["undo", "redo"],
                [
                  ":p-Formats-default.more_paragraph",
                  "font",
                  "fontSize",
                  "formatBlock",
                  "paragraphStyle",
                  "blockquote",
                ],
                [
                  "bold",
                  "underline",
                  "italic",
                  "strike",
                  "subscript",
                  "superscript",
                ],
                ["fontColor", "hiliteColor", "textStyle"],
                ["removeFormat"],
                ["outdent", "indent"],
                ["align", "horizontalRule", "list", "lineHeight"],
                ["-right", "save"],
                [
                  "-right",
                  ":i-Etc-default.more_vertical",
                  "fullScreen",
                  "showBlocks",
                  "codeView",
                  "preview",
                ],
                [
                  "-right",
                  ":r-Table&Media-default.more_plus",
                  "table",
                  "link",
                  "image",
                  "video",
                ],
              ],
            ],
            [
              "%893",
              [
                ["undo", "redo"],
                [
                  ":p-Formats-default.more_paragraph",
                  "font",
                  "fontSize",
                  "formatBlock",
                  "paragraphStyle",
                  "blockquote",
                ],
                ["bold", "underline", "italic", "strike"],
                [
                  ":t-Fonts-default.more_text",
                  "subscript",
                  "superscript",
                  "fontColor",
                  "hiliteColor",
                  "textStyle",
                ],
                ["removeFormat"],
                ["outdent", "indent"],
                ["align", "horizontalRule", "list", "lineHeight"],
                ["-right", "save"],
                [
                  "-right",
                  ":i-Etc-default.more_vertical",
                  "fullScreen",
                  "showBlocks",
                  "codeView",
                  "preview",
                ],
                [
                  "-right",
                  ":r-Table&Media-default.more_plus",
                  "table",
                  "link",
                  "image",
                  "video",
                ],
              ],
            ],
            [
              "%855",
              [
                ["undo", "redo"],
                [
                  ":p-Formats-default.more_paragraph",
                  "font",
                  "fontSize",
                  "formatBlock",
                  "paragraphStyle",
                  "blockquote",
                ],
                [
                  ":t-Fonts-default.more_text",
                  "bold",
                  "underline",
                  "italic",
                  "strike",
                  "subscript",
                  "superscript",
                  "fontColor",
                  "hiliteColor",
                  "textStyle",
                ],
                ["removeFormat"],
                ["outdent", "indent"],
                ["align", "horizontalRule", "list", "lineHeight"],
                [
                  ":r-Table&Media-default.more_plus",
                  "table",
                  "link",
                  "image",
                  "video",
                ],
                ["-right", "save"],
                [
                  "-right",
                  ":i-Etc-default.more_vertical",
                  "fullScreen",
                  "showBlocks",
                  "codeView",
                  "preview",
                ],
              ],
            ],
            [
              "%563",
              [
                ["undo", "redo"],
                [
                  ":p-Formats-default.more_paragraph",
                  "font",
                  "fontSize",
                  "formatBlock",
                  "paragraphStyle",
                  "blockquote",
                ],
                [
                  ":t-Fonts-default.more_text",
                  "bold",
                  "underline",
                  "italic",
                  "strike",
                  "subscript",
                  "superscript",
                  "fontColor",
                  "hiliteColor",
                  "textStyle",
                ],
                ["removeFormat"],
                ["outdent", "indent"],
                [
                  ":e-List&Line-default.more_horizontal",
                  "align",
                  "horizontalRule",
                  "list",
                  "lineHeight",
                ],
                [
                  ":r-Table&Media-default.more_plus",
                  "table",
                  "link",
                  "image",
                  "video",
                ],
                ["-right", "save"],
                [
                  "-right",
                  ":i-Etc-default.more_vertical",
                  "fullScreen",
                  "showBlocks",
                  "codeView",
                  "preview",
                ],
              ],
            ],
            [
              "%458",
              [
                ["undo", "redo"],
                [
                  ":p-Formats-default.more_paragraph",
                  "font",
                  "fontSize",
                  "formatBlock",
                  "paragraphStyle",
                  "blockquote",
                ],
                [
                  ":t-Fonts-default.more_text",
                  "bold",
                  "underline",
                  "italic",
                  "strike",
                  "subscript",
                  "superscript",
                  "fontColor",
                  "hiliteColor",
                  "textStyle",
                  "removeFormat",
                ],
                [
                  ":e-List&Line-default.more_horizontal",
                  "outdent",
                  "indent",
                  "align",
                  "horizontalRule",
                  "list",
                  "lineHeight",
                ],
                [
                  ":r-Table&Media-default.more_plus",
                  "table",
                  "link",
                  "image",
                  "video",
                ],
                ["-right", "save"],
                [
                  "-right",
                  ":i-Etc-default.more_vertical",
                  "fullScreen",
                  "showBlocks",
                  "codeView",
                  "preview",
                ],
              ],
            ],
          ],
        });

        editorRef.current = editorInstance;

        editorInstance.onBlur = () => {
          if (typeof onBlur === "function") onBlur();
        };

        editorInstance.onChange = (c: string) => {
          if (typeof onChange === "function") onChange(c);
        };

        editorInstance.onImageUpload = handleImageUpload;
      };

      init();

      return () => {
        editorInstance?.destroy();
        editorRef.current = null;
      };
    }, []); // run once on mount

    useEffect(() => {
      if (!editorRef.current) return;
      editorRef.current.setContents(contents ?? "");
      editorRef.current.core.history.reset(true);
    }, [contents]);

    const findIndex = (arr: any[], index: number): number => {
      let idx = -1;
      arr.some((a, i) => {
        if ((typeof a === "number" ? a : a.index) === index) {
          idx = i;
          return true;
        }
        return false;
      });
      return idx;
    };

    const handleImageUpload = (
      _targetElement: Element,
      index: number,
      state: string,
      imageInfo: any,
      remainingFilesCount: number,
    ) => {
      setImageList((prev) => {
        let updated = [...prev];
        if (state === "delete") {
          updated.splice(findIndex(updated, index), 1);
        } else if (state === "create") {
          updated.push(imageInfo);
        }

        if (remainingFilesCount === 0) {
          const totalSize = updated.reduce(
            (sum, img) => sum + Number((img.size / 1000).toFixed(1)),
            0,
          );
          setImageSize(totalSize.toFixed(1) + "KB");
        }

        return updated;
      });
    };

    const selectImage = (
      evt: React.MouseEvent,
      type: string,
      index: number,
    ) => {
      evt.preventDefault();
      evt.stopPropagation();
      imageList[findIndex(imageList, index)][type]();
    };

    const checkImage = (index: number) => {
      setSelectedImages((prev) => {
        const idx = findIndex(prev, index);
        return idx > -1 ? prev.filter((_, i) => i !== idx) : [...prev, index];
      });
    };

    const deleteCheckedImages = () => {
      const imagesInfo = editorRef.current?.getImagesInfo() ?? [];
      for (let i = 0; i < imagesInfo.length; i++) {
        if (selectedImages.indexOf(imagesInfo[i].index) > -1) {
          imagesInfo[i].delete();
          i--;
        }
      }
      setSelectedImages([]);
    };

    const fileUploadToEditor = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        editorRef.current?.insertImage(e.target.files);
        e.target.value = "";
      }
    };

    return (
      <div>
        <textarea ref={txtArea} />

        <div className="component-list">
          <div className="file-list-info">
            <span>Attach files</span>
            <span className="xefu-btn">
              <span className="files-text">Images</span>
            </span>
            <input
              type="file"
              id="files_upload"
              accept=".jpg,.jpeg,.png,.ico,.tif,.tiff,.gif,.bmp,.raw"
              multiple
              className="files-text files-input"
              onChange={fileUploadToEditor}
            />
            <span id="image_size" className="total-size text-small-2">
              {imageSize}
            </span>
            <button
              className="btn btn-md btn-danger"
              id="image_remove"
              disabled={selectedImages.length === 0}
              onClick={deleteCheckedImages}
            >
              삭제
            </button>
          </div>

          <div className="file-list">
            <ul id="image_list">
              {imageList.map((v, i) => (
                <li
                  key={i}
                  onClick={() => checkImage(v.index)}
                  className={selectedImages.includes(v.index) ? "checked" : ""}
                >
                  <div>
                    <div className="image-wrapper">
                      <Image src={v.src} alt="" width={200} height={200} />
                    </div>
                  </div>
                  <a
                    onClick={(evt) => selectImage(evt, "select", v.index)}
                    className="image-size"
                  >
                    {(v.size / 1000).toFixed(1)}KB
                  </a>
                  <div className="image-check">
                    <svg
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
                      />
                    </svg>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  },
);

Editor.displayName = "Editor";

export default Editor;
