import style from "./style.module.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCheck } from "@fortawesome/free-solid-svg-icons";

interface IDataRow {
  isEditable: boolean;
  content: string | number;
  title: string;
  onEditing: Function;
  onChange: Function;
  isTextArea?: boolean;
}
//first use in profile page, so logic should get there
export const DataRow = ({ isEditable, title, content, onEditing, onChange, isTextArea }: IDataRow) => {
  const [contentField, setContentField] = useState(content);
  const [contentFieldBackup, setContentFieldBackup] = useState(contentField);
  const [isEditing, setIsEditing] = useState(false);

  const edit = () => {
    setContentFieldBackup(contentField);
    setIsEditing(true); //switch datafield to editable state
    onEditing(true); //set state in parent component to hide edit buttons in other datafields
  };

  const finishEdit = async () => {
    const result = await onChange(contentField);
    console.log(result);
    if (result === true) {
      setIsEditing(false); //switch datafield to data overview state
      onEditing(false); //unhide edit buttons in all datafields
    } else {
      setIsEditing(false);
      onEditing(false);
      result;
    }
  };

  const handleKeys = (e) => {
    switch (e.keyCode) {
      case 13: {
        //enter key
        finishEdit();
        break;
      }
      case 27: {
        //escape key
        setContentField(contentFieldBackup);
        finishEdit();
        break;
      }
    }
  };
  //controlled input
  const handeInput = (e) => {
    setContentField(e.target.value);
  };

  return !isEditing ? (
    <div className={style.row}>
      <div className={style.title}>{title}: </div>
      <div className={style.content}>{contentField}</div>
      {isEditable ? (
        <div className={style.icon}>
          <FontAwesomeIcon icon={faEdit} className={style.icon} onClick={edit} />
        </div>
      ) : null}
    </div>
  ) : (
    //field during re-writing
    <div className={style.editContainer}>
      <label htmlFor="edited" className={style.editLabel}>
        {title}
      </label>
      {!isTextArea ? (
        <input
          className={style.editInput}
          autoFocus
          type={"text"}
          id="edited"
          value={contentField}
          onKeyDown={handleKeys}
          onChange={handeInput}
        />
      ) : (
        <textarea
          className={style.textArea}
          autoFocus
          onKeyDown={handleKeys}
          onChange={handeInput}
          id="edited"
          cols={30}
          rows={10}
          value={contentField}
        ></textarea>
      )}
      <FontAwesomeIcon icon={faCheck} className={style.editIcon} onClick={finishEdit} />
    </div>
  );
};

export const UserInfo = ({ children }) => {
  return <div className={style.container}>{children}</div>;
};
