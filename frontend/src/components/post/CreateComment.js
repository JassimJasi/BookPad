import { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";

export default function CreateComment({ user }) {
  const [picker, setPicker] = useState(false);
  const [text, setText] = useState("");
  const [cursorPosition, setCursorPosition] = useState();
  const [error, setError] = useState("");
  const [commentImage, setCommentImage] = useState("");
  const textRef = useRef(null);
  const imgInput = useRef(null);
  // function for emoji picker
  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
    //console.log(cursorPosition);
  }, [cursorPosition]);

  const handleEmoji = ({ emoji }) => {
    const ref = textRef.current;
    ref.focus();
    //ref.seclectionStart means where the couser touched
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };
  // function for emoji picker ends
  // comment image function
  const handleImage = (e) => {
    let file = e.target.files[0];
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/webp" &&
      file.type !== "image/gif"
    ) {
      setError(`${file.name} format is not supported`);
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      setError(`${file.name} is too large max 5mb allowed.`);
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setCommentImage(event.target.result);
    };
  };
  // comment image function end

  return (
    <div className="create_comment_wrap">
      <div className="create_comment">
        <img src={user?.picture} alt="" />
        <div className="comment_input_wrap">
          {picker && (
            <div className="comment_emoji_picker">
              <Picker onEmojiClick={handleEmoji} />
            </div>
          )}
          <input
            type="file"
            hidden
            ref={imgInput}
            accept="image/jpeg,image/png,image/gif,image/webp"
            onChange={handleImage}
          />
          {error && (
            <div className="postError comment_error">
              <div className="postError_error">{error}</div>
              <button
                className="blue_btn"
                onClick={() => {
                  setError("");
                }}
              >
                Try again
              </button>
            </div>
          )}
          <input
            type="text"
            ref={textRef}
            value={text}
            placeholder="Write a comments..."
            onChange={(e) => setText(e.target.value)}
          />
          <div
            className="comment_circle_icon hover2"
            onClick={() => {
              setPicker((prev) => !prev);
            }}
          >
            <i className="emoji_icon"></i>
          </div>
          <div
            className="comment_circle_icon hover2"
            onClick={() => imgInput.current.click()} //when we click in this div it will open the file
          >
            <i className="camera_icon"></i>
          </div>
        </div>
      </div>
      {/* comment image function */}
      {commentImage && (
        <div className="comment_img_preview">
          <img src={commentImage} alt="" />
          <div
            className="small_white_circle"
            onClick={() => setCommentImage("")}
          >
            <i className="exit_icon"></i>
          </div>
        </div>
      )}
      {/*  comment image function ends */}
    </div>
  );
}
