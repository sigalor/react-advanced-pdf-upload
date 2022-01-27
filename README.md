# react-advanced-pdf-upload

[![GitHub license](https://img.shields.io/github/license/sigalor/react-advanced-pdf-upload)](https://github.com/sigalor/react-advanced-pdf-upload/blob/master/LICENSE) [![npm](https://img.shields.io/npm/v/react-advanced-pdf-upload)](https://www.npmjs.com/package/react-advanced-pdf-upload)

This library provides an easy-to-use React component for interactively creating a single PDF file out of several uploaded ones, with the possibility to concatenate, reorder, remove and rotate pages. It has been designed to be as customizable as possible. Additionally, it can work with PDFs with different page dimensions without any issues.

## How it works

Most importantly, this library simply provides a React component for the frontend, but no code to actually work with PDFs. All actual functionality for rendering and building PDFs belongs to the [https://github.com/sigalor/react-advanced-pdf-upload-backend](react-advanced-pdf-upload-backend) component, i.e. runs on a backend server. This is mostly to keep this library's dependencies at a minimum.

However, it is certainly possible to do everything in the frontend, as the implementation of the two callbacks dealing with PDFs (`loadPreviews` and `buildPdf`, see below) is completely up to the user of this library.

The example in the following section assumes that the backend server from [https://github.com/sigalor/react-advanced-pdf-upload-backend](react-advanced-pdf-upload-backend) is running at `http://localhost:3001`.

## Getting started

First, run the following to install this library. Make sure that this library's [peer dependencies](https://github.com/sigalor/react-advanced-pdf-upload/blob/main/package.json#L34) are installed.

```
npm install react-advanced-pdf-upload
```

After this, the most minimal usage of the `AdvancedPdfUpload` component looks like this:

```jsx
import React, { useRef, useState } from 'react';
import AdvancedPdfUpload from 'react-advanced-pdf-upload';

export default () => {
  const finalizeButtonRef = useRef(null);
  const [finalizeButtonLoading, setFinalizeButtonLoading] = useState(false);
  const [finalizeButtonDisabled, setFinalizeButtonDisabled] = useState(false);

  return (
    <>
      <AdvancedPdfUpload
        components={{
          dropzonePlaceholder: <p>Drag and drop PDF files here or click to select files.</p>,
          loading: <p>Loading...</p>,
          pageNumber: ({ n }) => <i>{n}</i>,
        }}
        finalizeButton={{
          ref: finalizeButtonRef,
          setLoading: setFinalizeButtonLoading,
          setDisabled: setFinalizeButtonDisabled,
        }}
        loadPreviews={async data => {
          const res = await fetch('http://localhost:3001/render-pdf', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          }).catch(e => console.error(e));

          if (res && res.status >= 200 && res.status < 299) {
            return await res.json();
          } else {
            console.error(res);
          }
        }}
        buildPdf={async data => {
          const res = await fetch('http://localhost:3001/build-pdf', {
            method: 'POST',
            headers: {
              Accept: 'application/pdf',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          }).catch(e => console.error(e));

          if (res && res.status >= 200 && res.status < 299) {
            // do something with the finalized PDF file, e.g. let the user download it
          } else {
            console.error(res);
          }
        }}
      />
      <button
        ref={finalizeButtonRef}
        disabled={finalizeButtonLoading || finalizeButtonDisabled}
        style={{ marginTop: '0.5rem' }}
      >
        {finalizeButtonLoading ? 'Loading...' : 'Finalize'}
      </button>
    </>
  );
};
```

This code renders something like the following:

![Basic demo 1](/docs/basic-demo-1.png)

You can easily upload PDF files in the upper dropzone (provided by [react-dropzone](https://react-dropzone.js.org)), then they appear at the bottom:

![Basic demo 2](/docs/basic-demo-2.png)

In the bottom area, you can easily drag-and-drop the pages around and remove or rotate pages. Once you upload more PDF files, they are appended to the back of the list of pages. When you click "Finalize", the final PDF is generated using the `buildPdf` callback.

## Documentation

The `AdvancedPdfUpload` component expects the following parameters, which have been designed for maximum customizability:

| Parameter name           | Type     | Description                                                                                                                                                                                                                                                                                                                                             | Optional | Default value |
| ------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------------- |
| components               | object   | The additional frontend components with which `AdvancedPdfUpload` is populated. See [here](https://github.com/sigalor/react-advanced-pdf-upload-demo/blob/main/src/App.js#L28-L45) for an example of all its properties.                                                                                                                                | No       |               |
| finalizeButton           | object   | An object with the properties `ref` (required), `setLoading` (optional) and `setDisabled` to control the finalize button.                                                                                                                                                                                                                               | No       |               |
| previewResolution        | integer  | The resolution for PDF page previews in PPI (pixels per inch).                                                                                                                                                                                                                                                                                          | Yes      | 100           |
| previewAreaHeight        | integer  | The height of the entire page preview area in pixels.                                                                                                                                                                                                                                                                                                   | Yes      | 240           |
| previewAreaPadding       | integer  | The inner padding of the preview area in pixels.                                                                                                                                                                                                                                                                                                        | Yes      | 16            |
| previewSpacing           | integer  | The distance between two page previews in pixels.                                                                                                                                                                                                                                                                                                       | Yes      | 24            |
| previewControlsHeight    | integer  | The height of the page preview controls (for page numbers and rotation buttons) in pixels.                                                                                                                                                                                                                                                              | Yes      | 40            |
| loadPreviews             | function | The callback for loading page previews. Gets an object according to [this schema](https://github.com/sigalor/react-advanced-pdf-upload-backend/blob/main/src/schemas/render-pdf.json) as parameter. Should return the rendered pages according to [this type](https://github.com/sigalor/react-advanced-pdf-upload-backend/blob/main/src/types.ts#L24). | No       |               |
| buildPdf                 | function | The callback that is called once the user clicks the finalize button with an object according to [this schema](https://github.com/sigalor/react-advanced-pdf-upload-backend/blob/main/src/schemas/build-pdf.json).                                                                                                                                      | No       |               |
| showPreviewAreaWhenEmpty | boolean  | Whether the area with the page previews shall be shown (i.e. just take up empty space) even when no pages are there yet.                                                                                                                                                                                                                                | Yes      | false         |

## License

MIT
