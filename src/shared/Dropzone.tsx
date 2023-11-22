/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import Dropzone, { DropzoneProps } from "react-dropzone";

const MiDropzone = (props: DropzoneProps & { text: string }): JSX.Element => {
  const { onDrop, text, accept, maxFiles, multiple } = props;
  const [style, setStyle] = useState("");

  function dragEnter(): void {
    setStyle(
      // eslint-disable-next-line max-len
      "#86d6ea"
    );
  }

  function dragLeave(): void {
    setStyle("");
  }

  return (
    <Dropzone
      accept={accept}
      onDrop={
        onDrop
          ? (acceptedFiles, fileRejections, event): void => {
              dragLeave();
              onDrop(acceptedFiles, fileRejections, event);
            }
          : undefined
      }
      maxFiles={maxFiles}
      multiple={multiple}
      onDragEnter={(): void => dragEnter()}
      onDragLeave={(): void => dragLeave()}
    >
      {({ getRootProps, getInputProps }): JSX.Element => (
        <section className="dropzone">
          <div {...getRootProps()}>
            <input title="Dropzone" {...getInputProps()} />
            <p style={{ background: style }}>{text}</p>
          </div>
        </section>
      )}
    </Dropzone>
  );
};

export default MiDropzone;
