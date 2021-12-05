import style from "./style.module.css";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCheck } from "@fortawesome/free-solid-svg-icons";

interface IUserInfo {
  userName: string;
  description: string;
  city: string;
  birthdate: Date;
}

export const DataRow = ({ isEditable, title, content, onEditing, onChange }) => {
  const [contentField, setContentField] = useState(content);
  const [contentFieldBackup, setContentFieldBackup] = useState(contentField);
  const [isEditing, setIsEditing] = useState(false);

  const edit = () => {
    setContentFieldBackup(contentField);
    setIsEditing(true);
    onEditing(true); //set state in parent component
  };

  const finishEdit = async () => {
    const result = await onChange(contentField);
    if (result === true) {
      setIsEditing(false);
      onEditing(false);
    } else {
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
      <input
        autoFocus
        type="text"
        id="edited"
        className={style.editInput}
        value={contentField}
        onKeyDown={handleKeys}
        onChange={handeInput}
      />
      <FontAwesomeIcon icon={faCheck} className={style.editIcon} onClick={finishEdit} />
    </div>
  );
};

export const UserInfo = ({ children }) => {
  return <div className={style.container}>{children}</div>;
};
