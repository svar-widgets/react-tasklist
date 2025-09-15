import { useCallback, useContext, useEffect, useRef } from 'react';
import { Checkbox } from '@svar-ui/react-core';
import { clickOutside } from '@svar-ui/lib-dom';
import { context } from '@svar-ui/react-core';
import './Task.css';

export default function Task(props) {
  const { task, edit, readonly, onUpdate, onRemove } = props;

  const _ = useContext(context.i18n).getGroup('tasklist');

  const textareaRef = useRef(null);
  const contentRef = useRef('');

  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = textarea.scrollHeight + 2 + 'px';
    }
  }, []);

  const handleContent = useCallback(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      contentRef.current = textarea.value;
      adjustHeight();
    }
  }, [adjustHeight]);

  const handleStatus = useCallback(
    ({ value }) => {
      onUpdate({
        task,
        status: value ? 1 : 0,
        content: contentRef.current || task.content,
      });
    },
    [onUpdate, task],
  );

  const saveTask = useCallback(
    (next) => {
      onUpdate({
        task,
        content: contentRef.current,
        status: task.status,
        next,
      });
    },
    [onUpdate, task],
  );

  const handleKeydown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        onUpdate({ task, status: task.status, content: '' });
      } else if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        saveTask(true);
      }
    },
    [onUpdate, task, saveTask],
  );

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      contentRef.current = textarea.value = task.content;
      textarea.focus();
      adjustHeight();
    }
  }, [task, edit, adjustHeight]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    return clickOutside(textarea, saveTask).destroy;
  }, [edit, saveTask]);

  return (
    <div className={`wx-OQDwWK17 wx-task${task.status ? ' wx-done' : ''}`}>
      <div className="wx-OQDwWK17 wx-checkbox-wrapper">
        {edit === task.id ? (
          <div className="wx-OQDwWK17 wx-icon-add">
            <i className="wx-OQDwWK17 wxi-plus"></i>
          </div>
        ) : (
          <Checkbox onChange={handleStatus} value={task.status} />
        )}
      </div>

      <div className="wx-OQDwWK17 wx-wrapper">
        {edit === task.id ? (
          <textarea
            ref={textareaRef}
            className="wx-OQDwWK17 wx-texarea"
            placeholder={_('Enter the task...')}
            onKeyDown={handleKeydown}
            onInput={handleContent}
          />
        ) : (
          <div className="wx-OQDwWK17 wx-text-wrapper" data-id={task.id}>
            <span className="wx-OQDwWK17 wx-text">{task.content}</span>
          </div>
        )}
      </div>

      <div className="wx-OQDwWK17 wx-icon-close">
        {!readonly && edit !== task.id ? (
          <i
            className="wx-OQDwWK17 wxi-close"
            onClick={() => onRemove(task.id)}
          ></i>
        ) : null}
      </div>
    </div>
  );
}
